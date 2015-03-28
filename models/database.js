
var pg = require('pg');
var config= require('../config/connection');
var client = new pg.Client(config.db);



client.connect(function(err,res){
	console.log('--- Postgre Database connected  ------');
});

var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY,name VARCHAR(40) not null,address VARCHAR(40) not null,email VARCHAR(40) not null,phone VARCHAR(40) not null)');

query.on('end', function() { 
	client.end(); 
});

