using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supporting_projects.DTOs;
using Supporting_projects.Models;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _db;

        public OrderController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllOrder")]
        public IActionResult getAllOrder()
        {
            var order = _db.Orders.ToList();
            return Ok(order);
        }

        [HttpGet("getOrderByUserID")]
        public IActionResult getOrderByID(int id)
        {
            var order = _db.Orders.Where(x => x.UserId == id).ToList();
            return Ok(order);
        }

        [HttpPost("SetOrderByUserID")]
        public IActionResult SetOrder(int id, [FromForm] OrderDTO order)
        {
            var user = _db.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null)
            {
                return NotFound(user);
            }

            var data = new Order
            {
                UserId = order.UserId,
                TotalAmount = order.TotalAmount,
                PaymentMethod = order.PaymentMethod,
                Status = order.Status,
                ShippingAddress = order.ShippingAddress,
            };

            _db.Orders.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }



        [HttpPost("SetOrderDetails")]
        public IActionResult SetOrderDetails(int id )
        {
            var orderDetail = _db.Orders.FirstOrDefault(x => x.OrderId == id);
            if (orderDetail == null)
            {
                return NotFound(orderDetail);
            }

            var data = new OrderDetail
            {
                OrderId = orderDetail.OrderId,
                Quantity = Convert.ToInt32(orderDetail.Quantity),

                Product = new Product
                {
                    //ProductId = Convert.ToInt32(orderDetail.ProductId),
                    ProductName = _db.Products.Where(x => x.ProductId == orderDetail.ProductId).Select(x => x.ProductName).FirstOrDefault(),
                    Price = _db.Products.Where(x => x.ProductId == orderDetail.ProductId).Select(x => x.Price).FirstOrDefault(),



                }
                ,
                Price = _db.Products.Where(x => x.ProductId == orderDetail.ProductId).Select(x => x.Price).FirstOrDefault()
            };
            _db.OrderDetails.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }
    }
}
