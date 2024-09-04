async function ShowCart() {
    const url = 'https://localhost:44319/api/Cart/GetToCartItem'
    var data = await fetch(url);
    var response = await data.json();
0
    var table =  document.getElementById("table");

    response.forEach(element => {
        table.innerHTML += `
        <tbody>
            <tr >
               <td >${element.product.productName}</td>
               <td>${element.cartId}</td>
            
               <td><input id="quantity" type="number" value="${element.quantity}" class="form-input"></td>
               <button type="button" class="btn btn-outline-danger" onclick="clearCart(${element.cartItemId})">Clear</button>
               <button type="button" class="btn btn-outline-primary" onclick="EditCart(${element.cartItemId})">Edit</button>
            </tr>
            </tbody>
        `
    });
}
ShowCart();