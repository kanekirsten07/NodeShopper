var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/login"] = requestHandlers.start;
handle["/addgroceries"]=requestHandlers.addgroceries;
handle["/postGroceries"] = requestHandlers.postGroceries;
handle["/authenticate"] = requestHandlers.authenticate;
handle["/Groceries.css"]= requestHandlers.style;

server.start(router.route, handle);

