		var username=1;
		var showadmins=document.getElementById('showadmins');
		var midright=document.getElementById('midright');
		
		var fname=document.getElementById('fname');
		var confirmpass=document.getElementById('confirmpass');
		var Password=document.getElementById('password');
		
		var emailid=document.getElementById('eid');
		var table=document.getElementById('admintable');
		
		var dateofbirth=document.getElementById('dob');
		
		var orders=document.getElementById('orders');
		
		
		var gender;
		var Admins=getStoredAdmins();
		var currentuser;


orders.addEventListener("click",function(event)
{
	window.location.href="file:///C:/Users/Gaurav/Desktop/My javascriptproject/placeorder.html";
	
});

function storeUser(loguser)	
{
sessionStorage.user = JSON.stringify(loguser);
}
function giveid()
{
	if(Admins.length>0)
		username=Admins[Admins.length-1].userid+1;
	
}

function getUser()
{
		if (!sessionStorage.user)
		{
		sessionStorage.user = null;
		}
		return JSON.parse(sessionStorage.user);

}

displaydata();
showadmindiv();
funonsigninbutton();

function  displaydata()
{
	var lblname=document.getElementById('lblnameid');
	var logoutid=document.getElementById('logoutid');

	logoutid.addEventListener("click",function(event)
	{ 
		 currentuser= null;
		storeUser(currentuser);
	});

	currentuser=getUser();
	if(currentuser==null)
	{
	window.location.href="file:///C:/Users/Gaurav/Desktop/My javascriptproject/userinterface.html";
	}
	else
	{
		lblname.textContent="Hi "+currentuser.fname+" !";
	}
}

function showadmindiv()
{
showadmins.addEventListener("click",function(event)
{
	midright.setAttribute("style","display:block;")
});
}
function funonsigninbutton()
{	

var signinbtn=document.getElementById('signinbtn');
signinbtn.setAttribute("style","display:block");
signinbtn.addEventListener("click",function(event)
{
		
		if(fname.value==""||username.value==""||Password.value==""||confirmpass.value==""||emailid.value==""||dateofbirth.value=="mm/dd/yyyy")
		{
			alert("Textfield is Empty");
		}
		else if(Password.value!=confirmpass.value)
		{
			alert("Password is not matching")
		}
		else{
			
			var adminobj=addAdminToArray();
			addAdminToTable(adminobj);
		
		}
		
			
			
			 
	
});
}


