'use strict';

const express = require('express');
const ejs = require('ejs');
const app = express();
const chatCat = require('./app');

// var expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);

// app.use(ejs);
app.set('port', process.env.port || 8080);
app.use(express.static('public'));
//app.use(express.static('views'))
// app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', chatCat);

app.listen(app.get('port'), () => {
	console.log('ChatCat app running on port: ', app.get('port'))
})