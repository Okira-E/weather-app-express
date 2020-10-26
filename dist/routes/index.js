const express = require('express');
const router = express.Router();



router.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Omar Rafat"
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: "About this website",
        name: "Omar Rafat"
    });
});

router.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Omar Rafat"
    });
});

router.get('/help/*', (req, res) => {
    res.render('help-not-found', {
        title: "404",
        name: "Omar Rafat",
        errorMessage: "Help Article Not Found"
    });
});



module.exports = router;
