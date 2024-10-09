using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        MyDbContext _db;
        public ProductsController(MyDbContext db)
        {
            _db = db;
        }

        [Route("GetAllProduct")]
        [HttpGet]
        public IActionResult GetAllProduct()
        {
            var product = _db.Products.ToList();
            return Ok(product);
        }

        [HttpGet("GetProductById")]
        public IActionResult GetProductById(int id)
        {
            var products = _db.Products.FirstOrDefault(p => p.ProductId == id);
            return Ok(products);

        }

        [Route("GetProductByCategoryId")]
        [HttpGet]
        public IActionResult GetProductByCategoryId(int id)
        {
            //var product = _db.Products.Where(p => p.ProductId == id).ToList();

            var product = _db.Products.Where(p => p.Category.CategoryId == id).Select(p => new
            {
                p.ProductId,
                p.ProductName,
                p.Price,
                p.Description,
                p.ImageUrl,
                Category = new
                {
                    p.Category.CategoryId,
                    p.Category.CategoryName
                }

            }).ToList();
            return Ok(product);
        }

        // Sort Product

        [Route("SortProductByPriceAsc")]
        [HttpGet]
        public IActionResult OrderProductA(int id)
        {
            // the id to sort the category Product

            var product = _db.Products.OrderBy(p => p.Price).Where(x => x.CategoryId == id).Select(p => new
            {
                p.ProductId,
                p.ProductName,
                p.Price,
                p.Description,
                p.ImageUrl,
                Category = new
                {
                    p.Category.CategoryId,
                    p.Category.CategoryName
                }
            });
            return Ok(product);

        }

        [Route("SortProductByPriceDescending")]
        [HttpGet]
        public IActionResult OrderProductD(int id)
        {
            var product = _db.Products.OrderByDescending(p => p.Price).Where(x => x.CategoryId == id).Select(p => new
            {
                p.ProductId,
                p.ProductName,
                p.Price,
                p.Description,
                p.ImageUrl,
                Category = new
                {
                    p.Category.CategoryId,
                    p.Category.CategoryName
                }
            });
            return Ok(product);
        }



        [Route("AddProductByCategoryID")]
        [HttpPost]

        // the id here is for userID
        public IActionResult AddProduct(int id, [FromForm] ProductRequestDTO productDTO)
        {

            var uploadImageFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadImageFolder))
            {
                Directory.CreateDirectory(uploadImageFolder);
            }
            var imageFile = Path.Combine(uploadImageFolder, productDTO.ImageUrl.FileName);
            //using (var stream = new FileStream(imageFile, FileMode.Create))
            //{
            //    productDTO.ImageUrl.CopyToAsync(stream);
            //}



            var data = new Product
            {
                AdminProduct = productDTO.AdminProduct,
                ProductName = productDTO.ProductName,
                Price = productDTO.Price,
                Description = productDTO.Description,
                ImageUrl = productDTO.ImageUrl.FileName,
                CategoryId = productDTO.CategoryId,
                StockQuantity = productDTO.StockQuantity,
            };

            _db.Products.Add(data);
            _db.SaveChanges();
            return Ok();
        }

        [Route("EditProduct")]
        [HttpPut]
        public IActionResult EditProduct(int id, [FromForm] ProductRequestDTO productDTO)
        {
            var productId = _db.Products.FirstOrDefault(p => p.ProductId == id);
            var uploadImageFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadImageFolder))
            {
                Directory.CreateDirectory(uploadImageFolder);
            }
            var imageFile = Path.Combine(uploadImageFolder, productDTO.ImageUrl.FileName);
            using (var stream = new FileStream(imageFile, FileMode.Create))
            {
                productDTO.ImageUrl.CopyToAsync(stream);
            }

            productId.ImageUrl = productDTO.ImageUrl.FileName;
            productId.ProductName = productDTO.ProductName;
            productId.Price = productDTO.Price;
            productId.Description = productDTO.Description;
            productId.StockQuantity = productDTO.StockQuantity;
            productId.CategoryId = productDTO.CategoryId;

            _db.SaveChanges();
            return Ok(productDTO);
        }


        [Route("DeleteProduct")]
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            // Find the product by its ID in the database
            var product = _db.Products.FirstOrDefault(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            _db.Products.Remove(product);
            _db.SaveChanges();

            return Ok("Product deleted successfully.");
        }



        //**********************************************************

        [HttpGet("GetProductByAdminId")]
        public IActionResult GetProductByAdminId(int id)
        {
            //var admincategory = _db.Users.Where(x => x.UserId == id);
            var adminProduct = _db.Products.Where(x => x.AdminProduct == id).ToList();
            if (adminProduct == null)
            {
                return BadRequest();
            }
            return Ok(adminProduct);
        }

        [HttpGet("sortbycategoryID")]
        public IActionResult sortbycategoryID(int id)
        {
            var category = _db.Products.Where(x => x.CategoryId == id).ToList();
            return Ok(category);
        }

        //[HttpDelete("AdminProductDelete")]
        //public IActionResult DeleteAdminProduct(int id) {

        //    var productid = _db.Products.Where(x => x.ProductId == id);
        //    if (productid == null)
        //    {
        //        return NotFound();
        //    }
        //    _db.Products.Remove(productid);
        //    return Ok();
        //}
    }
}
