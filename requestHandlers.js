function addgroceries(response) {

console.log("Request handler 'start' was called.");
var fs = require('fs');

try {
 fs.readFile('./shoppinglist.html', function(error,html){
	if(error){
	console.log(error);
	response.writeHead(500, {'Content-Type':'text/html'});
	response.end('Internal Server error');
	}else {
		response.writeHead(200,{'Content-Type':'text/html'});
	response.end(html, 'utf-8');
}
});
}catch(err){
	response.writeHead(500,{'Content-Type':'text/plain'});
	response.end('Internal server error');
} 

}

function authenticate(response, request) {

	var uname, pword;


var qs = require('querystring');

if(request.method == 'POST') {
	var chunk = '';
	request.on('data', function(data) {
	chunk += data;
});
request.on('end', function() {
	post = qs.parse(chunk);
	uname = post.uname;
	pword = post.pword;
	response.write(uname);
	response.write(pword);

});
}else {
	response.write("There doesn't appear to be anything here");
	response.end();
}

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://eoppbrtqkixrmq:VQLEl3CHN5kdgy01vGUubutlj0@ec2-107-22-168-239.compute-1.amazonaws.com:5432/df1ejsqphkaeek";

console.log('connecting to database');
	console.log(connectionString);
	pg.connect(connectionString, function(err,client) {
	if(err) {
	console.log(err);
	console.log('connection error');
	}
	else {
	console.log('connection success');
	
	prepAuthenticate = {
	name: 'select uname',
	text: "Select username from Users where username = $1 and pword = crypt($2, pword)",
	values: [uname, pword]};
	
	client.query(prepAuthenticate , function(err, result) {
	if(err) {
	console.log(err);
	console.log('SQL Error');
	}else 
	{
	console.log("success");
	response.write(uname);
	response.write(pword);
	}
	response.end();
	

});
}
});


}

function viewgroceries(response) {

console.log("Request handler for /viewgroceries was called.");

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://eoppbrtqkixrmq:VQLEl3CHN5kdgy01vGUubutlj0@ec2-107-22-168-239.compute-1.amazonaws.com:5432/df1ejsqphkaeek";

console.log('connecting to database');
	console.log(connectionString);
	pg.connect(connectionString, function(err,client) {
	if(err) {
	console.log(err);
	console.log('connection error');
	}
	else {
	console.log('connection success');
	
	
	client.query("select * from septembergroceries" , function(err, result) {
	if(err) {
	console.log(err);
	console.log('SQL Error');
	}else 
	{
	console.log("success");
	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
	response.write('<table id = "groceries">');
	response.write('<tr><td>' + 'Name of Item' + '</td><td>' + 'Date Purchased '+ '</td><td>'+ 'Taxable?' + '</td><td>'+ 'Paid For' + '</td><td>'+ 'Purchaser Name' + '</td><td>'+ 'Shared?'+ "</td></tr>")
	for(var i =0; i<result.rows.length; i++) {
	response.write('<tr><td>' + result.rows[i].nameofitem + '</td><td>' + result.rows[i].datepurchased + '</td><td>'+ result.rows[i].taxable + '</td><td>'+ result.rows[i].paidfor + '</td><td>'+ result.rows[i].purchasername + '</td><td>'+ result.rows[i].shared+ '</td></tr>');
	}
	response.write('</table>');
	response.write('</body></html>');
	}
	response.end();
	

});
}
});

}




function start(response) {
	console.log("Request handler 'login' was called.");
var fs = require('fs');

try {
 fs.readFile('./login.html', function(error,html){
	if(error){
	console.log(error);
	response.writeHead(500, {'Content-Type':'text/html'});
	response.end('Internal Server error');
	}else {
		response.writeHead(200,{'Content-Type':'text/html'});
	response.end(html, 'utf-8');
}
});
}catch(err){
	response.writeHead(500,{'Content-Type':'text/plain'});
	response.end('Internal server error');
} 

}


function style(response)
{
console.log("Request handler 'style' was called.");
var fs = require('fs');

fs.readFile("Groceries.css", function(error,file) {
if(error) {
	response.writeHead(500, {"Content-Type":"text.plain"});
	response.write(error +"\n");
	response.end();

} else {
	response.writeHead(200, {"Content-Type":"text/css"});
	response.write(file);
	response.end();
}
});
}


function postGroceries(response, request)
{
console.log("Request handler 'post groceries' was called.");
var post, fooditem,datebought, name, shared, taxable, paidfor;

var qs = require('querystring');

if(request.method == 'POST') {
	var chunk = '';
	request.on('data', function(data) {
	chunk += data;
});
request.on('end', function() {
	post = qs.parse(chunk);
	fooditem = post.fooditem;
	 datebought = post.datepurchased;
	 name = post.pname;
	
	
	 shared = post.shared;
	if(post.taxable == null){
	 taxable = "no";
}else {
	taxable = post.taxable;
	
}



if(post.payedfor == null){
	 paidfor = "no";
}else {
	 paidfor = "yes";
	
}
response.end();
});
}else {
	response.write("There doesn't appear to be anything here");
	response.end();
}


var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://eoppbrtqkixrmq:VQLEl3CHN5kdgy01vGUubutlj0@ec2-107-22-168-239.compute-1.amazonaws.com:5432/df1ejsqphkaeek";

console.log('connecting to database');
	console.log(connectionString);
	pg.connect(connectionString, function(err,client) {
	if(err) {
	console.log(err);
	console.log('connection error');
	}
	else {
	console.log('connection success');
	prepInsert = {
	name: 'insert grocery',
	text:"INSERT INTO septembergroceries (nameofitem, datepurchased, taxable, paidfor, purchasername, shared) VALUES ($1, $2, $3, $4, $5, $6)",
	values: [fooditem, datebought, taxable, paidfor, name,shared]};
	
	client.query(prepInsert, function(err, result) {
	if(err) {
	console.log(err);
	console.log('Error');
	}else 
	{
	console.log("success");
	
	}
	
	

});
}
});



response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
response.write('<div id="success"><h1> Success!</h1><h3> You have placed an item in the database. What would you like to do now?</h3><br><br><form id="view"action="/viewgroceries" method ="get"><input type="submit" value="View Groceries"/></form><form id="add"action="/addgroceries" method ="get"><input type="submit" value="Add Another Item"/></form></div>');
response.write('</body></html>');

response.end();




}

function backgroundimage (response)
{
fs = require ('fs');
	var backgroundimage = fs.readFileSync('./sakura.jpg');
	response.writeHead(200, {'Content-Type': 'image/gif'});
	response.end(backgroundimage, 'binary');

}

exports.viewgroceries = viewgroceries;
exports.backgroundimage = backgroundimage;
exports.start = start;
exports.authenticate = authenticate;
exports.addgroceries  = addgroceries;
exports.style = style;
exports.postGroceries = postGroceries;
