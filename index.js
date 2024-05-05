// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


/**
 * Según los requisitos, si la cadena representando la fecha es inválida, 
 * la API debe devolver un objeto con la estructura { error: "Invalid Date" }.
 */

app.get("/api/:date?", function (req, res) {
  // Obtener la fecha del parámetro de la solicitud
  let dateString = req.params.date;

  // Procesar la fecha
  let date;
  if (!dateString) {
    date = new Date(); // Si no se proporciona ninguna fecha, obtener la fecha y hora actuales
  } else {
    // Convertir el parámetro dateString en un número si es posible
    let timestamp = isNaN(dateString) ? dateString : parseInt(dateString);
    date = new Date(timestamp);
    //date = new Date(dateString); // Analizar la cadena de fecha
  }

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    // Si la fecha no es válida, devolver un objeto con el mensaje de error
    return res.json({ error: 'Invalid Date' });
  }

  // Generar la marca de tiempo Unix
  let unix = date.getTime();

  // Generar el formato UTC
  let utc = date.toUTCString();

  // Devolver la respuesta
  res.json({ unix, utc });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

