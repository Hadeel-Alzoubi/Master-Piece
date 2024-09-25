
async function CheckOut() {
    let UserId = localStorage.getItem('UserId');
    let userInfo = document.getElementById('UserInfo');
    let payInfo = document.getElementById('Pay');

    // استرجاع معلومات المستخدم بناءً على UserId
    const urlUserInfo = `https://localhost:44397/api/Users/GetUserByID?id=${UserId}`;
    const responseUser = await fetch(urlUserInfo);
    const userData = await responseUser.json();

    // عرض معلومات المستخدم
    userInfo.innerHTML = `
        <address>
          <div>  ${userData.userName}<br /></div>
          <div">   ${userData.address}<br />
           <div>  ${userData.phone}<br />
        </address>
    `;

    // استرجاع السلة بناءً على UserId
    const urlCartInfo = `https://localhost:44397/api/Cart/GetCartByUserID?id=${UserId}`;
    const responseCart = await fetch(urlCartInfo);
    const cartData = await responseCart.json();

    // حساب مجموع السعر الكلي للسلة
    let totalPrice = 0;
    if (cartData.$values && Array.isArray(cartData.$values)) {
        cartData.$values.forEach(element => 
    // cartData.forEach(element =>
         {
        totalPrice += element.product.price * element.quantity;
    });

    // عرض معلومات الدفع
    payInfo.innerHTML = `
        <tr>
            <td name="TotalPrice"> ${totalPrice} دينار</td>
        </tr>
    `;

    // حفظ السعر الكامل في localStorage إذا كنت بحاجة لذلك في المستقبل
    localStorage.setItem('TotalPrice', totalPrice);
}
}
// async function Order() {
//     const UserId = localStorage.getItem('UserId');
//     debugger;
//     event.preventDefault();
//     const orderURL = `https://localhost:44397/api/Order/SetOrderByUserID?id=${UserId}`
//     // لازم يتعدل الفورم الاسماء الي فيه لحتى نقدر نعمل بوست 
//     var data = document.getElementById('form');
//     var form = new FormData(data);
//     let response = await fetch(orderURL,
//         {
//             method: 'POST',
//             body: form,
//         });
    
//     window.location.href = 'FrontEnd/CaterServ-1.0.0/ThankYou.html';
// }

// استدعاء الدوال لعرض البيانات عند تحميل الصفحة

async function Order() {
    try {
        debugger;
        event.preventDefault();

        // استرجاع UserId من localStorage أو أي مكان آخر
        const UserId = localStorage.getItem('UserId');  // تأكد أن UserId مخزن بشكل صحيح في localStorage

        if (!UserId) {
            throw new Error("UserId is not defined. Please check if the user is logged in.");
        }

        // بناء URL الطلب مع UserId
        const orderURL = `https://localhost:44397/api/Order/SetOrderByUserID?id=${UserId}`;

        // جلب بيانات النموذج
        var data = document.getElementById('form');
        var form = new FormData(data);

        // إرسال الطلب إلى الخادم
        let response = await fetch(orderURL, {
            method: 'POST',
            body: form,
        });

        // التحقق من حالة الاستجابة من الخادم
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // توجيه المستخدم إلى صفحة "Thank You" بعد إكمال الطلب
        window.location.href = 'ThankYou.html';
    } catch (error) {
        console.error("Error placing order:", error);
    }
}


CheckOut();

