var UserId = localStorage.getItem('UserId');
async function UserInfo() {
    debugger;
    const UserInfoURL = `https://localhost:44397/api/Users/GetUserByID?id=${UserId}`
    const response = await fetch(UserInfoURL)
    const data = await response.json()
    let info = document.getElementById('info');

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
UserInfo();

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

async function batool(){
debugger;
    const batoolURL = `https://localhost:44397/api/Categories/GetAllCategory`
    const response = await fetch(batoolURL)
    const data = await response.json()
    debugger
    var batool = document.getElementById('batool');
    data.$values.forEach(element => {
        batool.innerHTML += `<option value="${element.categoryId}"> ${element.categoryName}</option>
        
        `

    });
}
batool();

// هاي حذفتها مبدئيا 
async function OrderCustom() {
    debugger;
    
    // Prevent the default form submission behavior
    event.preventDefault();

    // Ensure the elements exist and their values are being captured
    var categoryId = document.getElementById("batool")?.value || '';
    var hadeel = localStorage.setItem("hadeel", categoryId)
 
    var x = document.getElementById("formCustom");
    var form = new FormData(x)

    const CustomURL = `https://localhost:44397/api/CustomOrder/OrderCustomPiece/${UserId}`;

    // form.appendChild("CategoryID",categoryId);
    // Make the POST request
    const response = await fetch(CustomURL, {
        method: 'POST',
      
        body: form
    });

    // Handle the response
    if (response.ok) {
        console.log('Order submitted successfully!');
    } else {
        console.error('Error submitting the order:', response.statusText);
    }
}


async function OrderDetails() {

    debugger
    try {
       // const UserId = UserId;  // Ensure this is properly defined
        const OrderDetailsURL = `https://localhost:44397/api/Order/getOrderByUserID?id=${UserId}`;
        
        const response = await fetch(OrderDetailsURL);

        const data = await response.json();
        console.log(data);  // Debug to ensure correct data structure

        let details = document.getElementById('orderD');
        data.forEach(element =>
            details.innerHTML += `
                <div class="info">
                    <div class="row">
                        <div class="col-7">
                            <span id="heading">التاريخ</span><br>
                            <span id="details">${element.orderDate}</span>
                        </div>
                        <div class="col-5 pull-right">
                            <span id="heading">رقم الطلب</span><br>
                            <span id="details">${element.orderId}</span>
                        </div>
                    </div>      
                </div>      
                <div class="pricing">
                   
                    <div class="row">
                        <div class="col-9">
                            <span id="name">التوصيل الى ${element.shippingAddress}</span>
                        </div>
                        <div class="col-3">
                            <span id="price">1 دينار</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <div class="row">
                        <div class="col-9">المجموع الكلي</div>
                        <div class="col-3">${element.totalPrice}</div>
                    </div>
                </div>
                <br>
                <div class="total">
                    <div class="row">
                        <div class="col-9">تتبع الطلب</div>
                        <div class="col-3">${element.status}</div>
                    </div>
                </div>
                <button onclick="GetOrderDetails(${element.orderId})">تفاصيل الطلب</button>
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            `);
        
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
}
async function GetOrderDetails(id) {
    debugger;
    const GetOrderDetailsURL = `https://localhost:44397/api/Order/GetOrderDetails?id=${id}`;
    const response = await fetch(GetOrderDetailsURL);
    const data = await response.json();
    let content = document.createElement("div");
    //هون رح يعرض المعلومات ب صفحة لحال 
   
        // Prepare content for SweetAlert
        content.innerHTML += `
            <p>المنتج: ${data.productName}</p><br>
            <p>السعر: </p>${data.price}<br>
            <p>وصف المنتج: </p>${data.description}<br>
           
        `
        console.log(content);
        // Display SweetAlert with order details
        swal({
            title: "تفاصيل الطلب",
            html: content,
            icon: "info",
            button: "إغلاق"
        });

}



async function OrderDownload() {
debugger;
 const OrderDetailsURL = `https://localhost:44397/api/Order/getOrderByUserID?id=${UserId}`;
 const response = await fetch(OrderDetailsURL);

 const data = await response.json();
 console.log(data);  // Debug to ensure correct data structure

 let details = document.getElementById('orderDownload');

 data.forEach(element => {
     details.innerHTML += 
            `
    <div class="col">
    <div class="card h-100" >
       <div class="card-body" >
           <h5 class="card-title">تاريخ الطلب : ${element.orderDate}</h5>
           <p class="card-text"> حالة الطلب : ${element.status}</p>
           <p class="card-text"> الموقع : ${element.shippingAddress}</p>
           <p class="card-text"> المجموع الكلي : ${element.totalPrice} دينار</p>
           <button onclick="Download(${element.orderId})" class="view">تحميل الملف</button>
       </div>
    </div>
   </div>
   `});
}
async function Download(id) {
    debugger;
    const DownloadURL = `https://localhost:44397/api/Order/GenerateInvoice?orderId=${id}`

    const link = document.createElement("a");
    link.href = DownloadURL;
    link.download = `${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}

// هل في الها داعي ؟؟
async function DeleteAccount() {
    const deleteaccountURL = `https://localhost:44397/api/Users/DeleteUser?id=${UserId}`
    const response = await fetch(deleteaccountURL, {
        method: 'DELETE',
    });

    if(confirm(response.status))
    {
        alert("هل انت متاكد من انك تريد حذ الحساب");
    }
    else
    {   
        alert("تم الغاء العملية");
    }
}