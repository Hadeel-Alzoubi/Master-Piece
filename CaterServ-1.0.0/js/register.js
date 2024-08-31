const url = 'https://localhost:44397/api/Users/Register';

async function register() {
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