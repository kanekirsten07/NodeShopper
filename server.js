var http = require("http");
var url = require("url");
var connect = require('connect');



function start(route, handle, response){
	function onRequest(request, response) {
	var postData = "";
	var pathname = url.parse(request.url).pathname;
	console.log("Request for" + pathname +" received");
	request.setEncoding("utf8");
    var app = connect();
	console.log(request.method);
	route(handle,pathname,response, request, connect, app)
	
}
var port = process.env.PORT || 8888;
http.createServer(onRequest).listen(port);

console.log("server has started. Listening on port " + port);
}
exports.start = start;
