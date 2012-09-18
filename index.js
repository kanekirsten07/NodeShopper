var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.addgroceries;
//handle["/login"] = requestHandlers.login;
handle["/addgroceries"]=requestHandlers.addgroceries;
handle["/postGroceries"] = requestHandlers.postGroceries;
handle["/authenticate"] = requestHandlers.authenticate;
handle["/Groceries.css"]= requestHandlers.style;
handle["/sakura.jpg"] = requestHandlers.backgroundimage;
handle["/viewgroceries"] = requestHandlers.viewgroceries;
handle["/register"]= requestHandlers.register;
handle["/adduser"] = requestHandlers.adduser;
//handle["/passwordreset"] = requestHandlers.passwordreset;
handle["/removegroceries"] = requestHandlers.removegroceries;
handle["/editgroceries"] = requestHandlers.editgroceries;
server.start(router.route, handle);

