const apiKey = "ff9f9beb2e9b96114932f68ee84133c9"; // ← Replace with your OpenWeatherMap API key

function updateBackground(weatherType) {
  const video = document.getElementById("background");
  const source = video.querySelector("source");

  let videoFile = "clear.mp4"; // default

  if (weatherType.includes("Cloud")) {
    videoFile = "cloudy.mp4";
  } else if (weatherType.includes("Rain")) {
    videoFile = "rain.mp4";
  } else if (weatherType.includes("Snow")) {
    videoFile = "snow.mp4";
  } else if (weatherType.includes("Clear")) {
    videoFile = "clear.mp4";
  }

   const newSrc = `assets/videos/${videoFile}`;
  if (source.getAttribute("src") !== newSrc) {
    source.setAttribute("src", newSrc);
    video.load();
    video.play().catch((e) => console.warn("Autoplay error:", e));
  }
}

function getWeather() {
  const city = document.getElementById("cityInput").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      updateBackground(data.weather[0].main);
      const weatherData = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>🌥️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
      document.getElementById("weatherResult").innerHTML = weatherData;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from reloading the page
  getWeather();       // Call the weather fetch function
});
function updateClock() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  document.getElementById("date").textContent = `📅 ${date}`;
  document.getElementById("time").textContent = `⏰ ${time}`;
}

// Update every second
setInterval(updateClock, 1000);

// Run once when the page loads
updateClock();

