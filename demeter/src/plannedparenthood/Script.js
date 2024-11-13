// script.js

// Function to get user's current location and find nearby Planned Parenthood locations
function findNearbyService() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Create a PlacesService object to search for nearby locations
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        location: userLocation,
        radius: 5000, // Search within a 5 km radius
        type: ["hospital"], // 'hospital' type to search for medical locations
        keyword: "Planned Parenthood", // Search for Planned Parenthood
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // If results are found, display them
          displayNearbyServices(results);
        } else {
          // If no results are found, show an alert
          alert("No Planned Parenthood locations found nearby");
        }
      });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to display nearby service locations on the page
function displayNearbyServices(places) {
  const serviceResultElement = document.getElementById("serviceResult");
  serviceResultElement.innerHTML = ""; // Clear any previous results

  places.forEach((place) => {
    const placeName = place.name;
    const placeAddress = place.vicinity;

    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("service-item");
    serviceDiv.innerHTML = `
      <h4>${placeName}</h4>
      <p>${placeAddress}</p>
      <p><a href="https://www.google.com/maps?q=${place.geometry.location.lat()},${place.geometry.location.lng()}" target="_blank">View on Google Maps</a></p>
    `;
    serviceResultElement.appendChild(serviceDiv);
  });
}
