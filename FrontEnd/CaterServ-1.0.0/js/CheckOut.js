// async function CheckOut() {

//     let UserId = localStorage.getItem('UserId');
//     let userInfo = document.getElementById('UserInfo');

//     const urlUserInfo = `https://localhost:44397/api/Users/GetUserByID?id=${UserId}`
//     const response = await fetch(urlUserInfo)
//     const data = await response.json()

//     data.forEach(element => {
//         userInfo.innerHTML =
//         `
//             <address>
//                 ${element.userName}<br />
                
//                 ${element.address}<br />

//                 ${element.phone}<br />

//             </address>

//         `
//     });
// }

// async function payInfo() {
//     var SumPrice = localStorage.getItem('TotalPrice');
//     let payInfo = document.getElementById('Pay');

//     payInfo.innerHTML =
//         `
//           <tr>
//             <td>  ${SumPrice} دينار</td>
//           </tr>
//             `
// }

// CheckOut();
// payInfo();

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
            ${userData.userName}<br />
            ${userData.address}<br />
            ${userData.phone}<br />
        </address>
    `;

    // استرجاع السلة بناءً على UserId
    const urlCartInfo = `https://localhost:44397/api/Cart/GetCartByUserID?id=${UserId}`;
    const responseCart = await fetch(urlCartInfo);
    const cartData = await responseCart.json();

    // حساب مجموع السعر الكلي للسلة
    let totalPrice = 0;
    cartData.forEach(element => {
        totalPrice += element.product.price * element.quantity;
    });

    // عرض معلومات الدفع
    payInfo.innerHTML = `
        <tr>
            <td> ${totalPrice} دينار</td>
        </tr>
    `;

    // حفظ السعر الكامل في localStorage إذا كنت بحاجة لذلك في المستقبل
    localStorage.setItem('TotalPrice', totalPrice);
}

// استدعاء الدوال لعرض البيانات عند تحميل الصفحة
CheckOut();
