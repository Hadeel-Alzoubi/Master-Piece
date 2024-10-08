﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomOrderController : ControllerBase
    {
        private readonly MyDbContext _db;
        public CustomOrderController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllCustomOrder")]
        public IActionResult GetAllCustomOrder()
        {
            var custom = _db.CustomRequests.ToList();
            return Ok(custom);
        }




        [HttpGet("GetCustomOrder")]
        public IActionResult GetCustomOrder(int id, int categoryId) // Adding categoryId as a parameter
        {
            var user = _db.CustomRequests
                .Where(x => x.UserId == id && x.CategoryId == categoryId) // Filter by UserId and CategoryId
                .Select(c => new CustomOrderDTO
                {
                    ProductDescription = c.ProductDescription,
                    Status = c.Status,
                    Img = c.Img,
                    User = new UserDTO
                    {
                        UserName = c.User.UserName,
                        Email = c.User.Email,
                        Phone = c.User.Phone,
                        Address = c.User.Address,
                    }
                }).ToList(); // Ensure to materialize the query

            return Ok(user);
        }


        //[HttpGet("GetCustomOrder")]
        //public IActionResult GetCustomOrder(int id)
        //{
        //    // لازم اضيف عليها هاي لاي كاتيغوري لحتى تظهر عند الادمن بس الي بخصهم هاد الكاتيغوري 

        //    var user = _db.CustomRequests.Where(x => x.UserId == id).Select(
        //        c => new CustomOrderDTO
        //        {
        //            //RequestId = c.RequestId,
        //            ProductDescription = c.ProductDescription,
        //            Status  = c.Status,
        //            User = new UserDTO
        //            {
        //                UserName = c.User.UserName,
        //                Email = c.User.Email,
        //                Phone = c.User.Phone,
        //                Address = c.User.Address,

        //            }

        //        });

        //    return Ok(user);
        //}


        [HttpPost("OrderCustomPiece/{id}")]
        public IActionResult SetOrder(int id, [FromForm] OrederCustomDTO order)
        {

            var user = _db.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null)
            {
                return BadRequest();
            }
            var data = new CustomRequest
            {
                CategoryId = order.CategoryId,
                ProductDescription = order.ProductDescription,
                Img = order.Img.FileName,
            };

            var uploadImageFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadImageFolder))
            {
                Directory.CreateDirectory(uploadImageFolder);
            }
            var imageFile = Path.Combine(uploadImageFolder, order.Img.FileName);
            using (var stream = new FileStream(imageFile, FileMode.Create))
            {
                order.Img.CopyToAsync(stream);
            }


            _db.CustomRequests.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }
    }
}
