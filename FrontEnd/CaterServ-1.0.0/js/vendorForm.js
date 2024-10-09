async function categoryVendor(){
    debugger;
        const batoolURL = `https://localhost:44397/api/Categories/GetAllCategory`
        const response = await fetch(batoolURL)
        const data = await response.json()
        debugger
        var batool = document.getElementById('categories');
        data.$values.forEach(element => {
            batool.innerHTML += `<option value="${element.categoryId}"> ${element.categoryName}</option>
            
            `
    
        });
    }
categoryVendor();

async function vendorRegister() {
    debugger;
    const vwndorURL = 'https://localhost:44397/api/Vendor';
    let categoryId = document.getElementById('categories').value;
    var form = document.getElementById("registrationForm");
    var fromSwagger = new FormData (form);
    var response = await fetch(vwndorURL, {
        method: 'POST',
        body: fromSwagger,
    });

    alert("تم تقديم الطلب بنجاح سيتم التواصل معك في اقرب فرصة ");
    window.location.href = "index.html";
}
    