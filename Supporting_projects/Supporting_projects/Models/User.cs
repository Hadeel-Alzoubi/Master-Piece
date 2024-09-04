using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public bool? IsAdmin { get; set; }

    public bool? IsSupplier { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<CustomRequest> CustomRequests { get; set; } = new List<CustomRequest>();

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<SalesStatistic> SalesStatistics { get; set; } = new List<SalesStatistic>();
}
