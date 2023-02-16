const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());

app.set("port", process.env.PORT || 3001);
app.locals.title = "blue-server";

app.get("/api/weather/:location", (request, res) => {
  const locationRequest = request.params.location;

  axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=cfbd919a9ea249db831213031231502&q=${locationRequest}&days=14&aqi=no&alerts=no`
    )
    .then((response) => {
      const data = response.data;
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send("Error retrieving data from third-party API");
    });
});

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});
