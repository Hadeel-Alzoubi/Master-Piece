
// async function ShowCart() {
    
//     var UserId = localStorage.getItem("UserId");
//     var isLoggedIn = UserId!= "null";
//     debugger;

//     if (UserId && isLoggedIn) {
//     const url = `https://localhost:44397/api/Cart/GetCartByUserID?id=${UserId}`;
//     var data = await fetch(url);
//     var response = await data.json();

//     var table =  document.getElementById("Maintable");
//     var Details = document.getElementById("Details");

//     var TotalPrice = 0;
  
//       response.$values.forEach(element => {
//     // response.forEach(element => {
//         table.innerHTML += `
//                              <tr>
//                             <th scope="row">
//                                 <div style="text-align: center;" >
//                                     <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.product.imageUrl}" class=" rounded-circle" style="width: 80px; height: 80px;" alt="">
//                                 </div>
//                             </th>
//                             <td>
//                                 <p class="mb-0 mt-4">${element.product.productName}</p>
//                             </td>
//                             <td>
//                                 <p class="mb-0 mt-4">${element.product.price} دينار</p>
//                             </td>
//                             <td>
//                                 <div class="input-group quantity mt-4">
                                   
//                                     <input type="number" id="productQuantity-${element.cartItemId}"
//                                     class="form-control form-control-sm text-center border-0" 
//                                     style="width:10px"  value="${element.quantity}" min="1" max="100" onchange="changeQuantity(${element.cartItemId}, ${element.product.price})">
                                  
//                                 </div>
//                             </td>
//                             <td>
//                                 <p class="mb-0 mt-4"> مجموع السعر الكلي : ${element.product.price * element.quantity}</p>
//                             </td>
//                             <td>
//                                 <button class="btn btn-md  bg-light border mt-4"  onclick="clearCart(${element.cartItemId})" >
//                                     <i class="fa fa-times text-danger"></i>
//                                 </button>
//                             </td>
//                         </tr> `


//     TotalPrice += element.product.price * element.quantity;

//     Details.innerHTML =
//     `
//         <div class="bg-light rounded">
//                         <div class="p-4">
//                             <h1 class="display-6 mb-4">تفاصيل <span class="fw-normal">الدفع</span></h1>
//                             <div class="d-flex justify-content-between mb-4">
//                                 <h5 class="mb-0 ">المجموع الجزئي :</h5>
//                                 <p class="mb-0">${TotalPrice}</p>
//                             </div>
//                             <div class="d-flex justify-content-between">
//                                 <h5 class="mb-0 "> قيمة التوصيل :</h5>
//                                 <div class="">
//                                     <p class="mb-0">
//                                   مجاني
//                                     </p>
//                                 </div>
//                             </div>
//                             <br>
//                             <p class="mb-0 text-end">التوصيل لكافة مناطق اربد</p>
//                         </div>
//                         <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between" style="padding: 15px;"> 
//                             <h5 class="mb-0 ps-4 me-4">المجموع الكلي :</h5>
//                             <p class="mb-0" >${TotalPrice}</p>
//                         </div>
//                         <a class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" style="border: 1px solid" onclick="SetOrder(${response.$valuescartId})">اكمال عملية الشراء</a>
//                     </div>
//     `
//     });
// // FrontEnd\CaterServ-1.0.0\CheckOut.html
// }
// else {
//     // User is not logged in, show cart from localStorage
//     var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     var table = document.getElementById("Maintable");
//     table.innerHTML = ""; // Clear the table

//     cartItems.$values.forEach(item => {
//       table.innerHTML += `
//         <tr>
//           <th scope="row">
//             <div style="text-align: center;">
//               <img src="/Supporting_projects/Supporting_projects/Uploads/${item.imageUrl}" class="rounded-circle" style="width: 80px; height: 80px;" alt="">
//             </div>
//           </th>
//           <td>
//             <p class="mb-0 mt-4">${item.productName}</p>
//           </td>
//           <td>
//             <p class="mb-0 mt-4">${item.price} دينار</p>
//           </td>
//           <td>
//             <div class="input-group quantity mt-4">
//               <div class="input-group-btn">
//               </div>

//                 <input type="number" id="productQuantity"
//                 class="form-control form-control-sm text-center border-0" 
//                 style="width:10px"  value="${element.quantity}" min="1" max="100" onchange="changeQuantity(${element.cartItemId}, ${element.product.price})">
                                          
