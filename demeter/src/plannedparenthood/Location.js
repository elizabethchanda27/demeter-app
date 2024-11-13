function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = "YAIzaSyD0ReaU9KkXn14a7UdmkwPUaLA6shryl90"; // Get this from Google Cloud
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=hospital&keyword=planned%20parenthood&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const nearest = data.results[0];
        document.getElementById("location-info").innerHTML = `
                    Nearest Planned Parenthood: ${nearest.name}<br>
                    Address: ${nearest.vicinity}
                `;
      } else {
        document.getElementById("location-info").innerHTML =
          "No Planned Parenthood locations found nearby.";
      }
    })
    .catch((error) => console.error("Error fetching data: ", error));
}
