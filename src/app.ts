import path from 'path';
import chalk from 'chalk';
import express from 'express';
const hbs = require('hbs');
const forecast = require('../dist/utils/forecast');
const geocode = require('../dist/utils/geocode');

const app = express();


// Set paths
const publicDir: string = path.join(__dirname, "./public");
const viewsPath: string = path.join(__dirname, "./templates/views");
const partialsPath: string = path.join(__dirname, "./templates/partials");

// Serve static files
app.use(express.static(publicDir));

// Use the Routes directory
app.use(require('./routes'));

// Set up handle bars
app.set("view engine", "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);




app.get('/weather', (req, res) => {

  const queryString = req.query;

  if (!queryString.address) {
    return res.send({
      error: 'an address must be provided'
    })
  }

  geocode.getCoordinates(queryString.address, (e: object, resCoordinatesData: any) => {
    if (e) {
      return res.send({error: e});
    }

    forecast.getWeather(resCoordinatesData.latitude, resCoordinatesData.longitude, (e: object, resWeatherData: object) => {
      if (e) {
        return res.send({error: e});
      }

      res.send({
        forecast: resWeatherData,
        address: resCoordinatesData.location,
      })
    })
    });
  });


app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Omar Rafat",
    errorMessage: "Page Not Found"
  });
});



// Listen
const PORT: number = 3000;
app.listen(PORT, () => {
  const message: string = chalk.green(`App is now running on port: ${PORT}`);
  console.log(message);
});
