using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class SalesStatistic
{
    public int StatId { get; set; }

    public int? AdminId { get; set; }

    public DateOnly? Date { get; set; }

    public decimal? TotalSales { get; set; }

    public string? Period { get; set; }

    public virtual User? Admin { get; set; }
}
