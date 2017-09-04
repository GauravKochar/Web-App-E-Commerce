var table=document.getElementById('headertable');
var detailtable=document.getElementById('detailtable');
var headerarray=getstoreheader();
var detailarray=getstoredetail();
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

	function tableheading()
	{
		var frow=document.createElement('tr');

		var pname=document.createElement('th');
		pname.textContent="OrderId";
		frow.appendChild(pname);

		var pprice=document.createElement('th');
		pprice.textContent="UserId";
		frow.appendChild(pprice);
		
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Status";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Active";
		frow.appendChild(psubtotal);
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Total";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Order Date";
		frow.appendChild(psubtotal);
		
		var completed=document.createElement('th');
		completed.textContent="Completed";
		frow.appendChild(completed);
		
		var update=document.createElement('th');
		update.textContent="Update";
		frow.appendChild(update);
		
		var detail=document.createElement('th');
		detail.textContent="Detail";
		frow.appendChild(detail);
		
		
		
		table.appendChild(frow);
	}		
	
	
	function detailtableheading()
	{
		var frow=document.createElement('tr');

		var pname=document.createElement('th');
		pname.textContent="OdId";
		frow.appendChild(pname);

		var pprice=document.createElement('th');
		pprice.textContent="OrderId";
		frow.appendChild(pprice);
		
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Product Id";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Product Name";
		frow.appendChild(psubtotal);
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Product Quantity ";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Product Price";
		frow.appendChild(psubtotal);
		detailtable.appendChild(frow);
		
	}
	tableheading();
for(var i=0;i<headerarray.length;i++)
	{
		 displaydataintable(headerarray[i]);
		
	}

function displaydataintable(objectarray)
{
	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objectarray.orderid;
	tr.appendChild(id);
	
	var userid=document.createElement('td');
	userid.textContent=objectarray.userid;
	tr.appendChild(userid);

	
	
	var Status=document.createElement('td');
 var inputtxt=document.createElement("input");
	inputtxt.setAttribute("type","text");
	inputtxt.value=objectarray.Status;
	Status.appendChild(inputtxt);
	tr.appendChild(Status);
	
	var active=document.createElement('td');
	active.textContent=objectarray.active;
	tr.appendChild(active);


	var total=document.createElement('td');
	total.textContent=objectarray.grandtotal;
	tr.appendChild(total);
	
	var date=document.createElement('td');
	date.textContent=objectarray.date;
	tr.appendChild(date);
	
	
	var tdBtn=document.createElement('td');
	 var completebtn=document.createElement("button");
	  completebtn.setAttribute("class","completebtn");
	completebtn.textContent="Completed"
	tdBtn.appendChild(completebtn);
	tr.appendChild(tdBtn);
	complete(tr);
	
	


	var tdBtn2=document.createElement('td');
	 var updatebtn=document.createElement("button");
	 updatebtn.setAttribute("class","updatebtn");
	updatebtn.textContent="Update"
	tdBtn2.appendChild(updatebtn);
	tr.appendChild(tdBtn2);
	update(tr);
	
	
	var tdBtn3=document.createElement('td');
	 var detbtn=document.createElement("button");
	  detbtn.setAttribute("class","detailbtn")
	detbtn.textContent="Details"
	tdBtn3.appendChild(detbtn);
	
	
	tr.appendChild(tdBtn3);
	details(tr);

	table.appendChild(tr);
	}
 function details(tr)
 {
	 var Detailbtn= tr.querySelector('.detailbtn');
	Detailbtn.addEventListener("click",function(event)
	{
		 var targetparent=event.target.parentNode.parentNode;	
		 detailtable.textContent="";
		detailtable.setAttribute("style","display:block");
		detailtableheading();
		for(var i=0;i<detailarray.length;i++)
		{
			if(detailarray[i].orderid==targetparent.childNodes[0].textContent)
				displaydetailtable(detailarray[i]);
		}
		
		
		
	});
 }
  function complete(tr)
 {
	 var Completebtn= tr.querySelector('.completebtn');
	Completebtn.addEventListener("click",function(event)
	{
		 var targetparent=event.target.parentNode.parentNode;	
		 
		 var selectedIndex=getheaderIndex( targetparent.childNodes[0].textContent);
		 headerarray[selectedIndex].active="0";
		storeheader(headerarray);
		maketableagain();
		
		
	});
 }
 function maketableagain()
 {
	 table.textContent="";
		tableheading();
		
		for(var i=0;i<headerarray.length;i++)
		{
		 displaydataintable(headerarray[i]);
		
		}
	
 }
 function update(tr)
 {
	Updatebtn= tr.querySelector('.updatebtn');
	Updatebtn.addEventListener("click",function(event)
	{
		 var targetparent=event.target.parentNode.parentNode;	
		 
		var selectedIndex=getheaderIndex(targetparent.childNodes[0].textContent);
		
		 headerarray[selectedIndex].Status=targetparent.childNodes[2].childNodes[0].value;
		storeheader(headerarray);
		maketableagain();
		
		
	});
 }
 function getheaderIndex(id) 
 {
  for (var i = 0; i < headerarray.length; i++) 
	{
		
        if (headerarray[i].orderid == id) 
		{
			return i
		}
    }
} 

	function displaydetailtable(objectarray)
{
	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objectarray.odid;
	tr.appendChild(id);
	
	var orderid=document.createElement('td');
	orderid.textContent=objectarray.orderid;
	tr.appendChild(orderid);

	
	
	
	var productid=document.createElement('td');
	productid.textContent=objectarray.productid;
	tr.appendChild(productid);


	var productname=document.createElement('td');
	productname.textContent=objectarray.productname;
	tr.appendChild(productname);
	
	var productquantity=document.createElement('td');
	productquantity.textContent=objectarray.productquantity;
	tr.appendChild(productquantity);
	
	var productprice=document.createElement('td');
	productprice.textContent=objectarray.productprice;
	tr.appendChild(productprice);
	detailtable.appendChild(tr);
}