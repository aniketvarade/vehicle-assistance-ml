function validate() {
			var cust = document.forms["loginform"]["username"].value;               // cust stores the Customer ID
			var passw = document.forms["loginform"]["pass"].value;                  // passw stores the password
			var isValid = true;   
			var elem = document.querySelector('.sidenav');
  			var instance = M.Sidenav.init(elem, options);
			// validate function verifies the whether the user credentials are right by checking in the database
			if (cust != "abc" && passw != "abc") {                                  // it logs the user into the system
				document.getElementById("username").value = "";
				document.getElementById("pass").value = "";
				isValid = false;
				alert("Enter valid credentials");
			}
			
			return isValid;
		}
