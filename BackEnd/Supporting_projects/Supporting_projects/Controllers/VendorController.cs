using E_Commerce_Clothes.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto.Prng;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly MyDbContext _db;
        public VendorController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult getVendorOrder()
        {
            var vendor = _db.VendorForms.ToList();

            return Ok(vendor);
        }

        [HttpPost]
        public IActionResult setVendor([FromForm] VendorDTO vendor)
        {
            if (vendor.Email == null && vendor.VendorName == null && vendor.Address == null && vendor.Phone == null && vendor.Category == null)
            {
                return BadRequest("الرجاء تعبئة النموذج كامل");
            }

            var data = new VendorForm
            {
                VendorName = vendor.VendorName,
                Address = vendor.Address,
                Phone = vendor.Phone,
                Category = vendor.Category,
                Email = vendor.Email,
            };

            _db.VendorForms.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }


        [HttpPost("approved")]
        public IActionResult approvedVendor([FromForm] VendorDTO vendor)
        {
            //byte[] Hash, Salt;

            var data = new User
            {
                Email = vendor.Email,
                UserName = vendor.VendorName,
                Phone = vendor.Phone,
                Address = vendor.Address,
                AdminCategory = vendor.Category,
                IsAdmin = true,
                Password = "123",

                // PasswordHash = Hash,
                //PasswordSalt = Salt,
            };

            _db.Users.Add(data);
            _db.SaveChanges();
            return Ok(vendor);
        }

        [HttpDelete]
        public IActionResult deleteVendor(int id)
        {
            var vendor = _db.VendorForms.Find(id);
            if (vendor == null)
            {
                return NotFound();
            }
            _db.VendorForms.Remove(vendor);
            _db.SaveChanges();
            return Ok();
        }
    }
}
