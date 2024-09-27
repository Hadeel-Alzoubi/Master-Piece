//For Product
async function showProduct() {
    debugger;
    const showProductURL = 'https://localhost:44397/api/Products/GetAllProduct';
    const response = await fetch(showProductURL);
    const data = await response.json();

    let product = document.getElementById('tableProduct');
    if (data.$values && Array.isArray(data.$values)) {
        data.$values.forEach(element => {
            // let imageUrl = element.imageUrl ? `/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}` : 'path/to/default/image.png';

            product.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title"> اسم المنتج : ${element.productName}</h5>
                        <p class="card-text"> سعر المنتج  : ${element.price}</p>
                        <p class="card-text"> الكمية لدى التاجر : ${element.stockQuantity}</p>
                        <p class="card-text"> وصف المنتج : ${element.description}</p>
                        <p class="card-text">صورة المنتج :</p>
                        <img src="/BackEnd/Supporting_projects/Supporting_projects/Uploads/${element.imageUrl}" alt="" width="100px" height="100px">
                        <br><br>
                          <a class="btn btn-warning" href="#EditProduct" onclick="storeProductId(${element.productId})"> تعديل
 </a>
                    <button class="btn btn-danger" onclick="DeleteProduct(${element.productId})"> <i class="fa fa-times" aria-hidden="true"></i> </button>
                    </div>
                  
                </div>
            </div>
            `;
        });
    }
}
// Store productId in localStorage when "Edit" button is clicked
function storeProductId(productId) {
    localStorage.setItem("productId", productId);
}
async function EditProduct() {
    debugger;
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
async function DeleteProduct(id) {
    debugger
    const deleteURL = `https://localhost:44397/api/Products/DeleteProduct?id=${id}`;
    let response = await fetch(deleteURL, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert("تم حذف المنتج بنجاح");
        window.location.reload();
    }
}    


//For Users
async function ShowCustomer() {
    debugger
    const CustomGetURL = 'https://localhost:44397/api/Users/GetAllUser'
    const response = await fetch(CustomGetURL);
    const data = await response.json();

    let customer = document.getElementById("CustomerTable");
    data.$values.forEach(element =>
        customer.innerHTML += `
        <tr>
            <td>${element.userName}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.address}</td>
            <td>
                <a href="#EditUser" onclick="storeUserId(${element.userId})">تعديل</a>
                
            <a href="#" onclick="DeleteUser(${element.userId})"><i class="fa fa-times" aria-hidden="true"></i></a>
            </td>
        </tr>
        
        `
    )
}
function storeUserId(userId) {
    localStorage.setItem("userId", userId);
}
async function EditUser() {
    debugger;
    // Retrieve the productId from localStorage
    const id = Number(localStorage.getItem("userId"));
    if (!id) {
        alert("لم يتم العثور على المنتج.");
        return;
    }

    const EditUserURL = `https://localhost:44397/api/Users/EditUser?id=${id}`;
    var form = new FormData(document.getElementById("editUserForm"));

    let response = await fetch(EditUserURL, {
        method: 'PUT',
        body: form,
    });

    if (response.ok) {
        alert("تم تحديث المعلومات بنجاح");
        window.location.hash= '#users'  ;
        window.location.reload();

        // document.getElementById("EditProduct").style.display = 'none';
    }
}
async function DeleteUser(uid) {
    debugger;

    const DeleteUserURL = `https://localhost:44397/api/Users/DeleteUser?id=${uid}`
    let response = await fetch(DeleteUserURL, {
        method: 'DELETE'
    });
    if (confirm("هل أنت متأكد من حذف المستخدم؟")) {
        // إذا ضغط المستخدم على "OK"
        if (response.ok) {
            alert("تم حذف المعلومات بنجاح");
            window.location.reload();
        }
        console.log("تم الحذف");
    } else {
        // إذا ضغط المستخدم على "Cancel"
        console.log("تم إلغاء الحذف");
    }
    
}


//For Admin
async function ShowAdmin() {
    debugger
    const CustomGetURL = 'https://localhost:44397/api/Users/GetAllAdmin'
    const response = await fetch(CustomGetURL);
    const data = await response.json();

    let customer = document.getElementById("AdminTable");
    data.$values.forEach(element =>
        customer.innerHTML += `
        <tr>
            <td>${element.userName}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.address}</td>
            <td>
                <a href="#EditAdmin" onclick="storeAdminId(${element.userId})">تعديل</a>
                
            <a href="#" onclick="DeleteِAdmin(${element.userId})"><i class="fa fa-times" aria-hidden="true"></i></a>
            </td>
        </tr>
        
        `)
}
function storeAdminId(userId) {
    localStorage.setItem("userId", userId);
}
async function EditAdmin() {
    debugger;
    // Retrieve the productId from localStorage
    const id = Number(localStorage.getItem("userId"));
    if (!id) {
        alert("لم يتم العثور على المنتج.");
        return;
    }

    const EditUserURL = `https://localhost:44397/api/Users/EditUser?id=${id}`;
    var form = new FormData(document.getElementById("editAdminForm"));

    let response = await fetch(EditUserURL, {
        method: 'PUT',
        body: form,
    });

    if (response.ok) {
        alert("تم تحديث المعلومات بنجاح");
        window.location.hash= '#vendors'  ;
        window.location.reload();

        // document.getElementById("EditProduct").style.display = 'none';
    }
}
async function DeleteِAdmin(aid) {
    debugger;

    const DeleteUserURL = `https://localhost:44397/api/Users/DeleteUser?id=${aid}`
    let response = await fetch(DeleteUserURL, {
        method: 'DELETE'
    });
    if (confirm("هل أنت متأكد من حذف المستخدم؟")) {
        // إذا ضغط المستخدم على "OK"
        if (response.ok) {
            alert("تم حذف المعلومات بنجاح");
            window.location.reload();
        }
        console.log("تم الحذف");
    } else {
        // إذا ضغط المستخدم على "Cancel"
        console.log("تم إلغاء الحذف");
    }
    
}

// For Category
async function ShowCategory() {
    const categoryURL = 'https://localhost:44397/api/Categories/GetAllCategory';
    const response = await fetch(categoryURL);
    const data = await response.json();
    let category = document.getElementById("CategoryTable");
    data.$values.forEach(element =>
        category.innerHTML += `
        <tr>
            <td>${element.categoryName}</td>
            <td><a href="#" onclick="DeleteCategory(${element.categoryId})"> <i class="fa fa-times" aria-hidden="true"></i> </a></td>
        </tr>
            `)
}
async function AddCategory() {
    const AddCategoryURL = 'https://localhost:44397/api/Categories/AddCategory';
    event.preventDefault();
    var form = new FormData(document.getElementById("addcategory"));
    let response = await fetch(AddCategoryURL, {
        method: 'POST',
        body: form,
    });
    if (response.ok) {
        alert("تمت اضافة الصنف الى الموقع بنجاح");
        window.location.reload();
    }
}
async function DeleteCategory(cid) {
    const DeleteCategoryURL = `https://localhost:44397/api/Categories/DeleteCategory?id=${cid}`
    let response = await fetch(DeleteCategoryURL, {
        method: 'DELETE'
    });
    if(confirm("هل انت متاكد من حذف هذا الصنف"))
    {
        if (response.ok) {
            alert("تم حذف الصنف بنجاح");
            window.location.reload();
        }
        console.log("تم الحذف");
    }else
    {
        console.log("تم الغاء الحذف");
    }
}


//For Contact Us
async function ShowMessage() {
    const messageshowURL = 'https://localhost:44397/api/ContactUs';
    const response = await fetch(messageshowURL);
    const data = await response.json();
    let contact = document.getElementById("ContactTable");

    data.$values.forEach(element =>
        contact.innerHTML += `
        <tr>
            <td>${element.name}</td>
            <td>${element.email}</td>   
            <td>${element.message}</td>
        </tr>`);
}


// //For Vendor 
// async function showVendor() {
//     debugger;
//     const showVendorURL = 'https://localhost:44397/api/Vendor';
//     const response = await fetch(showVendorURL);
//     const data = await response.json();

//     let Vendor = document.getElementById('vendorOrder');
    
//         data.$values.forEach(element => {

//             Vendor.innerHTML += `
//             <div class="col" >
//                 <div class="card h-100">
//                     <div class="card-body">
//                         <h5 class="card-title"> الاسم : ${element.vendorName}</h5>
//                         <p class="card-text"> رقم الهاتف : ${element.phone}</p>
//                         <p class="card-text">الموقع : ${element.address}</p>
//                         <p class="card-text">البريد الالكتروني : ${element.email}</p>
//                         <p class="card-text">الصنف : ${element.category}</p>
//                         <button class="btn btn-warning" onclick="ApprovVendore()"> <i class="fa fa-check" aria-hidden="true"></i> </button>
//                         <button class="btn btn-danger" onclick="DeleteVendor(${element.vendorid})"><i class="fa fa-times" aria-hidden="true"></i></button>
//                     </div>
//                 </div>
//             </div>
//             `;
//         });
    
// }
// async function ApprovVendore() {
//     debugger;
//     const ApproveVendorURL = 'https://localhost:44397/api/Vendor/approved';
//     var form = document.getElementById('vendorOrder');
//     var fromSwagger = new FormData(form);
//     var Approve = await fetch(ApproveVendorURL,
//         {
//             method: 'POST',
//             body:fromSwagger
//         });
//     alert("تمت الموافقة على هذاالتاجر");
// }
async function showVendor() {
    const showVendorURL = 'https://localhost:44397/api/Vendor';
    const response = await fetch(showVendorURL);
    const data = await response.json();

    let Vendor = document.getElementById('vendorOrder');
    
    data.$values.forEach(element => {
        Vendor.innerHTML += `
        <div class="col" >
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title"> الاسم : ${element.vendorName}</h5>
                    <p class="card-text"> رقم الهاتف : ${element.phone}</p>
                    <p class="card-text">الموقع : ${element.address}</p>
                    <p class="card-text">البريد الالكتروني : ${element.email}</p>
                    <p class="card-text">الصنف : ${element.category}</p>
                    <button class="btn btn-warning" onclick="ApprovVendore(${element.vendorid}, '${element.vendorName}', '${element.phone}', '${element.address}', '${element.email}', '${element.category}')"> 
                        <i class="fa fa-check" aria-hidden="true"></i> 
                    </button>
                    <button class="btn btn-danger" onclick="DeleteVendor(${element.vendorid})">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

async function ApprovVendore(vendorid, vendorName, phone, address, email, category) {

    debugger
    const ApproveVendorURL = 'https://localhost:44397/api/Vendor/approved';

    const formData = new FormData();
    formData.append('vendorid', vendorid);
    formData.append('vendorName', vendorName);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('category', category);

    try {
        const response = await fetch(ApproveVendorURL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.getElementById(`vendor-${vendorid}`).remove();
            alert("تمت الموافقة على هذا التاجر");
            window.location.reload();

        } else {
            alert("حدث خطأ أثناء الموافقة على التاجر");
        }
    } catch (error) {
        console.error('حدث خطأ أثناء الإرسال:', error);
        alert('حدث خطأ أثناء الإرسال');
    }
}

async function DeleteVendor(id) {
    const deletevendorURL = `https://localhost:44397/api/Vendor?id=${id}`;
    var del = await fetch(deletevendorURL,{
        method: 'DELETE'
    });
}


//For Oder In Anamel