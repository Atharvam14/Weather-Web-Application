const path = require("path");
const weatherForecast = require("./utils/forecast.js");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aadesh Wasamkar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide the address",
    });
  }
  const city = req.query.address;
  weatherForecast(city, (weatherDetails) => {
    if (!weatherDetails.location || !weatherDetails.currTemp) {
      return res.send(weatherDetails);
    }
    res.send({
      location: weatherDetails.location,
      weather: weatherDetails.weather,
      currentTemperature: weatherDetails.currTemp,
      humidity: weatherDetails.humidity,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aadesh Wasamkar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Aadesh Wasamkar",
  });
});

app.get("/help/*", (req, res) => {
  res.render("about", {
    title: "404 Page",
    name: "Aadesh Wasamkar",
    Message: "The page with given url doesnt exist ....",
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    Message: "The page with given url doesnt exist ....",
    name: "Aadesh Wasamkar",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Aadesh Wasamkar",
    Message: "The page with given url doesnt exist ....e",
  });
});

app.listen(port, () => {
  console.log("Server is up at port " + port);
});
