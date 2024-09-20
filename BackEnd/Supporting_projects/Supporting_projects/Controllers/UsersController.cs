using E_Commerce_Clothes.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        MyDbContext db;

        public UsersController(MyDbContext _db)
        {
            db = _db;
        }

        [Route("GetAllUser")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var user = db.Users.ToList();
            return Ok(user);
        }


        [HttpGet("GetUserByID")]
        public IActionResult GetUserByID(int id)
        {
            // ابحث عن المستخدم بواسطة معرف المستخدم (UserId)
            var user = db.Users.FirstOrDefault(x => x.UserId == id);

            // إذا لم يتم العثور على المستخدم، قم بإرجاع رسالة خطأ
            if (user == null)
            {
                return NotFound("User not found");
            }

            // قم بإنشاء كائن CheckOutDTO واملأه بمعلومات المستخدم
            var data = new CheckOutDTO
            {
                Address = user.Address,
                UserName = user.UserName,
                Phone = user.Phone
            };

            // أعد البيانات التي تحتوي على معلومات المستخدم
            return Ok(data);
        }



        [Route("UserByEmailUser")]
        [HttpPost]
        public IActionResult GetUser([FromForm] UserResponseDto loginRequest)
        {
            // يشيك اذا في item في اللوكل ستورج و بعدها ياخدهم للكارت اي دي لهاد اليوزر 
            // Validate that email and password are not null
            if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Email and Password cannot be null.");
            }

            // Retrieve the user from the database using the provided email
            var user = db.Users.SingleOrDefault(u => u.Email == loginRequest.Email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the provided password matches the stored password
            if (user.Password == loginRequest.Password)
            {
                // بناءً على الدور نرسل الرد المناسب
                if (user.Email  == "hadeelsuperAdmin@Anamel.com")
                {
                    // بيانات السوبر أدمن
                    var superAdminData = new User
                    {
                        UserId = user.UserId,
                        UserName = user.UserName,
                        Email = user.Email,
                        IsAdmin = user.IsAdmin,

                        
                    };
                    return Ok(superAdminData);
                }
                else if (user.IsAdmin == true)
                {
                    // بيانات الأدمن
                    var adminData = new User
                    {
                        UserId = user.UserId,
                        UserName = user.UserName,
                        Email= user.Email,
                        IsAdmin = user.IsAdmin
                    };
                    return Ok(adminData);
                }
                else
                {
                    // بيانات المستخدم العادي
                    var userData = new User
                    {
                        // هل لازم يكون عندي كارت اي دي داخل تيبل اليوزر 
                        UserId = user.UserId,
                        UserName = user.UserName,
                        Email = user.Email,
                        IsAdmin = user.IsAdmin,
                        //Carts = user.Carts
                    };
                    // هون بدو يشيك على الكارت 
                    //يعبيها داتا
                    return Ok(userData);
                }
            }
            else
            {
                return Unauthorized("Incorrect password.");
            }
        }



        [Route("Register")]
        [HttpPost]
        public IActionResult Register([FromForm] UserRequestDTO userDTO)
        {
            //بدو يعمل كريت مبارشة لكارت اي دي 
          
            var u = db.Users.SingleOrDefault(u => u.Email == userDTO.Email);
            if (u != null)
            {
                return Ok("Go to Login");
            }


            if (userDTO.ConfirmPassword != null && userDTO.Password != userDTO.ConfirmPassword)
            {
                return BadRequest("Password and Confirm Password do not match.");
            }

            byte[] Hash, Salt;

            PasswordHashDTO.CreatePasswordHash(userDTO.Password, out Hash, out Salt);
            var data = new User
            {
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                Password = userDTO.Password,
                Phone = userDTO.Phone,
                Address = userDTO.Address,
                PasswordHash = Hash,
                PasswordSalt = Salt,
            };
            db.Users.Add(data);
            db.SaveChanges();

            //create cart for new user
            var createCart = new Cart
            {
                UserId = data.UserId,
            };
            db.Carts.Add(createCart);
            db.SaveChanges();
      
            return Ok();
        }


        [Route("EditUser")]
        [HttpPut]
        public IActionResult EditUser(int id, [FromForm] UserRequestDTO userDTO)
        {
            var UpdateUser = db.Users.FirstOrDefault(p => p.UserId == id);


            UpdateUser.UserName = userDTO.UserName;
            UpdateUser.Password = userDTO.Password;
            UpdateUser.Email = userDTO.Email;
            UpdateUser.Address = userDTO.Address;
            UpdateUser.Phone = userDTO.Phone;

            db.SaveChanges();
            return Ok(userDTO);
        }



        [Route("DeleteUser")]
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            // Find the product by its ID in the database
            var user = db.Users.FirstOrDefault(p => p.UserId == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Remove the product from the database
            db.Users.Remove(user);

            // Save changes to the database
            db.SaveChanges();

            return Ok("User deleted successfully.");
        }

    }
}
