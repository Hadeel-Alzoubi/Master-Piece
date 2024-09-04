using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class Admin
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? PasswordHash { get; set; }

    public string? Email { get; set; }

    public int? Phone { get; set; }

    public string? Address { get; set; }

    public bool? IsSupplier { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? IsAdmin { get; set; }
}
