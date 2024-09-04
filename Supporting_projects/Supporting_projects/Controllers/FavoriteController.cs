using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly MyDbContext _db;

        public FavoriteController(MyDbContext db)
        {
            _db = db;
        }

        [Route("GetToFavoritetItem")]
        [HttpGet]
        public IActionResult Get()
        {
            var favorite = _db.Favorites.Select(
                x => new FavoriteDTO
                {
                    FavoriteId = x.FavoriteId,
                    UserId = x.UserId,
                    Product = new productFDTO
                    {
                        ProductId = x.Product.ProductId,
                        ProductName = x.Product.ProductName,
                        Price = x.Product.Price,
                        ImageUrl = x.Product.ImageUrl,
                    }
                }



                );
            return Ok(favorite);
        }

        [HttpPost]
        public IActionResult addCartItem([FromBody] FavoriteDTO favorite)
        {
            var data = new Favorite
            {
                FavoriteId = favorite.FavoriteId,
                UserId = favorite.UserId,
                ProductId = favorite.Product.ProductId,
            };
            _db.Favorites.Add(data);
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

        [Route("DeleteFromFavorite/{id}")]
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
