	function Validate(){                                                                        // validate() is used to register a new user and store the user details in database
//alert("imside vaidate");                                                                      // all fields are required
var x=document.forms["customer"]["name"].value;                                                 // x stores name
var mobile=document.forms["customer"]["number"].value;                                          // mobile stores mobile number
var pass=document.forms["customer"]["password"].value;                                          // pass stores password
var conpass=document.forms["customer"]["confirmpass"].value;                                    // conpass stores confirm password
//var a=document.forms["customer"]["Phone"].value;
var isValid = true;
//alert("asd0");
/*if (x == 'null' || x ==''){
    document.getElementById("name1").style.visibility="visible";
    document.getElementById("name1").innerHTML = "Customer Name must not be blank";
    isValid =  false;
}
else{
    document.getEementById("name1").style.visibility="hidden";

    }*/
if(mobile.length<10 || mobile.length>10){
    document.getElementById("number").style.visibility="visible";
    document.getElementById("number").innerHTML="Enter Valid Mobile Number";
    /*mobile.addEventListener("input",function(event){
    	if (mobile.validity.typeMismatch) {
    		mobile.setCustomValidity("Enter valid mobile number");
    	}
    	else {
    		mobile.setCustomValidity("");
    	}
    });*/
    isValid =  false;
}
else{
    document.getElementById("number").style.visibility="hidden";
    }

if (pass != conpass) {
		document.getElementById("confpass").style.visibility="visible";
		document.getElementById("confpass").style.color = "red";
		document.getElementById("confpass").innerHTML = "Passwords Do Not Match";	
		isValid = false;
	}
else{
		document.getElementById("confpass").style.visibility="hidden";
	}
		
/*if(z==null || z==""){
    document.getElementById('message2').style.visibility="visible";
    document.getElementById('message2').innerHTML="Password Field must not be blank";
    isValid =  false;
}else if(z.length < 6){
    document.getElementById('message2').style.visibility="visible";
    document.getElementById('message2').innerHTML="Password cant be less than 6 character";}
	isValid =  false;
else{
    document.getElementById('message2').style.visibility="hidden";
    }*/
  return isValid;
}

/*var check = function() {
	if (document.getElementByName("password").value == document.getElementByName("confirmpass").value) {
		document.getElementById("confpass").style.color = "green";
		document.getElementById("confpass").innerHTML = "Passwords Match";
	}
	else {
		document.getElementById("confpass").style.color = "red";
		document.getElementById("confpass").innerHTML = "Passwords Do Not Match";	
	}
}*/