//             </div>
//           </td>
//           <td>
//             <p class="mb-0 mt-4" id="newTotal">مجموع السعر الكلي: ${item.price * item.quantity}</p>
//           </td>
//           <td>
//             <button class="btn btn-md bg-light border mt-4" onclick="removeItemFromLocalCart(${item.product_id})">
//               <i class="fa fa-times text-danger"></i>
//             </button>
//           </td>
//         </tr>`;
//     });
//   }
// }
async function ShowCart() {
  var UserId = localStorage.getItem("UserId");

  var table = document.getElementById("Maintable");
  var Details = document.getElementById("Details");
  var TotalPrice = 0;

  if (UserId != 'null') {
      // If the user is logged in, fetch the cart from the server
      const url = `https://localhost:44397/api/Cart/GetCartByUserID?id=${UserId}`;
      try {
          var data = await fetch(url);
          var response = await data.json();

          table.innerHTML = ""; // Clear the table before adding new content
          response.$values.forEach(element => {
              table.innerHTML += `
                  <tr>
                      <th scope="row">
                          <div style="text-align: center;">
                              <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.product.imageUrl}" class="rounded-circle" style="width: 80px; height: 80px;" alt="">
                          </div>
                      </th>
                      <td>
                          <p class="mb-0 mt-4">${element.product.productName}</p>
                      </td>
                      <td>
                          <p class="mb-0 mt-4">${element.product.price} دينار</p>
                      </td>
                      <td>
                          <div class="input-group quantity mt-4">
                              <input type="number" id="productQuantity-${element.cartItemId}"
                              class="form-control form-control-sm text-center border-0" 
                              style="width:10px" value="${element.quantity}" min="1" max="100" onchange="changeQuantity(${element.cartItemId}, ${element.product.price})">
                          </div>
                      </td>
                      <td>
                          <p class="mb-0 mt-4"> مجموع السعر الكلي : ${element.product.price * element.quantity}</p>
                      </td>
                      <td>
                          <button class="btn btn-md bg-light border mt-4" onclick="clearCart(${element.cartItemId})">
                              <i class="fa fa-times text-danger"></i>
                          </button>
                      </td>
                  </tr>`;

              TotalPrice += element.product.price * element.quantity;
          });

          // Update payment details
          Details.innerHTML = `
              <div class="bg-light rounded">
                  <div class="p-4">
                      <h1 class="display-6 mb-4">تفاصيل <span class="fw-normal">الدفع</span></h1>
                      <div class="d-flex justify-content-between mb-4">
                          <h5 class="mb-0">المجموع الجزئي :</h5>
                          <p class="mb-0">${TotalPrice} دينار</p>
                      </div>
                      <div class="d-flex justify-content-between">
                          <h5 class="mb-0">قيمة التوصيل :</h5>
                          <div>
                              <p class="mb-0">مجاني</p>
                          </div>
                      </div>
                      <br>
                      <p class="mb-0 text-end">التوصيل لكافة مناطق اربد</p>
                  </div>
                  <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between" style="padding: 15px;">
                      <h5 class="mb-0">المجموع الكلي :</h5>
                      <p class="mb-0">${TotalPrice} دينار</p>
                  </div>
                  <a class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4" onclick="SetOrder(${response.$values.cartId})">اكمال عملية الشراء</a>
              </div>`;
      } catch (error) {
          console.error("Failed to fetch cart from server:", error);
      }
  } else {
      // If the user is not logged in, show cart from localStorage
      var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      table.innerHTML = ""; // Clear the table before adding new content

      cartItems.forEach(item => {
          table.innerHTML += `
              <tr>
                  <th scope="row">
                      <div style="text-align: center;">
                          <img src="/Supporting_projects/Supporting_projects/Uploads/${item.imageUrl}" class="rounded-circle" style="width: 80px; height: 80px;" alt="">
                      </div>
                  </th>
                  <td>
                      <p class="mb-0 mt-4">${item.productName}</p>
                  </td>
                  <td>
                      <p class="mb-0 mt-4">${item.price} دينار</p>
                  </td>
                  <td>
                      <div class="input-group quantity mt-4">
                          <input type="number" id="productQuantity-${item.productId}"
                          class="form-control form-control-sm text-center border-0" 
                          style="width:10px" value="${item.quantity}" min="1" max="${item.stockQuantity}" onchange="changeQuantity(${item.productId}, ${item.price})">
                      </div>
                  </td>
                  <td>
                      <p class="mb-0 mt-4"> مجموع السعر الكلي : ${item.price * item.quantity}</p>
                  </td>
                  <td>
                      <button class="btn btn-md bg-light border mt-4" onclick="removeItemFromLocalCart(${item.productId})">
                          <i class="fa fa-times text-danger"></i>
                      </button>
                  </td>
              </tr>`;

          TotalPrice += item.price * item.quantity;
      });

      
      // Update payment details
      Details.innerHTML = `
          <div class="bg-light rounded">
              <div class="p-4">
                  <h1 class="display-6 mb-4">تفاصيل <span class="fw-normal">الدفع</span></h1>
                  <div class="d-flex justify-content-between mb-4">
                      <h5 class="mb-0">المجموع الجزئي :</h5>
                      <p class="mb-0">${TotalPrice} دينار</p>
                  </div>
                  <div class="d-flex justify-content-between">
                      <h5 class="mb-0">قيمة التوصيل :</h5>
                      <div>
                          <p class="mb-0">مجاني</p>
                      </div>
                  </div>
                  <br>
                  <p class="mb-0 text-end">التوصيل لكافة مناطق اربد</p>
              </div>
              <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between" style="padding: 15px;">
                  <h5 class="mb-0">المجموع الكلي :</h5>
                  <p class="mb-0">${TotalPrice} دينار</p>

              </div>
                <a class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4" onclick="SetOrder(1)">اكمال عملية الشراء</a>

          </div>`;
  }
}



