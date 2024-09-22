// const urlCategory = 'https://localhost:44397/api/Categories/GetAllCategory';
// async function GetCategory() {
// debugger;
//     let response = await fetch(urlCategory);
//     let data = await response.json();
//     let x = document.getElementById("Category_DB");

//     data.forEach(element => {
//         x.innerHTML +=
//         ` <div class="col-md-6 col-lg-4 wow bounceInUp" data-wow-delay="0.1s">
//                     <div class="blog-item">
//                         <div class="overflow-hidden rounded">
//                            <img src="img/${element.categoryImg}" class="img-fluid w-100" alt="">
//                         </div>
//                         <div class="blog-content mx-4 d-flex rounded bg-light">
//                             <div class="text-dark bg-primary rounded-start">
//                                 <div class="h-100 p-3 d-flex flex-column justify-content-center text-center">
//                                     <p class="fw-bold mb-0">${element.categoryName}</p>
//                                 </div>
//                             </div>
                            
//                             <a href="#" class="h5 lh-base my-auto h-100 p-3" onclick="store(${element.categoryId})">اكتشف المنتجات </a>
//                         </div>
//                     </div>
//                 </div> `
// });

// };
// GetCategory();
const urlCategory = "https://localhost:44397/api/Categories/GetAllCategory";

async function GetCategory() {
    try {
        debugger;  // لإيقاف التنفيذ والتحقق من الأخطاء إذا لزم الأمر
        
        let response = await fetch(urlCategory);
      

        let data = await response.json();
        let x = document.getElementById("Category_DB");

        // الوصول إلى المصفوفة داخل $values
        if (data.$values && Array.isArray(data.$values)) {
            data.$values.forEach(element => {
                x.innerHTML += `
                <div class="col-md-6 col-lg-4 wow bounceInUp" data-wow-delay="0.1s">
                    <div class="blog-item">
                        <div class="overflow-hidden rounded">
                           <img src="img/${element.categoryImg}" class="img-fluid w-100" alt="${element.categoryName}">
                        </div>
                        <div class="blog-content mx-4 d-flex rounded bg-light">
                            <div class="text-dark bg-primary rounded-start">
                                <div class="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                    <p class="fw-bold mb-0">${element.categoryName}</p>
                                </div>
                            </div>
                            <a href="#" class="h5 lh-base my-auto h-100 p-3" onclick="store(${element.categoryId})">اكتشف المنتجات</a>
                        </div>
                    </div>
                </div>`;
            });
        } else {
            console.error("Data does not contain a valid array:", data);
        }

    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

// استدعاء الدالة لجلب البيانات
GetCategory();

function store(id) {
    localStorage.categoryId = id;
    window.location.href = "product.html"
    
}

