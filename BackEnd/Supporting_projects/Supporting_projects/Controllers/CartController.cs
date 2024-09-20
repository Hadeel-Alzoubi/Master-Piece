using E_Commerce_Clothes.DTO;
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
                        ImageUrl = x.Product.ImageUrl,
                    }
                }



                );
            return Ok(cartItem);
        }

        [HttpGet("GetCartByUserID")]
        public IActionResult GetCartById(int id)
        {

            var getCart = _db.CartItems.Where(x => x.Cart.UserId == id).Select(
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
                      ImageUrl = x.Product.ImageUrl,
                  }
              }).ToList();
            
            return Ok(getCart);
        }


        [HttpPost("changeQuantity")]
        public IActionResult changeQuantity([FromBody] QuantityDTO update)
        {
            var item = _db.CartItems.Find(update.CartItemId);

            if (update.Quantity == 0)
            {
                _db.Remove(item);
                _db.SaveChanges(true);
                return Ok("item was deleted");
            }

            item.Quantity = update.Quantity;
            _db.SaveChanges();
            return Ok();
        }



        [HttpPost]
        public IActionResult addCartItem([FromBody] addCartItemRequestDTO cart , int id)
        {
            // Retrieve the user's Cart based on the UserId from the request or session.
            //var userId = cart.UserId; // Ensure UserId is part of the DTO.

            var existingCart = _db.Carts.FirstOrDefault(c => c.UserId == id);

            // If the cart doesn't exist, create a new one for the user.
            if (existingCart == null)
            {
                existingCart = new Cart
                {
                    UserId = id,
                    CreatedAt = DateTime.Now,
                    // Add other necessary properties for the Cart entity.
                };

                _db.Carts.Add(existingCart);
                _db.SaveChanges(); // Save so that the CartId gets generated.
            }

            var newproduct = _db.CartItems.FirstOrDefault(x => x.ProductId == cart.ProductId);
            // Add the item to the existing or newly created cart.
            if (newproduct == null)
            {
                var data = new CartItem
                {
                    CartId = existingCart.CartId,  // Use the CartId from the retrieved or newly created cart
                    Quantity = (cart.Quantity == null || cart.Quantity == 0) ? 1 : cart.Quantity,
                    ProductId = cart.ProductId,
                };

                _db.CartItems.Add(data);
                _db.SaveChanges();
                return Ok("Product Add To Cart");

            }
            else
            {
                newproduct.Quantity += cart.Quantity;

                _db.CartItems.Update(newproduct);
                _db.SaveChanges();
                return Ok("Product Updated");
            }
        }


        //[HttpPut("{id}")]
        //public IActionResult updateProduct(int id, [FromBody] cartDTO cart)
        //{
        //    var c = _db.CartItems.FirstOrDefault(p => p.CartItemId == id);

        //    c.Quantity = cart.Quantity;
        //    var u = _db.CartItems.Update(c);

        //    _db.SaveChanges();
        //    return Ok(u);
        //}

        [Route("DeleteItem/{id}")]
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            if (id < 1)
            {
                return BadRequest("ID must be greater than 0");
            }

            var success = _db.CartItems.FirstOrDefault(p => p.Product.ProductId == id);
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
