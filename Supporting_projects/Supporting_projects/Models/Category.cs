using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? CategoryImg { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
