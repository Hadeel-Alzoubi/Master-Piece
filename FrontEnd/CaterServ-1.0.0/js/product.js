// async function GetProduct() {
//   debugger;
//   let n = Number(localStorage.getItem("categoryId"));
//   var ProductUrl = `https://localhost:44397/api/Products/GetProductByCategoryId?id=${n}`;

//   let response = await fetch(ProductUrl);
//   let data = await response.json();

//   let x = document.getElementById("cardProduct");

//   data.forEach(element => {
//       x.innerHTML += 
//       `  <div class="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
//               <div class="team-item rounded">
//                   <a href="#" onclick="store(${element.productId}); return false;">
//                   <img class="img-fluid rounded-top " src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="" name="ImageUrl" width="500px" height="500px"></a>
//                   <div class="team-content text-center py-3 bg-dark rounded-bottom">
//                       <h4 class="text-primary" name="ProductName">${element.productName}</h4>
//                       <p class="text-light" name="Price">${element.price}</p>
//                    <a class="" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">تفاصيل المنتج</a>
//                   </div>
//                   <div class="team-icon d-flex flex-column justify-content-center m-4">
//                       <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="addToCart('${element.productId}'); return false;"><i class="fa fa-shopping-cart"></i></a>
//                       <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;"><i class="fa fa-info"></i></a>
//                   </div>
//               </div>
//           </div>
//           `;
//   });
// }
// GetProduct();

async function sortByPrice() {
  let n = Number(localStorage.getItem("categoryId"));

  debugger
  let sorting = document.getElementById('sortProduct').value;

  console.log(sorting);
  if (sorting == "A") {
    const sortByPriceAscURL = `https://localhost:44397/api/Products/SortProductByPriceAsc?id=${n}`;
    let response = await fetch(sortByPriceAscURL);
    let data = await response.json();
    let x = document.getElementById("cardProduct");
    x.innerHTML = "";
    data.forEach(element => {
      x.innerHTML += `
      <div class="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
          <div class="team-item rounded">
              <a href="#" onclick="store(${element.productId}); return false;">
              <img class="img-fluid rounded-top" src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="${element.productName}" width="500px" height="500px"></a>
              <div class="team-content text-center py-3 bg-dark rounded-bottom">
                  <h4 class="text-primary" name="ProductName">${element.productName}</h4>
                  <p class="text-light" name="Price">${element.price}</p>
                  <a class="" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">تفاصيل المنتج</a>
              </div>
              <div class="team-icon d-flex flex-column justify-content-center m-4">
                  <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="addToCart('${element.productId}'); return false;">
                      <i class="fa fa-shopping-cart"></i>
                  </a>
                  <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">
                      <i class="fa fa-info"></i>
                  </a>
              </div>
          </div>
      </div>
      `;
  });
  }
  else if (sorting == "D") {
    const sortByPriceAscURL = `https://localhost:44397/api/Products/SortProductByPriceDescending?id=${n}`;
    let response = await fetch(sortByPriceAscURL);
    let data = await response.json();
    let x = document.getElementById("cardProduct");
    x.innerHTML = "";
    data.forEach(element => {
      x.innerHTML += `
      <div class="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
          <div class="team-item rounded">
              <a href="#" onclick="store(${element.productId}); return false;">
              <img class="img-fluid rounded-top" src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="${element.productName}" width="500px" height="500px"></a>
              <div class="team-content text-center py-3 bg-dark rounded-bottom">
                  <h4 class="text-primary" name="ProductName">${element.productName}</h4>
                  <p class="text-light" name="Price">${element.price}</p>
                  <a class="" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">تفاصيل المنتج</a>
              </div>
              <div class="team-icon d-flex flex-column justify-content-center m-4">
                  <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="addToCart('${element.productId}'); return false;">
                      <i class="fa fa-shopping-cart"></i>
                  </a>
                  <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">
                      <i class="fa fa-info"></i>
                  </a>
              </div>
          </div>
      </div>
      `;
  });

  }
  else if (sorting == "all")
  {
    GetProduct()
  }
}

async function GetProduct() {
  try {
      debugger;  // لإيقاف التنفيذ والتحقق من الأخطاء إذا لزم الأمر
      
      // استرجاع categoryId من localStorage وتحويله إلى رقم
      let n = Number(localStorage.getItem("categoryId"));

      // URL لجلب المنتجات حسب الفئة
      let ProductUrl = `https://localhost:44397/api/Products/GetProductByCategoryId?id=${n}`;

      // جلب البيانات من الـ API
      let response = await fetch(ProductUrl);

      // التحقق من حالة الاستجابة
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      // الوصول إلى العنصر الذي ستعرض فيه المنتجات
      let x = document.getElementById("cardProduct");
      x.innerHTML = "";
      // التعامل مع البيانات الموجودة داخل $values
          data.$values.forEach(element => {
              x.innerHTML += `
              <div class="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
                  <div class="team-item rounded">
                      <a href="#" onclick="store(${element.productId}); return false;">
                      <img class="img-fluid rounded-top" src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="${element.productName}" width="500px" height="500px"></a>
                      <div class="team-content text-center py-3 bg-dark rounded-bottom">
                          <h4 class="text-primary" name="ProductName">${element.productName}</h4>
                          <p class="text-light" name="Price">${element.price}</p>
                          <a class="" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">تفاصيل المنتج</a>
                      </div>
                      <div class="team-icon d-flex flex-column justify-content-center m-4">
                          <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="addToCart('${element.productId}'); return false;">
                              <i class="fa fa-shopping-cart"></i>
                          </a>
                          <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;">
                              <i class="fa fa-info"></i>
                          </a>
                      </div>
                  </div>
              </div>
              `;
          });
      
  } catch (error) {
      console.error("Error fetching or processing data:", error);
  }
}

// استدعاء الدالة لجلب البيانات
GetProduct();

function store(id) {
  localStorage.productId = id;
  window.location.href = "productDetails.html"
  
}

var UserId = localStorage.getItem("UserId");
var idUser =  localStorage.setItem('UserId',UserId);
var cartid =  localStorage.setItem('cartId',cartId);

// var UserId = localStorage.getItem("UserId"); // هاي لحتى اخزن الid للمستخدم
// var productId = localStorage.getItem("selectedProductId");
async function addToCart(productId) {
  debugger;
  var UserId = localStorage.getItem("UserId");

  if (UserId != "null") {


    var url = `https://localhost:44397/api/Cart?id=${UserId}`;

    var data = {
        productId: productId,
        // cartId: CartId, 
      quantity: 1,
    };

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Product added successfully to the cart!");
      window.location.reload();
    } else {
      let error = await response.text();
      console.error("Error:", error);
    }
  } else {
    debugger;

    const cartItem = {
      product_id: productId,
      // cartId: CartId, 
      quantity: 1,
      productName: name,
      price: price,
      imageUrl: image,
    };

    // Check if there is already a cart in localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product is already in the cart
    let existingItem = cartItems.find((item) => item.product_id === productId);

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity =
        parseInt(existingItem.quantity) + parseInt(QuantityOfProduct);
    } else {
      // If it's a new product, add it to the cart array
      cartItems.push(cartItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    alert("Product added successfully to the cart!");

    // Optionally, reload or redirect to another page
    window.location.reload();
  }
}
