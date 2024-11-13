import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Get user location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Function to find the nearest Planned Parenthood locations
  const findPlannedParenthood = () => {
    if (userLocation) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        location: userLocation,
        radius: 5000, // Search within 5 km radius
        type: ["hospital"], // You can use 'hospital' or 'doctor', or specific keywords
        keyword: "Planned Parenthood", // Searching for Planned Parenthood
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        } else {
          alert("No Planned Parenthood locations found nearby");
        }
      });
    }
  };

  if (!userLocation) return <div>Loading user location...</div>;

  return (
    <div>
      <button onClick={findPlannedParenthood}>
        Find Nearest Planned Parenthood
      </button>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          center={userLocation}
          zoom={14}
          mapContainerStyle={{ height: "400px", width: "100%" }}
        >
          <Marker position={userLocation} />
          {places.map((place, index) => (
            <Marker
              key={index}
              position={place.geometry.location}
              title={place.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
