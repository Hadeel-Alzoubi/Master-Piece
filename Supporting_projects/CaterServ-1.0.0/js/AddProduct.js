let n = Number(localStorage.getItem("productId"))


const AddProductURL = "https://localhost:44397/api/Products/AddProduct"
const EditProductURL = `https://localhost:44397/api/Products/EditProduct${n}`

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

debugger;
async function Save() {
    var fromSwagger = new FormData(form);
    event.preventDefault();
   let response = await fetch(EditProductURL,
    {
        method: 'PUT',
        body: fromSwagger,
    });

        alert("تم التعديل على المنتج بنجاح");

        window.location = "AdminDashBoard.html";
}