function Gender(){
	var x=document.getElementsByName("sex");
	
	for(var i=0;i<2;i++)
		{
			if(x[i].checked)
			{
				 gender=x[i].value;
			}
		}
		return gender;
}
function addAdminToArray()
{
	
		gender=Gender();
	
	
	giveid();
	var adminobject= new makeobject(fname.value,username,dateofbirth.value,Password.value,emailid.value,gender,currentuser.Uid,"1");
	
	Admins.push(adminobject);
	storeAdmin(Admins)	;
		username++;
	return adminobject;
	
}
function makeobject(fname,username,dob,Password,emailid,gender,addedby,active)
{
	this.fname=fname;
	this.userid=username;
	this.dob=dob;
	this.Password=Password;
	this.emailid=emailid;
	this.gender=gender;
	this.addedby=addedby;
	this.active=active;
	
}
displaytable();
function displaytable()
{
	for(var i=0;i<Admins.length;i++)
	{
			if(Admins[i].active=="1")
			addAdminToTable(Admins[i]);
	}
}
 function addAdminToTable(adminobject)
{
	
	var tr=document.createElement('tr');
		
	var name=document.createElement('td');
	name.textContent=adminobject.fname;
	tr.appendChild(name);

	var adminname=document.createElement('td');
	adminname.textContent=adminobject.userid;
	tr.appendChild(adminname);
	
	
	var dob=document.createElement('td');
	dob.textContent=adminobject.dob;
	tr.appendChild(dob);
	
	
	var gender=document.createElement('td');
	gender.textContent=adminobject.gender;
	tr.appendChild(gender);
	
	var emailid=document.createElement('td');
	emailid.textContent=adminobject.emailid;
	tr.appendChild(emailid);
	
	var Delete=document.createElement('td');
	Delete.innerHTML="<button class=\"delete\">&#215;</button>";
	tr.appendChild(Delete);
	
	var Edit=document.createElement('td');
	Edit.innerHTML=" <button class=\"edit\">&#9744;</button>";
	tr.appendChild(Edit);
	
	var addedby=document.createElement('td');
	addedby.setAttribute("style","display:none;")
	addedby.textContent=adminobject.addedby;
	tr.appendChild(addedby);
	
	var active=document.createElement('td');
	active.setAttribute("style","display:none;")
	active.textContent=adminobject.active;
	
	tr.appendChild(active);

	table.appendChild(tr);
	hidetextinadminform();
	Del(tr);
	
	Editadmin(tr);
	
}
function Editadmin(tr)
{
	var editbutton=tr.querySelector('.edit');
editbutton.addEventListener('click',function(event1)
{	
		
		var targetParent = event1.target.parentNode.parentNode;		
		var selectedadminIndex = getAdminIndex(targetParent.childNodes[1].textContent); 
			addValueFromArrayToForm(selectedadminIndex);
			var savebtn=document.createElement("button");
			savebtn.setAttribute("id","saveid");
			savebtn.textContent="Save";		
			
			var signinbtn=document.getElementById('signinbtn');
			signinbtn.setAttribute("style","display:none");
			
			var adminform=document.getElementById('adminsignupform');
			adminform.appendChild(savebtn);			
			savebtn.addEventListener("click",function(event)
			{
				 targetParent = event1.target.parentNode.parentNode;		
				var selectedadminIndex = getAdminIndex(targetParent.childNodes[1].textContent); 
				
				editInAdminArray(selectedadminIndex);
				
				Admins=getStoredAdmins();
				targetParent.childNodes[0].textContent=Admins[selectedadminIndex].fname;
				targetParent.childNodes[1].textContent=Admins[selectedadminIndex].userid;
				targetParent.childNodes[2].textContent=Admins[selectedadminIndex].dob;
				targetParent.childNodes[3].textContent=Admins[selectedadminIndex].gender;
				targetParent.childNodes[4].textContent=Admins[selectedadminIndex].emailid;
				
				var adminform=document.getElementById('adminsignupform');
				adminform.removeChild(event.target);
				signinbtn.setAttribute("style","display:block");
			});
			
			
});
}

function editInAdminArray(selectedadminIndex)
{
					Admins[selectedadminIndex].fname=fname.value;
					Admins[selectedadminIndex].Password=Password.value;
				
				
					Admins[selectedadminIndex].dob=dateofbirth.value;
					
					Admins[selectedadminIndex].emailid=	emailid.value;
					gender=Gender();
					Admins[selectedadminIndex].gender=gender;
					storeAdmin(Admins);
					hidetextinadminform();
}



function addValueFromArrayToForm(selectedadminIndex)
{ 				var y;
			var x=document.getElementsByName("sex");
				fname.value=Admins[selectedadminIndex].fname;		
					Password.value=Admins[selectedadminIndex].Password;
					confirmpass.value=Admins[selectedadminIndex].Password;
					dateofbirth.value=Admins[selectedadminIndex].dob;
					
					emailid.value=Admins[selectedadminIndex].emailid;
					
					if(Admins[selectedadminIndex].gender=="Male")
						 y=0;
					else 
						y=1;
					
					x[y].checked=true;
					
}

function Del(tr)
{
	
	var delbutton=tr.querySelector('.delete');
delbutton.addEventListener('click',function(event)
{
										var targetParent = event.target.parentNode.parentNode;
				
										  var selectedadminIndex = getAdminIndex(targetParent.childNodes[1].textContent); 
										
											Admins[selectedadminIndex].active="0";
											console.log(Admins[selectedadminIndex]);
										   targetParent.parentNode.removeChild(targetParent);
										   storeAdmin(Admins);
										  

});
}
	function getAdminIndex(id) 
{
    for (var i = 0; i < Admins.length; i++) 
	{
        if (Admins[i].userid == id) 
		{
		
			return i
		}
    }
} 


function hidetextinadminform()
{
	fname.value="";
username.value="";
confirmpass.value="";
Password.value="";
dateofbirth.value="mm/dd/yyyy";

emailid.value="";
}


function storeAdmin(Admins)	
{
localStorage.Admins = JSON.stringify(Admins);
}

function getStoredAdmins()
{
if (!localStorage.Admins)
{
// default to empty array
localStorage.Admins = JSON.stringify([]);
}
return JSON.parse(localStorage.Admins);
}



