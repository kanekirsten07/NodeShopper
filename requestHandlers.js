function start(response) {

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

/*
function authenticate(response) 
{
console.log("Request handler authenticate was called.");
response.writeHead(500, {'Content-Type':'text/html'});
	response.end('authenticated');
}
*/

/*
function login(response) {
	console.log("request handler login was called.");
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
*/

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
//exports.login = login;
exports.postGroceries = postGroceries;
