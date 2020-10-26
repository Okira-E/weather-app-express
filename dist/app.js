"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const hbs = require('hbs');
const forecast = require('../dist/utils/forecast');
const geocode = require('../dist/utils/geocode');
const app = express_1.default();
// Set paths
const publicDir = path_1.default.join(__dirname, "./public");
const viewsPath = path_1.default.join(__dirname, "./templates/views");
const partialsPath = path_1.default.join(__dirname, "./templates/partials");
// Serve static files
app.use(express_1.default.static(publicDir));
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
        });
    }
    geocode.getCoordinates(queryString.address, (e, resCoordinatesData) => {
        if (e) {
            return res.send({ error: e });
        }
        forecast.getWeather(resCoordinatesData.latitude, resCoordinatesData.longitude, (e, resWeatherData) => {
            if (e) {
                return res.send({ error: e });
            }
            res.send({
                forecast: resWeatherData,
                address: resCoordinatesData.location,
            });
        });
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
const PORT = 3000;
app.listen(PORT, () => {
    const message = chalk_1.default.green(`App is now running on port: ${PORT}`);
    console.log(message);
});
