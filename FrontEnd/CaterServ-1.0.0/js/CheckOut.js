
// async function CheckOut() {
//     debugger
//     let UserId = localStorage.getItem('UserId');
//     let userInfo = document.getElementById('UserInfo');
//     let payInfo = document.getElementById('Pay');

//     // استرجاع معلومات المستخدم بناءً على UserId
//     const urlUserInfo = `https://localhost:44397/api/Users/GetUserByID?id=${UserId}`;
//     const responseUser = await fetch(urlUserInfo);
//     const userData = await responseUser.json();

//     // عرض معلومات المستخدم
//     userInfo.innerHTML = `
//         <address>
//           <div>  ${userData.userName}<br /></div>
//           <div">   ${userData.address}<br />
//            <div>  ${userData.phone}<br />
//         </address>
//     `;

//     // استرجاع السلة بناءً على UserId
//     const urlCartInfo = `https://localhost:44397/api/Cart/GetCartByUserID?id=${UserId}`;
//     const responseCart = await fetch(urlCartInfo);
//     const cartData = await responseCart.json();

//     // حساب مجموع السعر الكلي للسلة
//     let cartId = cartData.cartId;

//     // Calculate total price and quantity
//     let totalPrice = 0;
//     let totalQuantity = 0;

//         cartData.$values.forEach(element => 
//     // cartData.forEach(element =>
//          {
//         totalPrice += element.product.price * element.quantity;
//     });


//     localStorage.setItem('cartId', cartId);
//     localStorage.setItem('totalAmount', totalPrice);
//     localStorage.setItem('quantity', totalQuantity);


//     // عرض معلومات الدفع
//     payInfo.innerHTML = `
//         <tr>
//             <td name="TotalPrice"> ${totalPrice} دينار</td>
//         </tr>
//         <div>
//             <button type="submit" class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill" onclick="Order()" >تأكيد الشراء</button>
//         </div>
//     `;

//     // حفظ السعر الكامل في localStorage إذا كنت بحاجة لذلك في المستقبل
//     localStorage.setItem('TotalPrice', totalPrice);

// }

// async function Order() {
// debugger
//         const cartId = localStorage.getItem('cartId');
//         const userId = localStorage.getItem('UserId');
//         const totalAmount = localStorage.getItem('totalAmount');
//         const quantity = localStorage.getItem('quantity');

//     try {
//         debugger;
//         event.preventDefault();

//         // استرجاع UserId من localStorage أو أي مكان آخر
//         const UserId = localStorage.getItem('UserId');  // تأكد أن UserId مخزن بشكل صحيح في localStorage

//         if (!UserId) {
//             throw new Error("UserId is not defined. Please check if the user is logged in.");
//         }

//         // بناء URL الطلب مع UserId
//         const orderURL = 'https://localhost:44397/api/Order/CreateOrder';

//         // جلب بيانات النموذج
//         // var data = document.getElementById('form');
//         // var form = new FormData(data);

//         // إرسال الطلب إلى الخادم
//         let response = await fetch(orderURL, {
//             method: 'POST',
//             body: {
//                 cartId: cartId,
//                 userId: userId,
//                 totalAmount: totalAmount,
//                 quantity: quantity
//               },
//         });

//         // التحقق من حالة الاستجابة من الخادم
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         // توجيه المستخدم إلى صفحة "Thank You" بعد إكمال الطلب
//         window.location.href = 'ThankYou.html';
//     } catch (error) {
//         console.error("Error placing order:", error);
//     }
// }
// CheckOut();

async function CheckOut() {
    debugger;
    let UserId = localStorage.getItem('UserId');
    let userInfo = document.getElementById('UserInfo');
    let payInfo = document.getElementById('Pay');

    // Retrieve user information based on UserId
    const urlUserInfo = `https://localhost:44397/api/Users/GetUserByID?id=${UserId}`;
    const responseUser = await fetch(urlUserInfo);
    const userData = await responseUser.json();

    // Display user information
    userInfo.innerHTML = `
        <address>
            <div>${userData.userName}<br /></div>
            <div>${userData.address}<br /></div>
            <div>${userData.phone}<br /></div>
        </address>
    `;

    // Retrieve cart based on UserId
    const urlCartInfo = `https://localhost:44397/api/Cart/GetCartByUserID?id=${UserId}`;
    const responseCart = await fetch(urlCartInfo);
    const cartData = await responseCart.json();

    // Calculate total price and quantity
    let cartId = cartData.cartId;
    let totalPrice = 0;
    let totalQuantity = 0;

    cartData.$values.forEach(element => {
        totalPrice += element.product.price * element.quantity;
        totalQuantity += element.quantity; // Calculate total quantity
    });

    // localStorage.setItem('cartId', cartId);
    localStorage.setItem('totalAmount', totalPrice);
    localStorage.setItem('quantity', totalQuantity);

    // Display payment information
    payInfo.innerHTML = `
        <tr>
            <td name="TotalPrice">${totalPrice} دينار</td>
        </tr>
        <div>
            <button type="button" class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill" onclick="Order()">تأكيد الشراء</button>
        </div>
    `;

    // Save total price in localStorage if needed for future
    localStorage.setItem('TotalPrice', totalPrice);
}

async function Order() {
    debugger;
    // event.preventDefault(); // Prevent default form submission behavior

    const cartId = localStorage.getItem('id');
    const userId = localStorage.getItem('UserId');
    const totalAmount = localStorage.getItem('totalAmount');
    const quantity = localStorage.getItem('quantity');

    try {
        if (!userId) {
            throw new Error("UserId is not defined. Please check if the user is logged in.");
        }

        // Build order URL
        const orderURL = 'https://localhost:44397/api/Order/CreateOrder';

        // Create order data
        const orderData = {
            cartId: cartId,
            userId: userId,
            totalAmount: totalAmount,
            quantity: quantity
        };

        // Send request to server
        let response = await fetch(orderURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify content type
            },
            body: JSON.stringify(orderData) // Convert data to JSON
        });

        // Check response status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Redirect to "Thank You" page after completing the order
        window.location.href = 'ThankYou.html';
    } catch (error) {
        console.error("Error placing order:", error);
    }
}

// Call CheckOut function to initialize
CheckOut();