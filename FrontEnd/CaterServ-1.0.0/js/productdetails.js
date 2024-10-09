
  // localStorage.setItem("productId", data.productId);

id = Number(localStorage.getItem("productId"));
async function ProductDetails(id) {
  debugger;
  const productdetails = `https://localhost:44397/api/Products/GetProductById?id=${id}`;

  let x = document.getElementById("formProduct");
  let response = await fetch(productdetails);
  let data = await response.json();

  if (data && typeof data === 'object') {
    x.innerHTML =
    `
            <div class="product-detail-top">
                            <div class="row align-items-center">
                                <div class="col-md-5">
                                    <div class=" normal-slider">
                                        <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${data.imageUrl}" alt="Product Image" height="500" width="500px">
                                    </div>
                                </div>
                                <div class="col-md-7" style="text-align:center;">
                                    <div class="product-content">
                                        <div class="title"><h2>${data.productName}</h2></div>

                          
                                         <br>

                                        
                                        <div class="price">
                                            <h4>السعر:</h4>
                                            <p>${data.price}</p>
                                        </div>
                                        <br>

                                        <div id="description" class="container tab-pane active">
                                          <h4>وصف المنتج</h4>
                                          <p>
                                          ${data.description}
                                          </p>
                                        </div>
                                        <br>

                                        <div id="Q">
                                        <h4 id="stockQuantity">الكمية المتاحة : ${data.stockQuantity}</h4>
                                        <br>
                                        <input type="number" id="DataOfQ" placeholder="1" max="${data.stockQuantity}" />
                                        </div>
                                        <br>
                                        <div class="action">
                                          <a class="btn btn-primary" onclick="addToCart(${data.productId},'${data.productName}',${data.price},'${data.imageUrl}','${data.stockQuantity}')">
                                              <i class="fa fa-shopping-cart"></i> اضف الى عربة التسوق
                                          </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
             
    `;
}}
ProductDetails(id);


//هاي عشان افكر فيها 
//<a class="btn btn-primary" onclick="addToWishlist()"><i class="fa fa-heart"></i>اضف الى المفضلة</a>


var UserId = localStorage.getItem("UserId");
var idUser =  localStorage.setItem('UserId',UserId);

var CartId = localStorage.getItem("CartId");

// حفظ CartId في localStorage بعد الحصول عليه من الاستجابة
localStorage.setItem('CartId', CartId);

async function addToCart(productId,productName,price,imageUrl,Q) {
  debugger;

  var UserId = localStorage.getItem("UserId");
  var idUser =  localStorage.setItem('UserId',UserId);


  var DataQ = document.getElementById('DataOfQ').value;
  var QinDB = document.getElementById('stockQuantity').textContent;
  let quantityValue = QinDB.replace('الكمية المتاحة : ', '').trim(); // Removing the label to get only the number

  let numericQinDB = Number(quantityValue);
  let numericDataQ = Number(DataQ);

  if (numericDataQ > numericQinDB) {
    alert('الكمية غير متاحة سوف نقوم بتوفير الكمية المناسبة في اقرب فرصة')
  }
  else {
  if (UserId != "null") {
    var url = `https://localhost:44397/api/Cart?id=${UserId}`;

    var data = {
        productId: productId,
        // CartId: CartId, 
      quantity: DataQ,
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
  } 
  
  else {
    debugger;

    const cartItem = {
      product_id: productId,
      // cartId: CartId, 
      quantity: 1,
      productName: productName,
      price: price,
      imageUrl: imageUrl,
      stockQuantity:stockQuantity
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
}

//الان هاد الستايل و ال اج تي ام ال كود عشان الريفيو و القصه عن التاجر لازم تشتغلي على قصة التاجر تكون من الداتا بيز 
// ولازم اشتغل على النجوم ة على كتابة فيد باك و يظهر مباشرة 

/*            <div class="row product-detail-bottom">
                            <div class="col-lg-12">
                                <ul class="nav nav-pills nav-justified">
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="pill" href="#specification">عن التاجر</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="pill" href="#reviews">تعليقات</a>
                                    </li>
                                </ul>
        
                                <div class="tab-content" style="text-align: right;">
                                  
                                    <div id="reviews" class="container tab-pane fade">
                                        <div class="reviews-submitted">
                                            <div class="reviewer">مريم <span>01 Jan 2020</span></div>
                                            <div class="ratting">
                                              نجوووووووووم نجووووووووووم
                                            </div>
                                            <p>
                                              قطعة جميلة جدا
                                            </p>
                                        </div>
                                        <div class="reviews-submit">
                                            <h4>شاركنا رأيك بالمنتج:</h4>
                                            <div class="ratting">
                                               نجووووووووووووووووووم 
                                            </div>
                                            <div class="row form">
                                                <div class="col-sm-6">
                                                    <input type="text" placeholder="الاسم">
                                                </div>
                                                <div class="col-sm-6">
                                                    <input type="email" placeholder="الايميل">
                                                </div>
                                                <div class="col-sm-12">
                                                    <textarea placeholder="التعليق"></textarea>
                                                </div>
                                                <div class="col-sm-12">
                                                    <button >ارسل التعليق</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
          */ 