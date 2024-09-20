using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class ProductImg
{
    public int? ProductId { get; set; }

    public string? Img { get; set; }

    public virtual Product? Product { get; set; }
}
