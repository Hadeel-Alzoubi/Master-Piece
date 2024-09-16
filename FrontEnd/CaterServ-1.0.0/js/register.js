
async function login(email, password) {
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  debugger
  const loginUrl = 'https://localhost:7084/api/Users/UserByEmailUser'
  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      Email: email,
      Password: password 
    })
  });
  
}



async function register() {
  const url = 'https://localhost:44397/api/Users/Register';

  event.preventDefault();
    var form = document.getElementById("registrationForm");
    var fromSwagger = new FormData(form);
  var response = await fetch(url ,
    {
        method: 'POST',
        body : fromSwagger,
    }
  )  
}


/*   For Udate Profile*/
window.onload = async function() {
  let n = Number(localStorage.getItem("userId"));
  const GetUsertURL = `https://localhost:44397/api/Users/EditUser?id=${n}`;
  
  // Fetch the user data
  let response = await fetch(GetUsertURL);
  let user = await response.json();

  document.getElementById("user-name").value = user.UserName ;
  document.getElementById("user-Email").value = user.Email ;
  document.getElementById("user-Phone").value = user.Phone ;
  document.getElementById("user-PasswordHash").value = user.PasswordHash;
  document.getElementById("user-Address").value = user.Address;
 
}

async function UpdateProfile() {
  /*هون السبب انو الكود مش عارف مين هاد اليوزر ف لازم اصلا في تسجيل دخول لحتى يكون في سشن لليوزر */
  var form = document.getElementById("formUser");
  var fromSwagger = new FormData(form);
  event.preventDefault();
  
  let response = await fetch(GetUsertURL,
  {
      method: 'PUT',
      body: fromSwagger,
  });

  if (response.ok) {
      alert("تم التعديل على المعلومات بنجاح");
      window.location = "AdminDashBoard.html";
  } else {
      alert("حدث خطأ أثناء تعديل المعلومات.");
  }
}

