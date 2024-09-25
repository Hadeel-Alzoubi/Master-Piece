using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supporting_projects.DTOs;
using Supporting_projects.Models;
using DinkToPdf;
using DinkToPdf.Contracts;
using System;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Supporting_projects.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IConverter _converter;

        public OrderController(MyDbContext db, IConverter converter)
        {
            _db = db;
            _converter = converter;
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
            var order = _db.Orders.Where(x => x.UserId == id).Select(
                x => new OrderUserDTO
                {
                    OrderId = x.OrderId,
                    OrderDate = x.OrderDate,
                    TotalAmount = x.TotalAmount,
                    Status = x.Status,
                });
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        
     
            //[HttpPost("CreateOrder")]
            //public async Task<IActionResult> CreateOrder([FromBody] OrdersDTO orderDto)
            //{
            //    if (orderDto == null || orderDto.OrderDetails.Count == 0)
            //    {
            //        return BadRequest("Invalid order data.");
            //    }

            //    // إنشاء طلب جديد
            //    var order = new Order
            //    {
            //        OrderDate = DateTime.UtcNow,
            //        Status = "Pending", // حالة الطلب
            //        Quantity = orderDto.Quantity,
            //        TotalAmount = (double)orderDto.TotalAmount,
            //        UserId = orderDto.UserId
            //    };

            //    // إضافة الطلب إلى قاعدة البيانات
            //    await _db.Orders.AddAsync(order);
            //    await _db.SaveChangesAsync();


            //// إضافة تفاصيل الطلب
            //foreach (var detail in orderDto.OrderDetails)
            //    {
            //    var product = await _db.Products.FindAsync(detail.ProductId);

            //    if (product == null)
            //    {
            //        return NotFound($"Product with ID {detail.ProductId} not found.");
            //    }

            //    var orderDetail = new OrderDetail
            //        {
            //            OrderIdFk = order.OrderId,
            //            Quantity = detail.Quantity,
            //            UserIdFk = orderDto.UserId,
            //            ProductIdFk = detail.ProductId,
            //            TotalAmount = Convert.ToDouble(detail.Quantity * product.Price),
            //        };

            //        await _db.OrderDetails.AddAsync(orderDetail);
            //    }

            //    await _db.SaveChangesAsync();
            //    return Ok("Order created successfully.");
            //}
  


        //[HttpPost("SetOrderByUserID")]
        //public IActionResult SetOrder(int id, [FromForm] OrderDetailsDTO order)
        //{
        //    // Find user by UserId
        //    var user = _db.Users.FirstOrDefault(x => x.UserId == id);
        //    if (user == null)
        //    {
        //        return NotFound("User not found"); // User not found
        //    }

        //    // Check if the product exists
        //    var product = _db.Products.FirstOrDefault(p => p.ProductId == order.product.ProductId);
        //    if (product == null)
        //    {
        //        return NotFound("Product not found"); // Product not found
        //    }

        //    // Prepare data to add to OrderDetail
        //    var orderDetail = new OrderDetail
        //    {
        //        ProductIdFk = product.ProductId, // ensure ProductId is set correctly
        //        Quantity = order.Quantity,
        //        UserIdFk = user.UserId // use UserId as FK (foreign key)
        //                               // Add other fields like TotalAmount and OrderIdFk if necessary
        //    };
        //    _db.OrderDetails.Add(orderDetail); // Add order to Orders table
        //    _db.SaveChanges(); // Save changes to database
        //    // Calculate total amount
        //    decimal totalAmount = product.Price * order.Quantity;

        //    // Create new order
        //    var newOrder = new Order
        //    {
        //        // Here you may want to set additional fields such as UserIdFk, OrderDate, etc.
        //        TotalAmount = (double)totalAmount,
        //        OrderDetails = new List<OrderDetail> { orderDetail } // assuming Order has a collection of OrderDetails
        //    };

        //    // Add the new order to the database
        //    _db.Orders.Add(newOrder); // Add order to Orders table
        //    _db.SaveChanges(); // Save changes to database

        //    return Ok("Order details added successfully");
        //}









        [HttpGet("GenerateInvoice")]
        public IActionResult GenerateInvoice(int orderId)
        {
            var orderdetails = _db.OrderDetails
                .Where(oi => oi.OrderId == orderId)
                //.Include(oi => oi.Product)
                .ToList();

            var pdfDocument = new HtmlToPdfDocument
            {
                GlobalSettings = {
                 DocumentTitle = $"Invoice for Order {orderId}",
                 PaperSize = PaperKind.A4,
                 Orientation = Orientation.Portrait
             },
                Objects = {
                 new ObjectSettings
                 {
                     HtmlContent = GenerateInvoiceHtml(orderdetails),
                     WebSettings = { DefaultEncoding = "utf-8" }
                 }
             }
            };

            var pdf = _converter.Convert(pdfDocument);

            return File(pdf, "application/pdf", $"invoice{orderId}.pdf");
        }


        private string GenerateInvoiceHtml(List<OrderDetail> orderItems)
        {
            var html = @"
    <html>
    <head>
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet'>
        <style>
             body {
        font-family: 'Roboto', sans-serif;
        color: #333;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
    }
    .container {
        width: 80%;
        margin: auto;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
    .header {
        text-align: center;
        margin-bottom: 20px;
        color:#F53737;
    }
    .header h1 {
        margin: 0;
        font-size: 2.5em;
        font-weight: 700;
    }
    .header h2 {
        margin: 0;
        font-size: 1.5em;
        font-weight: 400;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: center;
    }
    th {
        background-color: #e0e0e0; /* Changed to gray */
        color: #333;
        font-weight: 700;
        text-transform: capitalize;
    }
    td {
        padding: 15px;
    }
    .view-link {
        color: red; /* Red color for download link */
        font-weight: bold;
        text-decoration: none;
    }
    .view-link:hover {
        text-decoration: underline;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 1.2em;
        color: #F53737;
    }
    .total {
        font-weight: 700;
    }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>أنامل</h1>
                
            </div>
            <table>
                <thead>
                    <tr>
                        <th>رقم الطلب</th>
                        <th>رقم المنتج</th>
                        <th>الكمية</th>
                        <th>السعر</th>
                        
                    </tr>
                </thead>
                <tbody>";

            foreach (var item in orderItems)
            {
                var OrderNumber = item.OrderId;
                var productID = item.ProductIdFk;
                var quantity = item.Quantity;
                var Price = item.TotalAmount;

                html += $@"
                    <tr>
                        <td>{OrderNumber}</td>
                        <td>{productID}</td>
                        <td>{quantity}</td>
                        <td>دينار{Price:F2}</td>
                    </tr>";
            }

            var totalAmount = orderItems.Sum(oi => oi.TotalAmount * oi.Quantity);

            html += $@"
                </tbody>
                    </table>
                    <div class='footer'>
                        <p class='total'>المجموع كامل : {totalAmount:F2}</p>
                    </div>
                        </div>
                </body>
                </html>";

            return html;
        }

    }
}

