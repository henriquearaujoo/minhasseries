const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const url = 'mongodb+srv://root:rootar4uj0@cluster0-5lb1k.mongodb.net/minhasseries?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27017/minhasseries';

const pagesRouter = require('./routes/pages');
const seriesRouter = require('./routes/series');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pagesRouter);
app.use('/series', seriesRouter);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Servidor rodando...');
        }
    })
});