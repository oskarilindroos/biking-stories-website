const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routermäärittelyt tänne

const app = express();

app.use(bodyParser.json());

// sallitaan CORS-pyynnöt ja autentikointi
app.use((req,res,next) => {
});

// tänne reitityskutsut

// olemattomien osoitteiden käsittely tänne
app.use((req, res, next) => {

});

// ketjun viimeinen virhekäsittelijä tänne
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500)
    .send({message: error.message || 'Unknown error' });
});

// MongoDB:n yhteyskuvaaja ja optioiden määrittelyt tänne
mongoose
    .connect(uri,options)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
