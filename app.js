const express = require('express');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const cors = require('cors');
const app = express();app.use(cors());
const PORT = process.env.PORT || 5000;

const URI = 'mongodb://test:test@54.237.230.167/Toets?retryWrites=true&w=majority';//mongo URI

const connection = mongoose.createConnection(URI);

let mongoGrid;

connection.once('open', () => {
    //Initialize MongoDB grid and collection
    mongoGrid = Grid(connection.db, mongoose.mongo);
    mongoGrid.collection('animals');
    console.log('Connected to database');
});


//Get all records from specified collection

app.get('/files', (req, res) => {
    
    mongoGrid.files.find().toArray(function(err, result) {
        console.log(result);
        res.send(result)
    });
});



app.get('/', (req, res) => {
    mongoGrid.files.find().toArray(function(err, result) {
        console.log(result);
        res.send(result)
    });
})

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
})
