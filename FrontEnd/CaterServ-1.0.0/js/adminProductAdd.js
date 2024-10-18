async function addProduct() {
    const AddProductURL = 'https://localhost:44397/api/Products/AddProductByCategoryID';
    
    // Get categoryId from localStorage
    let categoryId = localStorage.getItem("categoryId");
    let adminProduct = localStorage.getItem("UserId");
    if (!categoryId) {
        alert("Category ID not found in localStorage.");
        return; // Exit the function
    }

    var form = new FormData(document.getElementById("formAddProduct"));
    form.append("CategoryId", categoryId);  // Add CategoryId to the data
    form.append("AdminProduct", adminProduct); // Add UserId to the data

    try {
        var response = await fetch(AddProductURL, {
            method: 'POST',
            body: form
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        alert("تمت إضافة المنتج بنجاح");
        window.location.reload();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert("فشل في إضافة المنتج: " + error.message);
    }
}

// Add this event listener to prevent form submission
document.getElementById("formAddProduct").addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    // addProduct();
});


var UserId = localStorage.getItem('UserId');
async function UserInfo() {
    debugger;
    const UserInfoURL = `https://localhost:44397/api/Users/GetUserByID?id=${UserId}`
    const response = await fetch(UserInfoURL)
    const data = await response.json()
    let info = document.getElementById('AdminInfo');

        info.innerHTML = 
        `
            <label>الاسم</label>
            <p>${data.userName}</p>
            <label>البريد الالكتروني</label>
            <p>${data.email}</p>
            <label>رقم الهاتف</label>
            <p>${data.phone}</p>
            <label>الموقع</label>
            <p>${data.address}</p>
            <br>
        `
}

async function UpdateInfo() {
    debugger;
    const UpdateInfoURL = `https://localhost:44397/api/Users/EditUser?id=${UserId}`
    
    event.preventDefault();

    var update = document.getElementById('updateInfo');
    var form = new FormData(update);

    var response = await fetch(UpdateInfoURL, {
        method: 'PUT',
        body: form,
    });

    window.location.reload();
}

async function UpdatePassowrd()
{
    debugger;
    const UpdatePassowrdURL = `https://localhost:44397/api/Users/EditUserPassword?id=${UserId}`
    
    event.preventDefault();

    var update = document.getElementById('UpdatePassowrd');
    var form = new FormData(update);

    var response = await fetch(UpdatePassowrdURL,
        {
            method: 'PUT',
            body: form,
        }
    )

    if (response.ok) {

        alert("تم تغيير كلمة المرور بنجاح");
        window.location.reload();
    } else {
        alert("حدث خطأ أثناء تغيير كلمة المرور.");
    }
   
}

// بناءا على الادمن اي دي لازم تظهر المنتجات الخاصة فيه
async function showProduct() {
debugger;

    let UserId = localStorage.getItem("UserId");
    const showProductURL = `https://localhost:44397/api/Products/GetProductByAdminId?id=${UserId}`
    const response = await fetch(showProductURL)
    const data = await response.json()
    let product = document.getElementById('tableProduct');
   product.innerHTML = ""
        data.$values.forEach(element => {
            product.innerHTML += 
            `
            <div class="col">
             <div class="card h-100" >
                <div class="card-body" >
                    <h5 class="card-title">${element.productName}</h5>
                    <p class="card-text">${element.price}</p>
                    <p class="card-text">${element.stockQuantity}</p>
                    <p class="card-text">${element.description}</p>
                    <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="" width="100px" height="100px"> 
                    <br>
                    <br>
                      <a class="btn btn-warning" href="#EditProduct" onclick="storeProductId(${element.productId})">
                            <i class="fas fa-edit"></i>
                        </a>
                    <button class="btn btn-danger" onclick="DeleteProduct(${element.productId})"> <i class="fa fa-times" aria-hidden="true"></i> </button>
                </div>
             </div>
            </div>
            `
        });
    
}

