﻿using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class CartItem
{
    public int CartItemId { get; set; }

    public int? CartId { get; set; }

    public int? ProductId { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public string? ImageUrl { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual Product? Product { get; set; }
}
