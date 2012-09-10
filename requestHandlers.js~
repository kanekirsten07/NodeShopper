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

function addtoDatabase(response)
{
	var pg = require('pg');
	var connectionString = "postgres://dttwzaxfdzyvhp:8M-MpF-5vs6siCJa4ZzJ6151qPQ@ec2-107-22-168-239.compute-1.amazonaws.com5432/d94t8jkg4frli";

	console.log('connecting to database');
	
	pg.connect(connectionString, function(err,client) {
	if(err) {
	console.log(err);
	console.log('connection error');
	}
	else {
	console.log('connection success');
	client.query('SELECT name FROM groceries', function(err, result) {
	if(err) {
	console.log(err);
	}
	else {
	for(var i=0; i<result.rows.length; i++) {
	response.write(result.rows[i].name);
	}
	response.end();
	}

});
}
});
}


function postGroceries(response, request)
{
console.log("Request handler 'post groceries' was called.");
addtoDatabase(response);
var qs = require('querystring');
if(request.method == 'POST') {
	var chunk = '';
	request.on('data', function(data) {
	chunk += data;
});
request.on('end', function() {
	var post = qs.parse(chunk);
	response.write(post.fooditem);
	response.write(post.datepurchased);
	var name = post.pname;
	
	if((name === "Andy") || (name ==="Alex") || (name==="Sacha") || (name ==="Kirsten"))
	{
		response.write(name);
	}else
	{
	response.write('Unrecognized name');
	
	}
	response.write(post.shared);
	if(post.taxable == null){
	response.write("no")
}else {
	response.write(post.taxable);
	
}



if(post.payedfor == null){
	response.write("no")
}else {
	response.write(post.payedfor);
	
}
response.end();
});
}else {
	console.log("get the hell out of here");
}


}


exports.start = start;
exports.addgroceries = addgroceries;
exports.style = style;
exports.postGroceries = postGroceries;
