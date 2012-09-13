function route(handle, pathname, response, request) {
	console.log("Routing request for " + pathname);
	if(typeof handle[pathname] == 'function') {
		handle[pathname](response, request, handle);
	}else {
	console.log("No Request handler found for " + pathname);
	response.writeHead(404, {"Content-type": "text/plain"});
		response.write("404 not found");
                                response.end();
		}		
}

exports.route = route;
