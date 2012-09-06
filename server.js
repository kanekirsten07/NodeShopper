var http = require("http");
var url = require("url");


function start(route, handle, response){
	function onRequest(request, response) {
	var postData = "";
	var pathname = url.parse(request.url).pathname;
	console.log("Request for" + pathname +" received");
	request.setEncoding("utf8");
	
	console.log(request.method);
	route(handle,pathname,response, request)
	
}
http.createServer(onRequest).listen(8888);

console.log("server has started");
}
exports.start = start;
