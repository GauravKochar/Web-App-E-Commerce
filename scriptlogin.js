
var loginbtn=document.getElementById('loginbtn');
var usertext=document.getElementById('usertext');
var userpass=document.getElementById('userpass');
var loginas=document.getElementById('loginas');
var fname=document.getElementById('fname');
		
		var username=document.getElementById('username');
		var confirmpass=document.getElementById('confirmpass');
		var Password=document.getElementById('password');
		var emailid=document.getElementById('eid');
		var dob=document.getElementById('dateofbirth');
		
		var Users=getStoreduser();
		 var gender;
		
		
		checklogin();

function checklogin()
{
		var Admins=getStoredAdmins();
loginbtn.addEventListener("click",function(event)
{
	if(loginas.value=="Admin")
	{
		if(usertext.value=="gaurav123"&&userpass.value=="kochar123")
		{
			var dob=new dateofbirth("04","july","1996");
			
			var loginuser=new makeobject("Gaurav Kochar","gaurav123",dob,"kochar123","hbdjbdhjfsdfb","male","gaurav123","1");
			storeUser(loginuser);
		
			window.location.href="file:///C:/Users/Gaurav/Desktop/My javascriptproject/dashboard.html";
		}
		else	
		{
			
			for(var i=0;i<Admins.length;i++)
			{
				if(usertext.value==Admins[i].userid&&userpass.value==Admins[i].Password)
				{
						storeUser(Admins[i]);
						window.location.href="file:///C:/Users/Gaurav/Desktop/My javascriptproject/dashboard.html";
						
				}
				
			}
			
		}
	}
	else if(loginas.value=="User")
	{
		for(var i=0;i<Users.length;i++)
			{
				if(usertext.value==Users[i].userid&&userpass.value==Users[i].Password)
				{
						storeUser(Users[i]);
						window.location.href="file:///C:/Users/Gaurav/Desktop/My javascriptproject/userdashboard.html";
						
				}
				
			}
		
	}
	else{
		alert("Something went wrong");
	}
});
}


function getStoredAdmins()
{
	if (!localStorage.Admins)
	{
	localStorage.Admins = JSON.stringify([]);
	}
	return JSON.parse(localStorage.Admins);
}

function getStoreduser()
{
			if (!localStorage.Users)
		{
		
		localStorage.Users = JSON.stringify([]);
		}
	return JSON.parse(localStorage.Users);
}

function storesimpleuser(loguser)	
{
localStorage.Users = JSON.stringify(loguser);
}
function dateofbirth(day,mon,year)
{
	this.day=day;
	this.month=mon;
	this.year=year;
}

function storeUser(loguser)	
{
sessionStorage.user = JSON.stringify(loguser);
}

usersigninbtn();
function usersigninbtn()
{	
var signinbtn=document.getElementById('signinbtn');
signinbtn.addEventListener("click",function(event)
{
		
		if(fname.value==""||username.value==""||Password.value==""||confirmpass.value==""||emailid.value==""||dob.value==="mm/dd/yyyy")
		{
			alert("Textfield is Empty");
		}
	 else if(Password.value !=confirmpass.value)
		{
			alert("Your Password is not matching");
		}
		else
		{
			addUserToArray();
			alert(" Congratulations! Your Account has been made..,Now You can LogIn as User..");
			hideTextInUserform();
			
		}
			
});
}

function addUserToArray()
{
		 gender=Gend();
	//	 Userid=giveid();
	
	var userobject= new makeobject(fname.value,username.value,dob.value,Password.value,emailid.value,gender);

	Users.push(userobject);
	storesimpleuser(Users);
	
}

/*function giveid()
{
	if(Users.length>0)
	{
		Userid=Users[Users.length-1].Userid+1
	}

}*/

function Gend()
{
	  var x=document.getElementsByName("sex");
		console.log(x);
	 
	for(var i=0;i<2;i++)
		{
			if(x[i].checked)
			{
				 gender=x[i].value;
				 return gender;
			}
		}
}
		
function makeobject(fname,username,dob,Password,emailid,gender)
{
	this.fname=fname;
	this.userid=username;
	this.dob=dob;
	this.Password=Password;
	this.emailid=emailid;
	this.gender=gender;

}
function hideTextInUserform()
{
fname.value="";
username.value="";
confirmpass.value="";
Password.value="";
dob.value="";
emailid.value="";
}
