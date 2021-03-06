var corsPrefix = "https://cors.io/?";
var apiUrl = "https://www.metaweather.com/api/location/";

$("#btn-city").click(function(event) {
  event.preventDefault();
  clearTable();
  var city = $("#city").val();
  if (city.length) {
    searchLocation(city);
  } else {
    throw new Error("City field is empty");
  }
});

function searchLocation(city) {
  var url = corsPrefix + apiUrl + "search/?query=" + city;
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function(response) {
      if (response[0].woeid) {
        showLocationInfo(response[0].woeid);
      }
    }
  });
}

function showLocationInfo(woeid) {
  var url = corsPrefix + apiUrl + woeid;
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function(response) {
      generateWeatherForecast(response);
    }
  });
}

function generateWeatherForecast(response) {
  for (var day in response.consolidated_weather) {
    var tableRow = "<tr>";
    tableRow +=
      "<td>" + response.consolidated_weather[day].applicable_date + "</td>";
    tableRow +=
      "<td>" +
      Math.round(response.consolidated_weather[day].max_temp) +
      "</td>";
    tableRow +=
      "<td>" +
      Math.round(response.consolidated_weather[day].min_temp) +
      "</td>";
    tableRow +=
      "<td>" + response.consolidated_weather[day].weather_state_name + "</td>";
    tableRow +=
      "<td><img src=\"https://www.metaweather.com/static/img/weather/ico/" +
      response.consolidated_weather[day].weather_state_abbr +
      ".ico\" alt=\"" +
      response.consolidated_weather[day].weather_state_name +
      "\"></td>";
    tableRow += "</tr>";
    $("#weather-data>tbody").append(tableRow);
  }
}

function clearTable() {
  $("#weather-data>tbody").empty();
}

$("#clear-data").click(function() {
  clearTable();
});
