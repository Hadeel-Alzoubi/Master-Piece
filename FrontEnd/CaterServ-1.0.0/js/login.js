async function LoginUser() {
  debugger;
  var e = document.getElementById("Email").value;
  event.preventDefault(); // Prevent the form from submitting normally

  var form = document.getElementById("LoginForm");
  var formData = new FormData(form); // Collect form data using FormData

  const urlLogin = 'https://localhost:44397/api/Users/UserByEmailUser';

  try {
    // Fetch the login API
    const response = await fetch(urlLogin, {
      method: "POST",
      body: formData,
    });

    // Check if the response is OK (status 200-299)
    if (response.ok) {
      var data = await response.json();

      // السوبر ادمن و الادمن بنفس الكوندشن لازم اهندلهم
      // Check that the response contains the required propertie
      if (data.userId && data.isAdmin) {
        

          if ( e == "hadeelsuperAdmin@Anamel.com") {

            var UserId = localStorage.getItem("UserId");

            // Store userId and isAdmin in localStorage
            localStorage.setItem("UserId", data.userId);
            localStorage.setItem("UserisAdmin", data.isAdmin); // Store isAdmin

            // Alert for successful login
            alert("Login successfully");

            localStorage.setItem('isLoggedIn', 'Super');
            document.getElementById("profileSuperAdminLink").style.display = "inline-block";
            document.getElementById("logoutLink").style.display = "inline-block";
            document.getElementById("Login").style.display = "none";
            window.location.href = "index.html";

          }

          else {

            localStorage.setItem("UserId", data.userId);
            localStorage.setItem("UserisAdmin", data.isAdmin); // Store isAdmin
            localStorage.setItem("categoryId", data.adminCategory);

            // Alert for successful login
            alert("Login successfully");


            localStorage.setItem('isLoggedIn', 'Admin');
            document.getElementById("profileAdminLink").style.display = "inline-block";
            window.location.href = "index.html";

          
            var UserId = localStorage.getItem("UserId");

          }

      }
      else if (data.userId && !data.isAdmin) {
        debugger;
        // Store userId and isAdmin in localStorage
        localStorage.setItem("UserId", data.userId);
        localStorage.setItem("UserisAdmin", data.isAdmin); // Store isAdmin

        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        var UserId = localStorage.getItem("UserId");

        if (cartItems && cartItems.length > 0) {
          debugger;
          for (let item of cartItems) {
            // Construct the POST request for each cart item
            var urlAddCartItem = `https://localhost:44397/api/Cart?id=${UserId}`;

            var cartData = {
              ProductId: item.product_id,
              Quantity: item.quantity,
            };

            let cartResponse = await fetch(urlAddCartItem, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cartData),
              
            });

            if (!cartResponse.ok) {
              console.error("Error adding cart item", item);
            }
          }
        }
      
        // Clear local storage cart items
        localStorage.removeItem("cartItems");

        localStorage.setItem('isLoggedIn', 'User');

        alert("Login successfully");


        document.getElementById("profileUserLink").style.display = "inline";
        window.location.href = "index.html";
      
      }
      else {
        throw new Error("Invalid response format");
      }
    } else {
      // Handle login failure
      const errorMessage = await response.text();
      alert(`Login failed: ${errorMessage}`);
      console.error("Login failed", errorMessage);
    }
  } 
  catch (error) {
    console.error("An error occurred during login:", error);
    alert("An error occurred during login. Please try again.");
  }
}


function logoutUser() {
  debugger;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('cartId');
  // Optionally, redirect to the login page
  window.location.href = 'index.html';
}
