async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDiv = document.getElementById('weatherInfo');

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3fd6447525b74f8991945649252207&q=${city}&aqi=yes`);


    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const weatherHtml = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
      <img src="${data.current.condition.icon}" alt="weather icon" />
    `;

    weatherDiv.innerHTML = weatherHtml;
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
