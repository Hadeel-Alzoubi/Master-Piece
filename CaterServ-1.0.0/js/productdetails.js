
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
    `  <div class="product-img">
            <img src="${data.imageUrl}" height="420" width="327">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>${data.productName}</h1>
              <br><br><br>
              <p>${data.description}</p>
            </div> <p style="text-align: center;"><span>${data.price}</span>دينار</p>
            <div class="product-price-btn" style="display: flex;">
             
              <button type="button" class="wishlist-btn" style="width: 50px;" onclick="GoLoveProduct()"><i class="fas fa-heart"></i></button>
              <button type="button" onclick="GoAddProduct()" >اضف الى السلة</button>
            </div>
          </div>`;
}}
ProductDetails(id);