async function SetOrder(id) {
    var UserId = localStorage.getItem("UserId");
  localStorage.setItem('cartId', id);

  if (UserId != "null") {
    window.location.href = "CheckOut.html";
  }
 else{
  alert("الرجاء تسجيل الدخول اولا ");
  window.location.href = "Login.html";
 }
}
function clearCart(id) {
    debugger;
    const deleteUrl = `https://localhost:44397/api/Cart/DeleteItem/${id}`;

    Swal.fire({
        title: "هل انت متاكد من حذف المنتج ؟",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        showCancelButton: true,
        showCloseButton: true
    })
   
    .then((result) => {
        debugger;
        if (result.isConfirmed) {
            fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'تم الحذف',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.reload(); // Reload the page after success
                    });
                } 
              
            })
         
        } 
        else {
            // User canceled the deletion
            Swal.fire({
                title: 'تم الإلغاء',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
async function changeQuantity(cartItemId, productPrice) {
debugger;
  const quantityInput = document.getElementById(`productQuantity-${cartItemId}`);
  const Quantity = quantityInput.value;


  const url = `https://localhost:44397/api/Cart/changeQuantity`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemId: cartItemId,
      quantity: Quantity,
    }),
  });

window.location.reload();
}


function removeItemFromLocalCart(productId) {
    // Retrieve the current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Default to an empty array if not found

    console.log('Current Cart Items:', cartItems); // Debug: Log current items in the cart

    // Check if productId exists in the cart
    const itemExists = cartItems.some(item => item.product_id === productId);
    if (!itemExists) {
        console.log(`Item with product ID ${productId} does not exist in the cart.`);
        return; // Item doesn't exist, so return early
    }

    // Filter out the item with the specified productId
    cartItems = cartItems.filter(item => item.product_id !== productId);

    console.log('Updated Cart Items:', cartItems); // Debug: Log updated items in the cart

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh the cart display after removal
    displayCartItems(); // Ensure you call this function to refresh the UI
}

// Function to refresh the cart display
function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const table = document.getElementById('cartTable'); // Ensure this is the correct ID of your table
    table.innerHTML = ''; // Clear the current content

    cartItems.forEach(item => {
        table.innerHTML += `
            <tr>
                <th scope="row">
                    <img src="/Supporting_projects/Supporting_projects/Uploads/${item.imageUrl}" class="rounded-circle" style="width: 80px; height: 80px;" alt="">
                </th>
                <td>${item.productName}</td>
                <td>${item.price} دينار</td>
                <td>
                    <input type="number" id="productQuantity-${item.product_id}" value="${item.quantity}" min="1" max="${item.stockQuantity}"  onchange="changeQuantity(${item.product_id}, ${item.price})">
                </td>
                <td>مجموع السعر الكلي: ${item.price * item.quantity}</td>
                <td>
                    <button onclick="removeItemFromLocalCart(${item.product_id})">
                        <i class="fa fa-times text-danger"></i>
                    </button>
                </td>
            </tr>`;
    });
}


ShowCart();
