const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

const apiKey = 'b03316770ac9c22c1fa33452e94ad3ac';

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weather', (req, res) => {
    const zipCode = req.body.zipCode;

    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`)
        .then(response => {
            const weatherData = response.data;

            res.redirect(`/weather/show?name=${weatherData.name}&temp=${weatherData.main.temp}&description=${weatherData.weather[0].description}`);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            res.send('Error fetching weather data.');
        });
});

app.get('/weather/show', (req, res) => {
    const { name, temp, description } = req.query;

    res.render('weather/show', {
        cityName: name,
        temperature: temp,
        weatherDescription: description
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
