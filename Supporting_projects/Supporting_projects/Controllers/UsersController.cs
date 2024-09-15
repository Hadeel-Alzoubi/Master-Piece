using E_Commerce_Clothes.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Supporting_projects.DTOs;
using Supporting_projects.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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


        //LogIn
        [Route("UserByEmailUser")]
        [HttpPost]
        public IActionResult GetUser([FromForm] UserResponseDto user)
        {
            // Validate that email and password are not null
            if (user.Email == null || user.Password == null)
            {
                return BadRequest("Email and Password cannot be null.");
            }

            // Retrieve the user from the database using the provided email
            var u = db.Users.SingleOrDefault(use => use.Email == user.Email);

            if (u == null)
            {
                return NotFound("User not found.");
            }
            //// Check if the provided password matches the stored password
            //// Note: In a real application, ensure passwords are hashed and compared securely
            if (user.Password == u.Password)
            {
                var cart = db.Carts.SingleOrDefault(c => c.UserId == u.UserId);

                if (cart == null)
                {
                    cart = new Cart
                    {
                        UserId = u.UserId,
                    };
                    db.Carts.Add(cart);
                    db.SaveChanges();

                }
                return Ok("Login successful. Welcome!");
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
           
            var user = db.Users.SingleOrDefault(u => u.Email == userDTO.Email);
            if (user != null)
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
