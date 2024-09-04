using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [Route("GetToCartItem")]
        [HttpGet]
        public IActionResult Get()
        {
            var cartItem = _db.CartItems.Select(
                x => new cartItemResponseDTO
                {
                    CartItemId = x.CartItemId,
                    CartId = x.CartId,
                    Quantity = x.Quantity,
                    Product = new productDTO
                    {
                        ProductId = x.Product.ProductId,
                        ProductName = x.Product.ProductName,
                        Price = x.Product.Price,
                    }
                }



                );
            return Ok(cartItem);
        }

        [HttpPost]
        public IActionResult addCartItem([FromBody] addCartItemRequestDTO cart)
        {
            var data = new CartItem
            {
                CartId = cart.CartId,
                Quantity = cart.Quantity,
                ProductId = cart.ProductId,
            };
            _db.CartItems.Add(data);
            _db.SaveChanges();
            return Ok();
        }


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
