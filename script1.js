
var products = getStoredProducts();

console.log(products);
var productId=1;

var addbutton=document.getElementById('addproduct');
var newproduct=document.getElementById('newproduct');
var Editsavebutton=document.getElementById('editsavebutton');

var table=document.getElementById('table');
table.setAttribute("style","display:block");
	
addbutton.addEventListener("click",function(event){	
						
							event.preventDefault();
								clearbox();
							display();
							});
	
	
	
function Productfun(name,price,desc,quantity)
{
	this.Id=productId;
	this.Name=name;
	this.Price=price;
	this.Desc=desc;
	this.Quantity=quantity;
}			

	function giveid()
	{
		if(products.length>0)
		{
			 productId=products[products.length-1].Id+1;
		}
	}
function addProducttoArray()
{
	
	
 	 var name = document.getElementById("pnamebox").value;
	 var price = document.getElementById("ppricebox").value;
	 var desc = document.getElementById("pdescbox").value;
	 var quantity = document.getElementById("pquantitybox").value;
	 
	 if((name=="")||(price=="")||(desc=="")||(quantity==""))
		{
		alert("Enter all values");
		}
		else if(price>0&&quantity>0)
		{
			giveid();
			var objProduct = new Productfun(name,price,desc,quantity);
			
			products.push(objProduct);
			storeProducts(products);
			productId++;
			
			addProductTotable(objProduct);
		}
		else{
			alert("Enter positive values");
		}
}
function display()
{
	

addproduct.setAttribute("style","display:none");
newproduct.setAttribute("style","display:block");
newsavebutton.setAttribute("style","display:block");
Editsavebutton.setAttribute("style","display:none");					
}


var newsavebutton=document.getElementById('savebutton');
newsavebutton.addEventListener("click",function(event){	


						addProducttoArray();
							
							});
			displaydata();
			function displaydata()
			{
					for( var i=0;i<products.length;i++)
					{
					addProductTotable(products[i]);
					}
			}

function addProductTotable(objProduct)
{
	
	newproduct.setAttribute("style","display:none");
	addbutton.setAttribute("style","display:block");
					
var pnamebox=document.getElementById("pnamebox");
var ppricebox=document.getElementById("ppricebox")
var pdescbox=document.getElementById("pdescbox")
var pquantitybox=document.getElementById("pquantitybox")



	table.setAttribute("style","display:block");
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.setAttribute("style","display:none;");
	id.textContent=objProduct.Id;
	tr.appendChild(id);
	
	var name=document.createElement('td');
	name.textContent=objProduct.Name;
	tr.appendChild(name);

	var price=document.createElement('td');
	price.textContent=objProduct.Price;
	tr.appendChild(price);
	
	var Desc=document.createElement('td');
	Desc.textContent=objProduct.Desc;
	tr.appendChild(Desc);
	
	var Quant=document.createElement('td');
	Quant.textContent=objProduct.Quantity;
	tr.appendChild(Quant);
	
	var Delete=document.createElement('td');
	Delete.innerHTML=" <button class=\"delete\">&#215;</button>";
	tr.appendChild(Delete);
	
	var edit=document.createElement('td');
	edit.innerHTML=" <button class=\"edit\">&#9744;</button>";
	//in JQUERY
	/*var editbtn=$('<button>');
		editbtn.text("Edit");
		editbtn.click(function(event)
		{
			Eedit(event)
		});
		edit.append(editbtn);*/
	tr.appendChild(edit);
	table.appendChild(tr);
	
		
	
	

Del(tr);
Eedit(tr);


}
/*function Eedit(event)
{
	display();
	tr=$(event.target).parent().parent();
	
	clearbox();
	
	pnamebox.val(tr.children("td:nth-child(2)").text());
ppricebox.val(tr.children("td:nth-child(3)".text());
	pdescbox.val(tr.children("td:nth-child(4)".text());
	pquantitybox.val(tr.children("td:nth-child(5)".text());
	
	newsavebutton.css("display":"none");
	Editsavebutton.css("display":"block");
	


Editsavebutton.on('click',function(event)
	{		//index value will be changed ....just practice ...
	
	
				
				var selectedProductIndex = getProductIndex(tr.children("td:nth-child(1)").text()); 
					
				console.log(selectedProductIndex);
				editinproductarray(selectedProductIndex,pnamebox,ppricebox,pdescbox,pquantitybox);
				
			 
				tr.children("td:nth-child(2)").textContent=pnamebox.val();
				tr.children("td:nth-child(3)").textContent=ppricebox.val();
				tr.children("td:nth-child(4)").textContent=pdescbox.val();
				tr.children("td:nth-child(5)").textContent=pquantitybox.val();
				
		
		newproduct.setAttribute("style","display:none");
		addbutton.setAttribute("style","display:block");
	
		
		
	});
	
}*/
 function Del(tr)
{
	var delbutton=tr.querySelector('.delete');
delbutton.addEventListener('click',function(event)
{
	var check=confirm("Do you really want to delete");
						if(check==true)
						{
										var targetParent = event.target.parentNode.parentNode;
										  var selectedProductIndex = getProductIndex(parseInt(targetParent.childNodes[0].textContent)); 
										 
										   removeFromProductsArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
										   
										   if(table.childElementCount==1)
											{
												table.setAttribute("style","display:none");
											}
						}
											

});
}
function removeFromProductsArray(selectedProductIndex)
{
	products.splice(selectedProductIndex,1);
	storeProducts(products);
	console.log(products);
}
function Eedit(tr)
{
	var editbutton=tr.querySelector('.edit');
editbutton.addEventListener('click',function(event)
{
	display();
	Editintextboxes(pnamebox,ppricebox,pdescbox,pquantitybox,event);
	
});
}

