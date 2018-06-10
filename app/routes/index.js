'use strict';

const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('login');
})

router.get('/rooms', (req, res, next) => {
	res.render('rooms');
})

router.get('/chat', (req, res, next) => {
	res.render('chat');
})

router.get('/setsession', (req, res, next) => {
	req.session.favColor = "red";
	res.send("Session set");
})

router.get('/getinfo', (req, res, next) => {
	res.send(JSON.stringify({ a: 1, b: 2.0 }));

})

router.get('/mybag', (req, res, next) => {
	res.send(JSON.stringify({ carrots: 16, bones: 20 }));
	console.log("Data: " + JSON.stringify({ carrots: 10, bones: 20 }));

})

router.use((req, res, next) => {
	res.status(404).sendFile(process.cwd() + '/views/404.html');
})

module.exports = router;