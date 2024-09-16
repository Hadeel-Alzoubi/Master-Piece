async function AddProduct() {
    debugger;
    
        var ProductUrl ;
        let n = Number(localStorage.getItem("categoryId"))
    
        if (n != null && n != 0) {
            ProductUrl = `https://localhost:44397/api/Products/GetProductById?id=${n}`
        }
        else {
            ProductUrl = "https://localhost:44397/api/Products/GetAllProduct"
        }
    
        let response = await fetch(ProductUrl);
        let data = await response.json();
    
        let x = document.getElementById("cardProduct")
    
        data.forEach(element => {
          x.innerHTML += 
          `  <div class="col-lg-3 col-md-6 wow bounceInUp" data-wow-delay="0.1s">
                <div class="team-item rounded">
                    <a href="">
                    <img class="img-fluid rounded-top " src="${element.ImageUrl}" alt="" name="ImageUrl"></a>
                    <div class="team-content text-center py-3 bg-dark rounded-bottom">
                        <h4 class="text-primary" name="ProductName">${element.ProductName}</h4>
                        <p class="text-light" name="Price">${element.Price}</p>
                     <a class="" href="">تفاصيل المنتج</a>
                    </div>
                    <div class="team-icon d-flex flex-column justify-content-center m-4">
                        <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="" onclick="GoAddProduct()"><i class="fa fa-shopping-cart"></i></a>
                        <a class="share-link btn btn-primary btn-md-square rounded-circle mb-2" href=""><i class="fa fa-info"></i></a>
                    </div>
                </div>
            </div>
            `
        });
    }
    
    function GoAddProduct() {
        window.location.href = "addProduct.html";
    }
    GetProduct();