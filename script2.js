
var products=getStoredProducts();
var cart=getStoredcartProducts();

function storecartProducts(cartproducts)	
{
localStorage.cartproducts = JSON.stringify(cartproducts);
}
function storeProducts(products)	
{
localStorage.products = JSON.stringify(products);
}

function getStoredProducts()
{
if (!localStorage.products)
{
// default to empty array
localStorage.products = JSON.stringify([]);
}
return JSON.parse(localStorage.products);
}

					function getStoredcartProducts()
					{
					if (!localStorage.cartproducts)
					{
					// default to empty arraycart
					localStorage.cartproducts = JSON.stringify([]);
					}
					return JSON.parse(localStorage.cartproducts);
					}
displaydata();
function cartproduct(id,name,price,quan)
{
	this.ID=id;
	this.Name=name;
	this.Quan=quan;
	this.Price=price;
}
function displaydata()
{
for(var i=0;i<products.length;i++)
{
	createviewdiv(products[i]);
}
}
function createviewdiv(objproduct)
{
	var orderedlist=document.getElementById("mylist");
	var listelem=document.createElement("li");
	 var division=document.createElement("div");
	division.setAttribute("class","divide");
	
	var leftdiv=document.createElement("div");
	leftdiv.setAttribute("class","left clear");
	
	console.log(typeof(objproduct));
	var lblprice = document.createElement("label");
	lblprice.innerHTML = "Price :"+parseInt(objproduct.Price*0.8);
	lblprice.setAttribute("style","font-weight:bold");
	leftdiv.appendChild(lblprice);
	
	var lblquantity = document.createElement("label");
	lblquantity.innerHTML = "  Quantity :"+objproduct.Quantity;
	lblquantity.setAttribute("style","font-weight:bold");
	leftdiv.appendChild(lblquantity);
	
	
	var lbldesc = document.createElement("label");
	lbldesc.textContent = "  Description :"+objproduct.Desc;
	lbldesc.setAttribute("style","font-weight:bold");
	leftdiv.appendChild(lbldesc);
	
	var lblid= document.createElement("label");
	lblid.innerHTML=""+objproduct.Id;
	lblid.setAttribute("class","id");
lblid.setAttribute("style","display:none;");
	leftdiv.appendChild(lblid);
	
	
	
	
	 
	
	
	var rightdiv=document.createElement("div");
	rightdiv.setAttribute("class","right clear");	
	
	var addtocartbtn=document.createElement("button");
	addtocartbtn.setAttribute("id","addcartbtnid");
	addtocartbtn.textContent="Add to Cart";
	
	

	
	var lblquan = document.createElement("label");
	lblquan.textContent ="Quantity : ";
	lblquan.setAttribute("style","font-weight:bold");
	
	
	var inputquantity = document.createElement("input");
	inputquantity.setAttribute("class","quantitytextbox");
	inputquantity.setAttribute("type","number");	
	inputquantity.setAttribute("min","1");
	inputquantity.setAttribute("value","1");
	inputquantity.setAttribute("max",objproduct.Quantity);
	
	rightdiv.appendChild(addtocartbtn);
	
	var brk=document.createElement("br");
	rightdiv.appendChild(brk);
	
		 brk=document.createElement("br");
	rightdiv.appendChild(brk);
	
	rightdiv.appendChild(lblquan);
	rightdiv.appendChild(inputquantity);
	
	
	var lblpname = document.createElement("h3");
	lblpname.setAttribute("id","lbpname");	
	
	lblpname.textContent=objproduct.Name;
	
	
		division.appendChild(lblpname);
		division.appendChild(leftdiv);
		division.appendChild(rightdiv);
		listelem.appendChild(division);
		orderedlist.appendChild(listelem);
		
	addtocartbtn.addEventListener("click",function(event)
	{
		var parentnode=event.target.parentNode.parentNode;
		
			var rghtdiv=event.target.parentNode;
			var quan=rghtdiv.querySelector('.quantitytextbox').value;
			quan=parseInt(quan);
			
		 var idvalue=parentnode.querySelector('.id').textContent;
		  var selectedIndex=getProductIndex(idvalue);
		 if(products[selectedIndex].Quantity>=quan)
		 {
		  products[selectedIndex].Quantity= products[selectedIndex].Quantity-quan;
		  storeProducts(products);
			document.getElementById('mylist').textContent="";
			displaydata();			 
			 console.log(cart);
		 }
		 else{
			 alert("Can't Possible !!!!");
		 }
		 var Index=-1;
		  Index=getcartProductIndex(idvalue);
		 
		 if(Index>=0)
		 {
			  cart[Index].Quan=cart[Index].Quan+quan;
		 }
		else{
			 var productcart=new cartproduct(products[selectedIndex].Id,products[selectedIndex].Name,parseInt(products[selectedIndex].Price*0.8),quan);
			 cart.push(productcart);
		}							
		console.log(cart);
		storecartProducts(cart);
	
	});
	
}

function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
		//console.log("jia mata di");
        if (products[i].Id == id) 
		{
			return i
		}
    }
} 
function getcartProductIndex(id) 
{
    for (var i = 0; i < cart.length; i++) 
	{
        if (cart[i].ID == id) 
		{
			return i
		}
	
    }
} 
