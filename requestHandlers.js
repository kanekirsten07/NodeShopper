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

function addtoDatabase()
{
	var pg = require('pg');

	pg.connect(process.env.DATABASE_URL, function(err, client) {

	var query = client.query('SELECT * from your_table');

	query.on('row', function(row) {
	console.log(JSON.stringify(row));

	});
	});
}
function postGroceries(response, request)
{
console.log("Request handler 'post groceries' was called.");
addtoDatabase();
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
