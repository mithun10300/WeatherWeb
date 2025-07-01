const apiKey = "ff9f9beb2e9b96114932f68ee84133c9"; // ← Replace with your OpenWeatherMap API key

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
