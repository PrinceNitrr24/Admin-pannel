import React, { useState, useEffect, useRef } from "react";
import { MapPin, Map as MapIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { fetchCurrentLocation } from "../api";
import { Location } from "../types";

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const LiveLocation: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState<Location[]>([]);
  const intervalRef = useRef<number | null>(null);

  const startTracking = () => {
    setIsTracking(true);
    setLocationHistory([]);

    fetchCurrentLocation().then((loc) => {
      setLocation(loc);
      setLocationHistory((prev) => [...prev, loc]);
    });

    intervalRef.current = window.setInterval(async () => {
      try {
        const newLocation = await fetchCurrentLocation();
        setLocation(newLocation);
        setLocationHistory((prev) => [...prev, newLocation]);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }, 3000);
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Live Location Tracking
        </h1>
        <div className="flex space-x-2">
          {!isTracking ? (
            <button
              onClick={startTracking}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <MapPin size={18} className="mr-2" />
              Start Tracking
            </button>
          ) : (
            <button
              onClick={stopTracking}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <MapPin size={18} className="mr-2" />
              Stop Tracking
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <MapIcon size={24} className="text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Location Map</h2>
        </div>

        <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
          {location ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>
                  Current Location
                  <br />
                  Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                </Popup>
              </Marker>
              <MapUpdater center={[location.lat, location.lng]} />
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">
                {isTracking
                  ? "Loading location data..."
                  : 'Click "Start Tracking" to see live location'}
              </p>
            </div>
          )}
        </div>
      </div>

      {locationHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Location History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Latitude
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Longitude
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {locationHistory.map((loc, index) => (
                  <tr
                    key={index}
                    className={
                      index === locationHistory.length - 1 ? "bg-blue-50" : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loc.lat.toFixed(6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loc.lng.toFixed(6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveLocation;
