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

function passwordreset(response, request)
{

}


function authenticate(response, request, handle, connect, app) {

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
	var uname = result.rows[0];
	if (typeof(uname)!= 'undefined'){
	uname = uname.username;
	console.log(uname);
	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
    response.write('<div id="loginsuccess"><h1> Success!</h1><h3> You have successfully logged in. What would you like to do now?</h3><br><br><form id="view"action="/viewgroceries" method ="get"><input type="submit" value="View Groceries"/></form><form id="add"action="/addgroceries" method ="get"><input type="submit" value="Add Item To Database"/></form></div>');
    response.write('</body></html>');



    response.end();

	}else
	{
	console.log('unrecognized username');
	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
     response.write('<div id="loginfail"><h1> Fail.</h1><h3> Unrecognzied username and/or password</h3><br><br><p> Would you like to <a href="/login"> Try again?</a> </p<p> Have you <a href="/register"> registered yet?</a></p> <p> Have you <a href="/passwordreset"> forgotten your password?</a> </p></div>');
     response.write('</body></html>');

     response.end();

	}
	}



});
}
});


}

function register(response, request)
{
try {
 fs.readFile('./register.html', function(error,html){
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

function adduser(response,request)
{
               console.log("Request handler 'add user' was called.");
               var username, password, email;

               var qs = require('querystring');

               if(request.method == 'POST') {
               	var chunk = '';
               	request.on('data', function(data) {
               	chunk += data;
               });
               request.on('end', function() {
               	post = qs.parse(chunk);
               	username= post.uname;
               	 password = post.pword;
               	 email = post.email;
                       response.write(username + password + email)    ;
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
               	name: 'insert User',
               	text:"INSERT INTO Users  (username, pword, md5pwd) VALUES ($1, crypt($2, gen_salt('md5')), md5($2))",
               	values: [username, password]};

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

                  response.end();
}


function viewgroceries(response, request) {

console.log("Request handler for /viewgroceries was called.");
var viewmonth, viewday, post, purchaser;
var pg = require('pg');
var qs = require('querystring');
var connectionString = process.env.DATABASE_URL || "postgres://eoppbrtqkixrmq:VQLEl3CHN5kdgy01vGUubutlj0@ec2-107-22-168-239.compute-1.amazonaws.com:5432/df1ejsqphkaeek";

if(request.method=='POST')
	{

         var chunk = '';
         	request.on('data', function(data) {
         	chunk += data;

         });
         request.on('end', function() {
         	post = qs.parse(chunk);
         	viewmonth = post.month;
         	viewday = post.day;
         	purchaser = post.purchaser;
             if((viewday==="" || viewday==="-Day-") && (viewmonth==="" || viewmonth==="-Month-"))
             {
                 console.log('connecting to database');
                 	console.log(connectionString);
                 	pg.connect(connectionString, function(err,client) {
                 	if(err) {
                 	console.log(err);
                 	console.log('connection error');
                 	}
                 	else {

                 	console.log('connection success');
                    onlyPurchaser ={
                    name: 'select purchaser',
                    text: 'select * from groceries where purchasername=$1 order by datepurchased asc'  ,
                    values:[purchaser]};

                 	client.query(onlyPurchaser , function(err, result) {
                 	if(err) {
                 	console.log(err);
                 	console.log('SQL Error');
                 	}else
                 	{

                 	var id;
                    	console.log("success");
                    	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
                    	response.write('<div id="groceriesdiv">')
                    	response.write('<table id = "groceries">');
                    	response.write('<tr><td>' + 'Name of Item' + '</td><td>' + 'Date Purchased '+ '</td><td>'+ 'Taxable?' + '</td><td>'+ 'Paid For' + '</td><td>'+ 'Purchaser Name' + '</td><td>'+ 'Shared?'+ '</td><td>'+ 'Price'+ '</td><td>' + 'Date Entered'+'</td></tr>');
                    	for(var i =0; i<result.rows.length; i++) {
                    	 id = result.rows[i].myid;
                    	response.write('<tr id=row'+id+'><td>' + result.rows[i].nameofitem + '</td><td>' + result.rows[i].datepurchased + '</td><td>'+ result.rows[i].taxable + '</td><td>'+ result.rows[i].paidfor + '</td><td>'+ result.rows[i].purchasername + '</td><td>'+ result.rows[i].shared+ '</td><td>' + result.rows[i].price + '</td><td>' + result.rows[i].dateentered + '</td><td><button class="edit" type="button" value ="'+id+'"> Edit</button> <button class="remove" type="button" value ="'+id+'">Remove</button></tr>');
                    	}
                    	response.write('</table>');
                    	response.write('<p>Input either a standalone month, purchaser, a combination of month/purchaser, month/day or all three to filter your results</p>')
                    	response.write('<form name="viewoptions" onsubmit = "return deletediv();" action="/viewgroceries" method="POST">');
                    	response.write('Month: <select id="month"name="month"> <option value=""> -Month-</option><option value="1"> January</option><option value="2"> February </option><option value="3"> March </option> <option value ="4"> April</option> <option value="5"> May </option> <option value="6"> June</option>');
                    	response.write('<option value="7"> July </option> <option value="8"> August</option> <option value="9"> September </option> <option value="10"> October</option> <option value ="11"> November</option> <option value="12"> December </option></select>')
                    	response.write('Day: <select id="day"name ="day"> <option> -Day-</option> <option value="1"> 1</option> <option value="2"> 2</option><option value="3"> 3</option> <option value="4"> 4</option> <option value="5"> 5</option><option value="6"> 6</option> <option value="7"> 7</option><option value="8">8</option>');
                    	response.write('<option value="9"> 9</option> <option value="10"> 10</option> <option value="11"> 11</option><option value="12"> 12</option> <option value="13"> 13</option> <option value="14"> 14</option><option value="15">15</option>');
                    	response.write('<option value="16"> 16</option> <option value="17">17</option><option value="18">18</option> <option value="19"> 19</option><option value="20"> 20</option><option value="21"> 21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option> <option value="26">26</option><option value="27">27</option>');
                    	response.write('<option value="28">28</option><option value="29"> 29</option><option value="30"> 30</option> <option value="31">31</option></select>');
                    	response.write('Purchaser: <select id="purchaser" name="purchaser"><option value="">Select</option>  <option value="Kirsten"> Kirsten</option> <option value="Andy"> Andy </option> <option value="Alex">Alex</option><option value="Sacha"> Sacha</option></select>');
                    	response.write('<input type="submit" value = "Filter"/></form>');
                    	response.write('<form id="view" onsubmit = "return deletediv();"action="/viewgroceries" method ="get"><input type="submit" value="View All"</input></form>');
                    	response.write('</div>');
                    	response.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>')
                    	response.write('<script type="text/javascript"> $(".remove").click(function(e){$.ajax({type:"POST", url: "/removegroceries", data:{id:e.currentTarget.value}, success: function(){var cid = e.currentTarget.value; var row = "#row" + cid; $(row).hide("slow");}});});$(".edit").click(function(e){$.ajax({type:"POST", url: "/editgroceries", data:{id:e.currentTarget.value}});});function deletediv() { var d = document.getElementById("groceries"); d.parentNode.removeChild(d);} </script>');
                    	response.write('</body></html>');
                 	}
                 	response.end();
                     });
                     }
                     });
           } else if (viewday=== '-Day-'|| viewday ==="")
                       {
                                          console.log('month') ;
                                          console.log('connecting to database');
                                          	console.log(connectionString);
                                          	pg.connect(connectionString, function(err,client) {
                                          	if(err) {
                                          	console.log(err);
                                          	console.log('connection error');
                                          	}
                                          	else {
                                          	console.log('connection success');
                                          	if(!(purchaser === ""))
                                          	{
                                          	      selectMonthOnly ={
                                          	      name: 'select month and purchaser',
                                          	      text: 'select * from groceries where extract(month from "datepurchased") = $1 and purchasername = $2 order by datepurchased asc'  ,
                                          	      values:[viewmonth, purchaser]};
                                          	}else{
                                             selectMonthOnly = {
                                             	name: 'select month',
                                             	text:'select * from groceries where extract(month from "datepurchased")= $1 order by datepurchased asc' ,
                                             	values: [viewmonth]};
                                                  }

                                          	client.query(selectMonthOnly, function(err, result) {
                                          	if(err) {
                                          	console.log(err);
                                          	console.log('SQL Error');
                                          	}else
                                          	{

                                          	var id;
                                            	console.log("success");
                                            	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
                                            	response.write('<div id="groceriesdiv">')
                                            	response.write('<table id = "groceries">');
                                            	response.write('<tr><td>' + 'Name of Item' + '</td><td>' + 'Date Purchased '+ '</td><td>'+ 'Taxable?' + '</td><td>'+ 'Paid For' + '</td><td>'+ 'Purchaser Name' + '</td><td>'+ 'Shared?'+ '</td><td>'+ 'Price'+ '</td><td>' + 'Date Entered'+'</td></tr>');
                                            	for(var i =0; i<result.rows.length; i++) {
                                            	 id = result.rows[i].myid;
                                            	response.write('<tr id=row'+id+'><td>' + result.rows[i].nameofitem + '</td><td>' + result.rows[i].datepurchased + '</td><td>'+ result.rows[i].taxable + '</td><td>'+ result.rows[i].paidfor + '</td><td>'+ result.rows[i].purchasername + '</td><td>'+ result.rows[i].shared+ '</td><td>' + result.rows[i].price + '</td><td>' + result.rows[i].dateentered + '</td><td><button class="edit" type="button" value ="'+id+'"> Edit</button> <button class="remove" type="button" value ="'+id+'">Remove</button></tr>');
                                            	}
                                            	response.write('</table>');
                                            	response.write('<p>Input either a standalone month, purchaser, a combination of month/purchaser, month/day or all three to filter your results</p>')
                                            	response.write('<form name="viewoptions" onsubmit = "return deletediv();" action="/viewgroceries" method="POST">');
                                            	response.write('Month: <select id="month"name="month"> <option value=""> -Month-</option><option value="1"> January</option><option value="2"> February </option><option value="3"> March </option> <option value ="4"> April</option> <option value="5"> May </option> <option value="6"> June</option>');
                                            	response.write('<option value="7"> July </option> <option value="8"> August</option> <option value="9"> September </option> <option value="10"> October</option> <option value ="11"> November</option> <option value="12"> December </option></select>')
                                            	response.write('Day: <select id="day"name ="day"> <option> -Day-</option> <option value="1"> 1</option> <option value="2"> 2</option><option value="3"> 3</option> <option value="4"> 4</option> <option value="5"> 5</option><option value="6"> 6</option> <option value="7"> 7</option><option value="8">8</option>');
                                            	response.write('<option value="9"> 9</option> <option value="10"> 10</option> <option value="11"> 11</option><option value="12"> 12</option> <option value="13"> 13</option> <option value="14"> 14</option><option value="15">15</option>');
                                            	response.write('<option value="16"> 16</option> <option value="17">17</option><option value="18">18</option> <option value="19"> 19</option><option value="20"> 20</option><option value="21"> 21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option> <option value="26">26</option><option value="27">27</option>');
                                            	response.write('<option value="28">28</option><option value="29"> 29</option><option value="30"> 30</option> <option value="31">31</option></select>');
                                            	response.write('Purchaser: <select id="purchaser" name="purchaser"><option value="">Select</option>  <option value="Kirsten"> Kirsten</option> <option value="Andy"> Andy </option> <option value="Alex">Alex</option><option value="Sacha"> Sacha</option></select>');
                                            	response.write('<input type="submit" value = "Filter"/></form>');
                                            	response.write('<form id="view" onsubmit = "return deletediv();"action="/viewgroceries" method ="get"><input type="submit" value="View All"</input></form>');
                                            	response.write('</div>');
                                            	response.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>')
                                            	response.write('<script type="text/javascript"> $(".remove").click(function(e){$.ajax({type:"POST", url: "/removegroceries", data:{id:e.currentTarget.value}, success: function(){var cid = e.currentTarget.value; var row = "#row" + cid; $(row).hide("slow");}});});$(".edit").click(function(e){$.ajax({type:"POST", url: "/editgroceries", data:{id:e.currentTarget.value}});});function deletediv() { var d = document.getElementById("groceries"); d.parentNode.removeChild(d);} </script>');
                                            	response.write('</body></html>');
                                          	}
                                          	response.end();
                                              });
                                              }
                                              });
                       }else   {
                       console.log('month and day');
                       console.log(viewmonth);
                       console.log(viewday);
                       console.log('connecting to database');
                                                                 console.log(connectionString);
                                                                 	pg.connect(connectionString, function(err,client) {
                                                                 	if(err) {
                                                                 	console.log(err);
                                                                 	console.log('connection error');
                                                                 	}
                                                                 	else {
                                                                 	console.log('connection success');
                                                                 	if(!(purchaser === ""))
                                                                    {
                                                                    selectMonthandDay ={
                                                                     name: 'select month and day and purchaser',
                                                                      text: 'select * from groceries where extract(month from "datepurchased")= $1 and extract(day from "datepurchased")=$2and purchasername = $2 order by datepurchased asc'  ,
                                                                       values:[viewmonth, viewday, purchaser]};
                                                                      }else{
                                                                    selectMonthandDay = {
                                                                    	name: 'select month and day',
                                                                    	text:'select * from groceries where extract(month from "datepurchased")= $1 and extract(day from "datepurchased")=$2 order by datepurchased asc',
                                                                    	values: [viewmonth, viewday]};
                                                                              }
                                                                 	client.query(selectMonthandDay, function(err, result) {
                                                                 	if(err) {
                                                                 	console.log(err);
                                                                 	console.log('SQL Error');
                                                                 	}else
                                                                 	{
var id;
	console.log("success");
	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
	response.write('<div id="groceriesdiv">')
	response.write('<table id = "groceries">');
	response.write('<tr><td>' + 'Name of Item' + '</td><td>' + 'Date Purchased '+ '</td><td>'+ 'Taxable?' + '</td><td>'+ 'Paid For' + '</td><td>'+ 'Purchaser Name' + '</td><td>'+ 'Shared?'+ '</td><td>'+ 'Price'+ '</td><td>' + 'Date Entered'+'</td></tr>');
	for(var i =0; i<result.rows.length; i++) {
	 id = result.rows[i].myid;
	response.write('<tr id=row'+id+'><td>' + result.rows[i].nameofitem + '</td><td>' + result.rows[i].datepurchased + '</td><td>'+ result.rows[i].taxable + '</td><td>'+ result.rows[i].paidfor + '</td><td>'+ result.rows[i].purchasername + '</td><td>'+ result.rows[i].shared+ '</td><td>' + result.rows[i].price + '</td><td>' + result.rows[i].dateentered + '</td><td><button class="edit" type="button" value ="'+id+'"> Edit</button> <button class="remove" type="button" value ="'+id+'">Remove</button></tr>');
	}
	response.write('</table>');
	response.write('<p>Input either a standalone month, purchaser, a combination of month/purchaser, month/day or all three to filter your results</p>')
	response.write('<form name="viewoptions" onsubmit = "return deletediv();" action="/viewgroceries" method="POST">');
	response.write('Month: <select id="month"name="month"> <option value=""> -Month-</option><option value="1"> January</option><option value="2"> February </option><option value="3"> March </option> <option value ="4"> April</option> <option value="5"> May </option> <option value="6"> June</option>');
	response.write('<option value="7"> July </option> <option value="8"> August</option> <option value="9"> September </option> <option value="10"> October</option> <option value ="11"> November</option> <option value="12"> December </option></select>')
	response.write('Day: <select id="day"name ="day"> <option> -Day-</option> <option value="1"> 1</option> <option value="2"> 2</option><option value="3"> 3</option> <option value="4"> 4</option> <option value="5"> 5</option><option value="6"> 6</option> <option value="7"> 7</option><option value="8">8</option>');
	response.write('<option value="9"> 9</option> <option value="10"> 10</option> <option value="11"> 11</option><option value="12"> 12</option> <option value="13"> 13</option> <option value="14"> 14</option><option value="15">15</option>');
	response.write('<option value="16"> 16</option> <option value="17">17</option><option value="18">18</option> <option value="19"> 19</option><option value="20"> 20</option><option value="21"> 21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option> <option value="26">26</option><option value="27">27</option>');
	response.write('<option value="28">28</option><option value="29"> 29</option><option value="30"> 30</option> <option value="31">31</option></select>');
	response.write('Purchaser: <select id="purchaser" name="purchaser"><option value="">Select</option>  <option value="Kirsten"> Kirsten</option> <option value="Andy"> Andy </option> <option value="Alex">Alex</option><option value="Sacha"> Sacha</option></select>');
	response.write('<input type="submit" value = "Filter"/></form>');
	response.write('<form id="view" onsubmit = "return deletediv();"action="/viewgroceries" method ="get"><input type="submit" value="View All"</input></form>');
	response.write('</div>');
	response.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>')
	response.write('<script type="text/javascript"> $(".remove").click(function(e){$.ajax({type:"POST", url: "/removegroceries", data:{id:e.currentTarget.value}, success: function(){var cid = e.currentTarget.value; var row = "#row" + cid; $(row).hide("slow");}});});$(".edit").click(function(e){$.ajax({type:"POST", url: "/editgroceries", data:{id:e.currentTarget.value}});});function deletediv() { var d = document.getElementById("groceries"); d.parentNode.removeChild(d);} </script>');
	response.write('</body></html>');
                                                                 	}
                                                                 	response.end();
                                                                     });
                                                                     }
                                                                     });
                       }
         });



	}else
	{console.log('connecting to database');
	console.log(connectionString);
	pg.connect(connectionString, function(err,client) {
	if(err) {
	console.log(err);
	console.log('connection error');
	}
	else {
	console.log('connection success');


	client.query("select * from groceries order by datepurchased asc" , function(err, result) {
	if(err) {
	console.log(err);
	console.log('SQL Error');
	}else
	{
    var id;
	console.log("success");
	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
	response.write('<div id="groceriesdiv">')
	response.write('<table id = "groceries">');
	response.write('<tr><td>' + 'Name of Item' + '</td><td>' + 'Date Purchased '+ '</td><td>'+ 'Taxable?' + '</td><td>'+ 'Paid For' + '</td><td>'+ 'Purchaser Name' + '</td><td>'+ 'Shared?'+ '</td><td>'+ 'Price'+ '</td><td>' + 'Date Entered'+'</td></tr>');
	for(var i =0; i<result.rows.length; i++) {
	 id = result.rows[i].myid;
	response.write('<tr id=row'+id+'><td>' + result.rows[i].nameofitem + '</td><td>' + result.rows[i].datepurchased + '</td><td>'+ result.rows[i].taxable + '</td><td>'+ result.rows[i].paidfor + '</td><td>'+ result.rows[i].purchasername + '</td><td>'+ result.rows[i].shared+ '</td><td>' + result.rows[i].price + '</td><td>' + result.rows[i].dateentered + '</td><td><button class="edit" type="button" value ="'+id+'"> Edit</button> <button class="remove" type="button" value ="'+id+'">Remove</button></tr>');
	}
	response.write('</table>');
	response.write('<p>Input either a standalone month, purchaser, a combination of month/purchaser, month/day or all three to filter your results</p>')
	response.write('<form name="viewoptions" onsubmit = "return deletediv();" action="/viewgroceries" method="POST">');
	response.write('Month: <select id="month"name="month"> <option value=""> -Month-</option><option value="1"> January</option><option value="2"> February </option><option value="3"> March </option> <option value ="4"> April</option> <option value="5"> May </option> <option value="6"> June</option>');
	response.write('<option value="7"> July </option> <option value="8"> August</option> <option value="9"> September </option> <option value="10"> October</option> <option value ="11"> November</option> <option value="12"> December </option></select>')
	response.write('Day: <select id="day"name ="day"> <option> -Day-</option> <option value="1"> 1</option> <option value="2"> 2</option><option value="3"> 3</option> <option value="4"> 4</option> <option value="5"> 5</option><option value="6"> 6</option> <option value="7"> 7</option><option value="8">8</option>');
	response.write('<option value="9"> 9</option> <option value="10"> 10</option> <option value="11"> 11</option><option value="12"> 12</option> <option value="13"> 13</option> <option value="14"> 14</option><option value="15">15</option>');
	response.write('<option value="16"> 16</option> <option value="17">17</option><option value="18">18</option> <option value="19"> 19</option><option value="20"> 20</option><option value="21"> 21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option> <option value="26">26</option><option value="27">27</option>');
	response.write('<option value="28">28</option><option value="29"> 29</option><option value="30"> 30</option> <option value="31">31</option></select>');
	response.write('Purchaser: <select id="purchaser" name="purchaser"><option value="">Select</option>  <option value="Kirsten"> Kirsten</option> <option value="Andy"> Andy </option> <option value="Alex">Alex</option><option value="Sacha"> Sacha</option></select>');
	response.write('<input type="submit" value = "Filter"/></form>');
	response.write('<form id="view" onsubmit = "return deletediv();"action="/viewgroceries" method ="get"><input type="submit" value="View All"</input></form>');
	response.write('</div>');
	response.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>')
	response.write('<script type="text/javascript"> $(".remove").click(function(e){$.ajax({type:"POST", url: "/removegroceries", data:{id:e.currentTarget.value}, success: function(){var cid = e.currentTarget.value; var row = "#row" + cid; $(row).hide("slow");}});});$(".edit").click(function(e){$.ajax({type:"POST", url: "/editgroceries", data:{id:e.currentTarget.value}});});function deletediv() { var d = document.getElementById("groceries"); d.parentNode.removeChild(d);} </script>');
	response.write('</body></html>');
	}
	response.end();
    });
    }
    });
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


function postGroceries(response, request)
{
console.log("Request handler 'post groceries' was called.");
var post, fooditem,datebought, name, shared, taxable, paidfor, itemprice, pin;

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
      itemprice = post.price;
          pin = post.PIN;
          console.log(pin);
   if(!(pin === "1363")){
          response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
               response.write('<div id="pinfail"><h1> Fail.</h1><h3> Incorrect PIN</h3><br><br> <a href="/addgroceries"> Try again?</a></div>');
               response.write('</body></html>');
               response.end();
   }

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
	text:"INSERT INTO groceries (nameofitem, datepurchased, taxable, paidfor, purchasername, shared, price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
	values: [fooditem, datebought, taxable, paidfor, name,shared, itemprice]};

	client.query(prepInsert, function(err, result) {
	if(err) {
	console.log(err);
	console.log('Error');
	response.write('<!DOCTYPE html> <html> <head> <link rel="stylesheet" type="text/css" href="Groceries.css" /></head><body>');
               response.write('<div id="success"><h1>Sorry about that</h1><h3> There appears to have been an SQL error. Please try again</h3><br><br><form id="view"action="/addgroceries" method ="get"><input type="submit" value="Try again"/></div>');
               response.write('</body></html>');

               response.end();
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

function removegroceries(response, request)
{
      console.log("Request handler for /removegroceries called.");

      var myid;

      var qs = require('querystring');

      if(request.method == 'POST') {
      	var chunk = '';
      	request.on('data', function(data) {
      	chunk += data;
      });
      request.on('end', function() {
      	post = qs.parse(chunk);
                myid = post.id;
                console.log(myid);





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
      	prepDelete = {
      	name: 'delete grocery',
      	text:"delete from groceries where myid = $1",
      	values: [myid]};

      	client.query(prepDelete, function(err, result) {
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
}

function editgroceries(response, request)
{

}

function backgroundimage (response)
{
fs = require ('fs');
	var backgroundimage = fs.readFileSync('./sakura.jpg');
	response.writeHead(200, {'Content-Type': 'image/gif'});
	response.end(backgroundimage, 'binary');

}
exports.register = register;
exports.viewgroceries = viewgroceries;
exports.backgroundimage = backgroundimage;
exports.start = start;
exports.authenticate = authenticate;
exports.addgroceries  = addgroceries;
exports.style = style;
exports.postGroceries = postGroceries;
exports.adduser = adduser;
//exports.passwordreset = passwordreset;
exports.removegroceries = removegroceries;
exports.editgroceries = editgroceries;