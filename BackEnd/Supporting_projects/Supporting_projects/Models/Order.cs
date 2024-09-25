using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? Status { get; set; }

    public int? Quantity { get; set; }

    public double? TotalAmount { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User? User { get; set; }
}
