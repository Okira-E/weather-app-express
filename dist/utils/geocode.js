// Imports
const request = require('request');


const getCoordinates = (address, callBack) => {
    // Map Box API
    const _url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_TOKEN}=1`;

    request({url: _url, json: true}, (e, res) => {
        if(e) {
            callBack("Sorry, Unable to connect to the network", undefined);
        } else if (res.body.features.length === 0) {
            callBack("Sorry, Unable to get data back", undefined);
        } else if (res.body.features[0].place_name.includes("Israel")) {
            callBack("Sorry, this country doesn't exist", undefined);
        }else {
            callBack(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            });
        }
    })
};


module.exports = {
    getCoordinates
};
