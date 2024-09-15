async function GetProduct() {
  debugger;
  let n = Number(localStorage.getItem("categoryId"));
  var ProductUrl = `https://localhost:44397/api/Products/GetProductByCategoryId?id=${n}`;

  let response = await fetch(ProductUrl);
  let data = await response.json();

  let x = document.getElementById("cardProduct");

  data.forEach(element => {
      x.innerHTML += 
      `  <div class="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
              <div class="team-item rounded">
                  <a href="#" onclick="store(${element.productId}); return false;">
                  <img class="img-fluid rounded-top " src="/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="" name="ImageUrl"></a>
                  <div class="team-content text-center py-3 bg-dark rounded-bottom">
                      <h4 class="text-primary" name="ProductName">${element.productName}</h4>
                      <p class="text-light" name="Price">${element.price}</p>
                   <a class="" href="#" onclick="store(${element.productId}); return false;">تفاصيل المنتج</a>
                  </div>
                  <div class="team-icon d-flex flex-column justify-content-center m-4">
                      <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="GoAddProduct(); return false;"><i class="fa fa-shopping-cart"></i></a>
                      <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="#" onclick="store('${element.productId}','${element.productName}', '${element.price}','${element.imageUrl}'); return false;"><i class="fa fa-info"></i></a>
                  </div>
              </div>
          </div>
          `;
  });
}
GetProduct();


function store(id) {
  localStorage.productId = id;
  window.location.href = "productDetails.html"
  
}

// function clearCategory() {
//   localStorage.removeItem("productId");
//   localStorage.removeItem("categoryId");

// }