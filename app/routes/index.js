'use strict';

const router = require('express').Router();

const { Pool } = require('pg')

const pool = new Pool({
  host: 'bunnydbinstance.cw8sot6gsuk8.us-west-1.rds.amazonaws.com',
  user: 'sherryluo',
  password: 'Chxy1104',
  database: 'bunnyDB',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

router.get('/mybag', (req, res, next) => {
	pool.query(`SELECT * from bag where user_id='${req.query.user_id}'`, (err, resq) => {
		var map = {};
	  	if (err) {
		    console.log(err.stack)
	  	} else {
	    	resq.rows.forEach(function(mp) {
		    	map[mp.item] = mp.item_count;
	    	})  
		}
		res.send(JSON.stringify(map));
	})
})

router.get('/nearby-posts', (req, res, next) => {
	let query = `SELECT user_id, post_id, latitude, longitude, ST_Distance_Sphere(geo_point, ST_MakePoint(${req.query.longitude}, ${req.query.latitude})) as distance
		FROM posts 
		WHERE ST_Distance_Sphere(geo_point, ST_MakePoint(${req.query.longitude}, ${req.query.latitude})) <= ${req.query.meterRange};`;
	console.log(query);
	pool.query(query, (err, resq) => {
		var result = [];
	  	if (err) {
		    console.log(err.stack);
	  	} else {
	    	result = resq.rows;
		}
		res.send(JSON.stringify(result));
	})
})

router.post('/add-post', (req, res, next) => {
	let query = `INSERT INTO posts(user_id, post_id, post_text, ts, latitude, longitude, geo_point) 
		VALUES ('${req.query.user_id}', MD5(random()::text), '${req.query.post_text}', ${Date.now()}, 
		${req.query.latitude}, ${req.query.longitude}, ST_SetSRID(ST_MakePoint(${req.query.longitude}, ${req.query.latitude}), 4326))`;
	console.log(query);
	pool.query(query, (err, resq) => {
	  	if (err) {
		    console.log(err.stack);
		    res.send(err.stack);
	  	} else {
	    	res.send('New post added to database.');
		}

	})
})

router.use((req, res, next) => {
	res.status(404).sendFile(process.cwd() + '/views/404.html');
})

module.exports = router;