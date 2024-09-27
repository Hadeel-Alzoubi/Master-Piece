using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class VendorForm
{
    public int Vendorid { get; set; }

    public string? VendorName { get; set; }

    public string? Email { get; set; }

    public int? Category { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }
}
