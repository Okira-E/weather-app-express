// Imports
const request = require('request');


const getWeather = (latitude, longitude, callBack) => {
  // Dark Sky API
  const _url = `https://api.darksky.net/forecast/${process.env.DARKSKY_TOKEN}/${latitude},${longitude}?units=si`;

    request({url: _url, json: true}, (e, res) => {
        if (e) {
            callBack("Sorry, Unable to connect to the network", undefined);
        } else if (res.body.error) {
            callBack("Sorry, Unable to find location", undefined);
        }else {
            const data = res.body.currently;
            const temperature = data.temperature;
            const chancesOfRain = Math.round(data.precipProbability * 100);
            const summaryForToday = res.body.daily.data[0].summary;


            callBack(undefined, `${summaryForToday} It is currently ${temperature}C degrees out, with a ${chancesOfRain}% chances of rain`);
        }
    })
};

module.exports = {
    getWeather
};
