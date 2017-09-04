var http = require('http');
var url = require('url');
var fs = require('fs');


function readAndServe(path, contentType, response) 
{
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }

    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

function createTask(text, callback) 
{
  readproducts(function(products) 
  {
    products.push(text);
    writeproducts(products, callback);
  });
}
function createcartproduct(cart ,callback) 
{
  readCartproducts(function(cartproducts) 
  {
    cartproducts.push(cart);
    writeCartproducts(cartproducts, callback);
  });
}
function createTask1(objid, callback) 
{
  readproducts(function(products) 
  {
	  var selectedIndex=getProductIndex(products,objid);
	  removeFromProductsArray(selectedIndex,products,callback)
    
  });
}
function createTask2(obj, callback) 
{
  readproducts(function(products) 
  {
	 
	  var selectedIndex=getProductIndexforEdit(products,obj);
	  EditInProductsArray(selectedIndex,products,obj,callback)
    
  });
}
function EditInProductsArray(selectedProductIndex,products,obj,callback)
{
				products[selectedProductIndex].Name=obj.name;
				products[selectedProductIndex].Price=obj.price;
				products[selectedProductIndex].Desc=obj.desc;
				products[selectedProductIndex].Quantity=obj.quantity;
						writeproducts(products,callback);
}

function getProductIndexforEdit(products,obj) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == obj.Id) 
		{
			return i
		}
    }
} 

function removeFromProductsArray(selectedProductIndex,products,callback)
{
	products.splice(selectedProductIndex,1);
	writeproducts(products,callback);
}
function getProductIndex(products,objid) 
{
    for (var i = 0; i < products.length; i++) 
	{
		
        if (products[i].Id == objid.ID) 
		{
			return i
		}
    }
} 


function readproducts(callback) 
{
	
		  fs.readFile('products', function(error, contents) 
		  {
			if (error) 
			{
			  throw error;
			}

			var products;
			if (contents.length === 0) 
			{
			  products = [];
			} 
			else 
			{
			  products = JSON.parse(contents);
			}
			callback(products);
		  });
	
	/*else if(pathname=="/cartproducts")
	{
		fs.readFile('cartproducts',function(error,contents)
		{
			if(error)
				throw error;
			var cartproducts;
			if (contents.length === 0) 
			{
			  cartproducts = [];
			} 
			else 
			{
			  cartproducts = JSON.parse(contents);
			}
			callback(cartproducts);
		  });
	}*/
	
}
function readCartproducts(callback) 
{
	
		  fs.readFile('cartproducts', function(error, contents) 
		  {
			if (error) 
			{
			  throw error;
			}

			var cartproducts;
			if (contents.length === 0) 
			{
			  cartproducts = [];
			} 
			else 
			{
			  cartproducts = JSON.parse(contents);
			  
			}
			callback(cartproducts);
		  });
	
	
}
function writeCartproducts(cartproducts,callback) 
{
  var cartproductsJSON = JSON.stringify(cartproducts);
  fs.writeFile('cartproducts', cartproductsJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}


function writeproducts(products, callback) 
{
  var productsJSON = JSON.stringify(products);
  fs.writeFile('products', productsJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}

/* Reads the JSON body of the request and parses it. Calls the given callback,
 * passing in the parsed object. */
function readJSONBody(request, callback) 
{
  var body = '';
  request.on('data', function(chunk) {
					 body += chunk;
			});

  request.on('end', function() {
					var data = JSON.parse(body);
					callback(data);
		   });
}

/* Serves files for the task list, and provides routes to create/delete products. */
http.createServer(function(request, response) 
{
  var pathname = url.parse(request.url).pathname;

  if (request.method === "GET") {
    if (pathname === "/") {
      readAndServe('addproductinnode.html', 'text/html', response);
    } else if (pathname === "myrealstyle.css" )
               {
      readAndServe('.' + pathname, 'text/css', response);
    } else if (pathname === "addproductScriptInNode.js")
	{     
      readAndServe('.' + pathname, 'text/javascript', response);
    }  else if (pathname === "/products") {
      readproducts(function(products) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(products));
        response.end();
      });
    } else {
      response.end();
    }
  } else if (request.method === "POST") {
	  console.log("received");
    if (pathname === "/products") {
      readJSONBody(request, function(task) {
        createTask(task, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/cartproducts") {
      readJSONBody(request, function(cart) {
		  console.log(cart);
        createcartproduct(cart, function() {
          
          response.end();
		  
        });
      });
    }
	else if(pathname==="/delete")
	{
		readJSONBody(request, function(objid) {
        createTask1(objid, function() {
          
          response.end();
		  
        });
      });
	}
	
	else if(pathname=="/edit")
	{
		readJSONBody(request, function(obj) {
        createTask2(obj, function() {
          
          response.end();
		});
		});
	}
	else {
      response.end();
    }
  } else {
    response.end();
  }
}).listen(12000,'127.0.0.1');

console.log('Running on 127.0.0.1:8000');
