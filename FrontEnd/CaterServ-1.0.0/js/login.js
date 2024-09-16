
async function LoginUser() {
    debugger;
  
    event.preventDefault();
  
    var form = document.getElementById("LoginForm");
  
    var formData = new FormData(form);
  
    response = await fetch(urlLogin, {
      method: "POST",
      body: formData,
    });
    console.log(response);
  
    var data = await response.json();
  
    localStorage.setItem("Token", data.token);
    localStorage.setItem("UserId", data.userId);
  
    alert("Login ssuccssfully");
  
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var UserId = localStorage.getItem("UserId");
    debugger;
    if (cartItems && cartItems.length > 0) {
      for (let item of cartItems) {
        // Construct the POST request for each cart item
        var url22 = `https://localhost:44362/api/Cart/AddCartItem/${UserId}`;
  
        var data = {
          ProductId: item.product_id,
          Quantity: item.quantity,
        };
  
        let response = await fetch(url22, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    }
  
    localStorage.removeItem("cartItems");
    window.location.href = "/htmldemo.net/dorno/dorno/index.html";
  }
  