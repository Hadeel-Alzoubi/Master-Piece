let n = Number(localStorage.getItem("productId"))


const AddProductURL = "https://localhost:44397/api/Products/AddProduct"
const EditProductURL = `https://localhost:44397/api/Products/EditProduct?id=${n}`

var form = document.getElementById("formAddProduct")

async function AddProduct() {
    
    var fromSwagger = new FormData(form);
    event.preventDefault();
    let response = await fetch(AddProductURL,
        {
            method: 'POST',
            body: fromSwagger,
        });
}


window.onload = async function() {
    let n = Number(localStorage.getItem("productId"));
    const GetProductURL = `https://localhost:44397/api/Products/GetProductById?id=${n}`;
    
    // Fetch the product data
    let response = await fetch(GetProductURL);
    let product = await response.json();

    document.getElementById("product-name").value = product.ProductName ;
    document.getElementById("product-price").value = product.Price ;
    document.getElementById("product-quantity").value = product.StockQuantity ;
    document.getElementById("product-description").value = product.Description;
    document.getElementById("product-category").value = product.CategoryId;
    document.getElementById("product-image").src = product.ImageUrl; // Display the existing product image in the form field
    // Assume the image field will remain empty for now; it requires user interaction to upload a new image
}

// Function to handle form submission
async function Save() {
    var form = document.getElementById("formAddProduct");
    var fromSwagger = new FormData(form);
    event.preventDefault();
    
    let response = await fetch(EditProductURL,
    {
        method: 'PUT',
        body: fromSwagger,
    });

    if (response.ok) {
        alert("تم التعديل على المنتج بنجاح");
        window.location = "AdminDashBoard.html";
    } else {
        alert("حدث خطأ أثناء تعديل المنتج.");
    }
}


