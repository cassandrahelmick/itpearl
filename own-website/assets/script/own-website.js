document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("location");
  const searchButton = document.getElementById("display");
  const clearButton = document.getElementById("clear"); // <-- Clear button
  const errorMessage = document.getElementById("error-message");
  const tableBody = document.getElementById("forecast-table-body");
  const ctx = document.getElementById("forecast-chart").getContext("2d");

  let forecastChart;

  const defaultLocation = "Little Rock";

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  function clearError() {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }

  async function getGeolocation(query) {
    try {
      let response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
      );
      if (!response.ok) throw new Error("Geolocation API request failed.");

      let data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error("No location found. Try another.");
      }
      return data.results[0];
    } catch (error) {
      showError(error.message);
      return null;
    }
  }

  async function getWeatherForecast(lat, lon) {
    try {
      let response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&temperature_unit=fahrenheit&timezone=auto`
      );
      if (!response.ok) throw new Error("Weather API request failed.");

      let data = await response.json();
      if (!data.daily || !data.daily.time)
        throw new Error("No weather data available.");

      return data.daily;
    } catch (error) {
      showError(error.message);
      return null;
    }
  }

  function displayResults(locationData, forecastData) {
    clearError();

    document.getElementById("location-name").textContent = locationData.name;
    document.getElementById("admin-location").textContent =
      locationData.admin1 || "N/A";
    document.getElementById("country").textContent = locationData.country;
    document.getElementById("latitude").textContent =
      locationData.latitude.toFixed(2);
    document.getElementById("longitude").textContent =
      locationData.longitude.toFixed(2);

    tableBody.innerHTML = "";
    let labels = [];
    let temperatures = [];

    for (let i = 0; i < forecastData.time.length; i++) {
      let formattedDate = new Date(forecastData.time[i]).toLocaleDateString();
      let temp = forecastData.temperature_2m_max[i];

      labels.push(formattedDate);
      temperatures.push(temp);

      let row = `<tr>
              <td>${formattedDate}</td>
              <td>${temp}°F</td>
          </tr>`;
      tableBody.innerHTML += row;
    }

    displayChart(labels, temperatures);
  }

  function displayChart(labels, temperatures) {
    if (forecastChart) {
      forecastChart.destroy();
    }

    forecastChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Max Temperature (°F)",
            data: temperatures,
            borderColor: "blue",
            backgroundColor: "rgba(255, 0, 106, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false },
        },
      },
    });
  }

  async function handleSearch() {
    clearError();

    let query = locationInput.value.trim();
    if (!query) {
      showError("Please enter a location.");
      return;
    }

    let locationData = await getGeolocation(query);
    if (!locationData) return;

    let forecastData = await getWeatherForecast(
      locationData.latitude,
      locationData.longitude
    );
    if (!forecastData) return;

    displayResults(locationData, forecastData);
  }

  // Clear button functionality
  clearButton.addEventListener("click", () => {
    locationInput.value = "";
    tableBody.innerHTML = "";
    clearError();
    document.getElementById("location-name").textContent = "";
    document.getElementById("admin-location").textContent = "";
    document.getElementById("country").textContent = "";
    document.getElementById("latitude").textContent = "";
    document.getElementById("longitude").textContent = "";

    if (forecastChart) {
      forecastChart.destroy();
      forecastChart = null;
    }
    locationInput.focus(); // Optional: refocus input
  });

  searchButton.addEventListener("click", handleSearch);

  locationInput.value = defaultLocation;
  handleSearch();
});
