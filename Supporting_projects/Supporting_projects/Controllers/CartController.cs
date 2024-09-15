using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CartController(MyDbContext db)
        {
            _db = db;
        }




        [HttpGet("getUserCartItems/{UserId}")]
        public IActionResult getUserCartItems(int UserId)
        {

            var user = _db.Carts.FirstOrDefault(x => x.UserId == UserId);

            var cartItem = _db.CartItems.Where(c => c.CartId == user.CartId).Select(
             x => new cartItemDTO
             {
                 CartItemId = x.CartItemId,
                 CartId = x.CartId,
                 Product = new productDTO
                 {
                     ProductId = x.Product.ProductId,
                     ProductName = x.Product.ProductName,
                     Price = x.Product.Price,
                     ImageUrl = x.Product.ImageUrl,
                 },
                 Quantity = x.Quantity,
             });



            return Ok(cartItem);
        }



        [HttpPost("AddCartItem/{UserId}")]
        public IActionResult AddCartItem([FromBody] cartItemDTO newItem, int UserId)
        {
            // Check if the user has a cart
            var user = _db.Carts.FirstOrDefault(x => x.UserId == UserId);

            if (user == null)
            {
                return NotFound("Cart not found for this user.");
            }

            // Check if the product is already in the user's cart
            var checkSelectedProduct = _db.CartItems.FirstOrDefault(x => x.ProductId == newItem.Product.ProductId && x.CartId == user.CartId);

            if (checkSelectedProduct == null)
            {
                // Add new product to cart
                var data = new CartItem
                {
                    CartId = user.CartId,
                    ProductId = newItem.Product.ProductId,
                    Quantity = newItem.Quantity,
                };

                _db.CartItems.Add(data);
                _db.SaveChanges();
                return Ok("Product added to cart");
            }
            else
            {
                // Update the quantity of the existing product in the cart
                checkSelectedProduct.Quantity += newItem.Quantity;

                _db.CartItems.Update(checkSelectedProduct);
                _db.SaveChanges();
                return Ok("Quantity of product increased");
            }
        }




        //[Route("GetToCartItem")]
        //[HttpGet]
        //public IActionResult Get()
        //{


        //    var cartItem = _db.CartItems.Select(
        //        x => new cartItemDTO
        //        {
        //            CartItemId = x.CartItemId,
        //            CartId = x.CartId,
        //            Quantity = x.Quantity,

        //            Product = new productDTO
        //            {
        //                ProductId = x.Product.ProductId,
        //                ProductName = x.Product.ProductName,
        //                Price = x.Product.Price,
        //                ImageUrl = x.Product.ImageUrl


        //            }
        //        }



        //        );
        //    return Ok(cartItem);
        //}

        //[HttpPost]
        //public IActionResult addCartItem([FromBody] addCartItemDTO cart)
        //{
        //    var data = new CartItem
        //    {
        //        CartId = cart.CartId,
        //        Quantity = cart.Quantity,
        //        ProductId = cart.ProductId,

        //        Product = new productDTO
        //        {
        //            ProductId = cart.ProductId,
        //            ProductName = cart.Product.ProductName,

        //        }
        //    };
        //    _db.CartItems.Add(data);
        //    _db.SaveChanges();
        //    return Ok();
        //}


        [HttpPut("{id}")]
        public IActionResult updateProduct(int id, [FromBody] cartDTO cart)
        {
            var c = _db.CartItems.FirstOrDefault(p => p.CartItemId == id);

            c.Quantity = cart.Quantity;
            var u = _db.CartItems.Update(c);

            _db.SaveChanges();
            return Ok(u);
        }

        [Route("DeleteItem/{id}")]
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            if (id < 1)
            {
                return BadRequest("ID must be greater than 0");
            }

            var success = _db.CartItems.FirstOrDefault(p => p.CartItemId == id);
            if (success == null)
            {
                return NotFound();
            }

            _db.CartItems.Remove(success);
            _db.SaveChanges();
            return Ok();
        }

    }
}
