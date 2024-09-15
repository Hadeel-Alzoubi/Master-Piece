


async function ShowCart() {
    const url = `https://localhost:7084/api/Cart/getUserCartItems/${from-database}`
    var data = await fetch(url);
    var response = await data.json();

    var table =  document.getElementById("Maintable");

    response.forEach(element => {
        table.innerHTML += `
                             <tr>
                            <th scope="row">
                                <div style="text-align: center;" >
                                    <img src="/Supporting_projects/Supporting_projects/Uploads/${element.product.imageUrl}" class=" rounded-circle" style="width: 80px; height: 80px;" alt="">
                                </div>
                            </th>
                            <td>
                                <p class="mb-0 mt-4">${element.product.productName}</p>
                            </td>
                            <td>
                                <p class="mb-0 mt-4">${element.product.price} دينار</p>
                            </td>
                            <td>
                                <div class="input-group quantity mt-4">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-minus  bg-light " >
                                        -
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm text-center border-0" style="width:10px"  value="${element.quantity}">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-plus  bg-light " >
                                        +
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="mb-0 mt-4"> مجموع السعر الكلي : ${element.product.price * element.quantity}</p>
                            </td>
                            <td>
                                <button class="btn btn-md  bg-light border mt-4"  onclick="clearCart(${element.cartItemId})" >
                                    <i class="fa fa-times text-danger"></i>
                                </button>
                            </td>
                        
                        </tr>
       
        `
    });
}
ShowCart();

function clearCart(id) {
    debugger;
    const deleteUrl = `https://localhost:44397/api/Cart/DeleteItem/${id}`;

    Swal.fire({
        title: "هل انت متاكد من حذف المنتج ؟",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        showCancelButton: true,
        showCloseButton: true
    })
    .then((result) => {
        if (result.isConfirmed) {
            fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'تم الحذف',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.reload(); // Reload the page after success
                    });
                } 
              
            })
         
        } 
        else {
            // User canceled the deletion
            Swal.fire({
                title: 'تم الإلغاء',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
