var currentuser;
function storeUser(loguser)	
{
sessionStorage.user = JSON.stringify(loguser);
}

function getUser()
{
		if (!sessionStorage.user)
		{
		sessionStorage.user = null;
		}
		return JSON.parse(sessionStorage.user);

}
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
else{
	lblname.textContent="Hi "+currentuser.Fname+" "+currentuser.Lname+" !";
}