function clearbox(){
		pnamebox.value="";
		ppricebox.value="";
		pdescbox.value="";
		pquantitybox.value="";
}
function Editintextboxes(pnamebox,ppricebox,pdescbox,pquantitybox,event1)
{
	tr=event1.target.parentNode.parentNode;
	
	clearbox();
	
	pnamebox.value=tr.childNodes[1].textContent;
	ppricebox.value=tr.childNodes[2].textContent;
	pdescbox.value=tr.childNodes[3].textContent;
	pquantitybox.value=tr.childNodes[4].textContent;
	
	newsavebutton.setAttribute("style","display:none");
	Editsavebutton.setAttribute("style","display:block");
	


Editsavebutton.addEventListener('click',function(event)
	{		//index value will be changed ....just practice ...
	
	
				
				var selectedProductIndex = getProductIndex(tr.childNodes[0].textContent); 
					
				console.log(selectedProductIndex);
				editinproductarray(selectedProductIndex,pnamebox,ppricebox,pdescbox,pquantitybox);
				
			 
			/*	tr.childNodes[1].textContent=pnamebox.value;
				tr.childNodes[2].textContent=ppricebox.value;
				tr.childNodes[3].textContent=pdescbox.value;
				tr.childNodes[4].textContent=pquantitybox.value;*/
				window.location.reload();
				
		
		newproduct.setAttribute("style","display:none");
		addbutton.setAttribute("style","display:block");
	
		
		
	});
}
function editinproductarray(selectedProductIndex,pnamebox,ppricebox,pdescbox,pquantitybox)
{
				products[selectedProductIndex].Name=pnamebox.value;
				products[selectedProductIndex].Price=ppricebox.value;
				products[selectedProductIndex].Desc=pdescbox.value;
				products[selectedProductIndex].Quantity=pquantitybox.value;
				storeProducts(products);				
}



function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
		
		
        if (products[i].Id == id) 
		{
			console.log("ana chie"+i);
			return i
		}
    }
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


 
	
