var table=document.getElementById('table');
var carttproducts=getStoredcartProducts();
var  products=getStoredProducts();
var total=0;
var orderid=1;
var odid=1;
 var headerarray=getstoreheader();
 var detailarray=getstoredetail();
function getStoredProducts()
{
	if (!localStorage.products)
	{
	// default to empty array
	localStorage.products = JSON.stringify([]);
	}
return JSON.parse(localStorage.products);
}

	function storeProducts(products)	
	{
	localStorage.products = JSON.stringify(products);
	}
	
	


		function storecartProducts(cartproducts)	
		{
		localStorage.cartproducts = JSON.stringify(cartproducts);
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
					
			function tableheading()
			{
				var frow=document.createElement('tr');
	
				var pname=document.createElement('th');
				pname.textContent="Product Name";
				frow.appendChild(pname);

				var pprice=document.createElement('th');
				pprice.textContent="Product Price";
				frow.appendChild(pprice);
				
				
				var pQuant=document.createElement('th');
				pQuant.textContent="Product Quantity";
				frow.appendChild(pQuant);
				
				var psubtotal=document.createElement('th');
				psubtotal.textContent="Sub Total";
				frow.appendChild(psubtotal);
				
				var pDelete=document.createElement('th');
				pDelete.textContent="Delete";
				frow.appendChild(pDelete);
				table.appendChild(frow);
			}			
			
function displaydata()
{
	tableheading();
	for(var i=0;i<carttproducts.length;i++)
	{
		 displaydataintable(carttproducts[i]);
		 Summ(carttproducts[i]);
	}
	var tr=document.createElement('tr');
	
	var sum=document.createElement('td');
	sum.setAttribute("colspan","2");
	sum.innerHTML="<b>TOTAL</b>";
	tr.appendChild(sum);
	
	var Total=document.createElement('td');
	
	Total.setAttribute("colspan","2");
	Total.innerHTML="<b>"+total+"</b>";
	
	tr.appendChild(Total);
					
	table.appendChild(tr);
}
					
function displaydataintable(objcartProduct)
{
		var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.setAttribute("style","display:none");
	id.textContent=objcartProduct.ID;
	tr.appendChild(id);
	
	var name=document.createElement('td');
	name.textContent=objcartProduct.Name;
	tr.appendChild(name);

	var price=document.createElement('td');
	price.textContent=objcartProduct.Price;
	tr.appendChild(price);
	
	
	//var Quant=document.createElement('td');
	//Quant.innerHTML="<input type=\"number\" id=\"quanttext\" min=\"1\" value=\""+objcartProduct.Quan+"\"/>";
	var Quant=document.createElement('td');
	var Text=document.createElement('input');
	Text.setAttribute("type","number");
	Text.setAttribute("min","1");
	Text.setAttribute("id","quanttxt");
	Text.setAttribute("max",objcartProduct.Quan);
	
	Text.setAttribute("value",objcartProduct.Quan);
	Quant.appendChild(Text);
	tr.appendChild(Quant);
	Text.addEventListener("change",function(event)
	{
		var parentnode=event.target.parentNode;
		objcartProduct.Quan=parentnode.childNodes[0].value;
		
		 var targetParent = event.target.parentNode.parentNode;
		var selectedProductIndex = getcartProductIndex(parseInt(targetParent.childNodes[0].textContent)); 
		
		carttproducts[selectedProductIndex].Quan=objcartProduct.Quan;	
		
		subtotal.textContent=objcartProduct.Price*objcartProduct.Quan;
		table.textContent="";
		displaydata();
		total=0;
		
	});
	
	var subtotal=document.createElement('td');
	subtotal.textContent=objcartProduct.Price*objcartProduct.Quan;
	tr.appendChild(subtotal);
	
	var Delete=document.createElement('td');
	Delete.innerHTML=" <button class=\"delete\">&#215;</button>";
	tr.appendChild(Delete);
	table.appendChild(tr);
	Del(tr);
	
	}
	 
	function Del(tr)
{
	var delbutton=tr.querySelector('.delete');
delbutton.addEventListener('click',function(event)
{
										 var targetParent = event.target.parentNode.parentNode;
										  var selectedProductIndex = getcartProductIndex(parseInt(targetParent.childNodes[0].textContent)); 
										
										   var quan=targetParent.childNodes[3].childNodes[0].value;
											
											removeFromcartProductsArray(selectedProductIndex);
										    targetParent.parentNode.removeChild(targetParent);
										
											var Index = getProductIndex(parseInt(targetParent.childNodes[0].textContent)); 
										
											products[Index].Quantity=parseInt(products[Index].Quantity)+parseInt(quan);
											storeProducts(products);
										
										   targetParent.parentNode.removeChild(targetParent);
										   
										
											table.textContent="";
											total=0;
											displaydata();
										

});
}
var orderplace=document.getElementById("placeorder");
orderplace.addEventListener("click",function(event)
{
	
	uid=1;
	giveorderid();
	var headerobj=new makeheaderobj(orderid,"1","Orderplace",uid);
	
	headerarray.push(headerobj);
	
	console.log(headerarray);
	storeheader(headerarray);
	for(var i=0;i<carttproducts.length;i++)
	{
		var detailobj=new makedetailobj(carttproducts[i],orderid);
		detailarray.push(detailobj);
	}
	
	storedetail(detailarray);
	
	carttproducts=[];
	storecartProducts(carttproducts);
	table.textContent="";
	tableheading();
	
	

});
 function giveorderid()
 {
	 if(headerarray.length>0)
		 orderid=headerarray[headerarray.length-1].orderid+1;
	 
 }
 function giveodid()
 {
	 if(detailarray.length>0)
		 odid=detailarray[detailarray.length-1].odid+1;
	 
 }
 
function  makeheaderobj(orderid,active,Status,userid)
{
	
	this.orderid=orderid;
	this.active=active;
	this.Status=Status;
	this.userid=userid;
	this.date=new Date();
	carttproducts=getStoredcartProducts();
	total=0;
	for(var i=0;i<carttproducts.length;i++)
	{
		Summ(carttproducts[i]);
	}
	this.grandtotal=total;
	
}
function makedetailobj(carttproduct,orderid)
{
	giveodid();

	this.odid=odid;
	this.orderid=orderid;
	this.productid=carttproduct.ID;
	this.productname=carttproduct.Name;
	this.productquantity=carttproduct.Quan;
	this.productprice=carttproduct.Price;
	odid++;
}



function Summ(objproduct)
{
		var p=parseInt(objproduct.Price);
		var q=parseInt(objproduct.Quan);
	  total=total+(p*q);
	
}
function getcartProductIndex(id) 
{
    for (var i = 0; i < carttproducts.length; i++) 
	{
		
        if (carttproducts[i].ID == id) 
		{
			return i
		}
    }
} 
function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
	
        if (products[i].Id == id) 
		{
			return i
		}
    }
} 
function removeFromcartProductsArray(selectedProductIndex)
{
	carttproducts.splice(selectedProductIndex,1);
	storecartProducts(carttproducts);
}
function getstoredetail()
{
	if (!localStorage.detailtable)
	{
	// default to empty array
	localStorage.detailtable = JSON.stringify([]);
	}
return JSON.parse(localStorage.detailtable);
}

function storedetail(detailarray)	
{
localStorage.detailtable = JSON.stringify(detailarray);
}

function getstoreheader()
{
	if (!localStorage.headertable)
	{
	// default to empty array
	localStorage.headertable = JSON.stringify([]);
	}
return JSON.parse(localStorage.headertable);
}

function storeheader(headerarray)	
{
localStorage.headertable = JSON.stringify(headerarray);
}