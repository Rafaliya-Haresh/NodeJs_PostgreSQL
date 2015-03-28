var pg = require('pg'),
    config= require('../config/connection');
/*
 * GET users listing.
 */

exports.list = function(req, res){
    
    pg.connect(config.db, function(err, client) {
         
         // SQL Query > Select Data
        client.query("SELECT * FROM users ORDER BY id ASC;",function(err,result){

            if(err) {
              console.log(err);
            }

            res.render('customers',{page_title:"Customers - Node.js",data:result.rows});
        });

        client.on('end', function() {
            client.end();
        });

    });
 
};

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){

    var id = req.params.id; 

     pg.connect(config.db, function(err, client) {
         
         // SQL Query > Edit Data
          client.query("SELECT * FROM users where id = ($1)",[id],function(err,result){

            if(err) {
              console.log(err);
            }

            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:result.rows});
          });

           client.on('end', function() {
            client.end();
          });

    });
    
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    pg.connect(config.db, function(err, client) {
        
        client.query("INSERT INTO users (name,address,email,phone) VALUES ($1,$2,$3,$4)",[input.name,input.address,input.email,input.phone], function(err, result) {

          if(err){
            console.log(err);
          }

            res.redirect('/customers');
         });

         client.on('end', function() {
            client.end();
          });
    });
   
};

exports.save_edit = function(req,res){
    
   
   var input = JSON.parse(JSON.stringify(req.body));
        var id = req.params.id;

      pg.connect(config.db, function(err, client) {
          
          client.query("UPDATE users set name=($1),address=($2),email=($3),phone=($4) where id = ($5)",[input.name,input.address,input.email,input.phone,id],function(err, result) {

            if(err){
              console.log(err);
            }

            res.redirect('/customers');
        });

           client.on('end', function() {
            client.end();
        });
      });
};


exports.delete_customer = function(req,res){
    
    var id = req.params.id;

    pg.connect(config.db, function(err, client) {
         
         // SQL Query > Delete Data
        client.query("DELETE FROM users  WHERE id = ($1)",[id],function(err,result){

            if(err) {
              console.log(err);
            }

            res.redirect('/customers');
        });

         client.on('end', function() {
            client.end();
        });
    });
    
};