function storeProductId(productId) {
    localStorage.setItem("productId", productId);
}
async function EditProduct() {
    debugger;
    
    
    let UserId = localStorage.getItem("UserId");
    const showProductURL = `https://localhost:44397/api/Products/GetProductByAdminId?id=${UserId}`
    const response1 = await fetch(showProductURL)
    const data = await response1.json()
    let product = document.getElementById('tableProduct');
   product.innerHTML = ""
        data.$values.forEach(element => {
            product.innerHTML += 
            `
            <div class="col">
             <div class="card h-100" >
                <div class="card-body" >
                    <h5 class="card-title">${element.productName}</h5>
                    <p class="card-text">${element.price}</p>
                    <p class="card-text">${element.stockQuantity}</p>
                    <p class="card-text">${element.description}</p>
                    <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="" width="100px" height="100px"> 
                    <br>
                    <br>
                      <a class="btn btn-warning" href="#EditProduct" onclick="storeProductId(${element.productId})">
                            <i class="fas fa-edit"></i>
                        </a>
                    <button class="btn btn-danger" onclick="DeleteProduct(${element.productId})"> <i class="fa fa-times" aria-hidden="true"></i> </button>
                </div>
             </div>
            </div>
            `
        });

    // Retrieve the productId from localStorage
    const id = Number(localStorage.getItem("productId"));
    if (!id) {
        alert("لم يتم العثور على المنتج.");
        return;
    }

    const EditProductURL = `https://localhost:44397/api/Products/EditProduct?id=${id}`;
    var form = new FormData(document.getElementById("editProductForm"));

    let response = await fetch(EditProductURL, {
        method: 'PUT',
        body: form,
    });

    if (response.ok) {
        alert("تم تحديث المنتج بنجاح");
        window.location.hash= '#crud-products'  ;
        // document.getElementById("EditProduct").style.display = 'none';
    }
}


async function fetchCustomOrders() {

    debugger;
    let categoryId = localStorage.getItem("categoryId");

    const showProductURL = `https://localhost:44397/api/CustomOrder/GetCustomOrder?id=${UserId}&categoryId=${categoryId}`
    const response = await fetch(showProductURL)
    const data = await response.json()
    let product = document.getElementById('CustomShow');
    if (data.$values && Array.isArray(data.$values)) {
        data.$values.forEach(element => {
            product.innerHTML += 
            `
            <div class="col">
             <div class="card h-100" >
                <div class="card-body">
                    <h5 class="card-title"> وصف المنتج : ${element.productDescription}</h5>
                    <p class="card-text"> اسم الزبون : ${element.user.userName}</p>
                    <p class="card-text"> البريد الالكتروني : ${element.user.email}</p>
                    <p class="card-text"> رقم الهاتف : ${element.user.phone}</p>
                    <p>صورة تقريبية للمنتج :</p>
                    <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.img}" alt="" width="100px" height="100px"> 
                </div>
                <p>
                عند قبولك لهذه القطعة فان التواصل يكون بينك و بين الزبون بشكل مباشرة
                </p>
                    <button type="submit" class="btn btn-primary" >قبول طلب هذه القطعة</button>
             </div>
             
            </div>
            `
        });
    }
}
// Call the function to fetch custom orders when needed
// fetchCustomOrders();
async function DeleteProduct(id) {
    debugger
    if (confirm("هل انت متاكد من حذف المنتج")) {
        const deleteURL = `https://localhost:44397/api/Products/DeleteProduct?id=${id}`;
        let response = await fetch(deleteURL, {
            method: 'DELETE'
        });
    
        if (response.ok) {
            alert("تم حذف المنتج بنجاح");
            window.location.reload();
        }
    }
    else {
            alert("تم الغاء العملية");
        }
   
}    


//هاي احتماااااال اتخلص منها خلاص
async function Accept() {
    const acceptURL = `https://localhost:44397/api/CustomOrder/OrderCustomPiece/${UserId}`
    event.preventDefault();
    
}
showProduct()
UserInfo();