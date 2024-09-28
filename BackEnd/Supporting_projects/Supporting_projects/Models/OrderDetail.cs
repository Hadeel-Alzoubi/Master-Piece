using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class OrderDetail
{
    public int OrderId { get; set; }

    public int? Quantity { get; set; }

    public int? OrderIdFk { get; set; }

    public int? ProductIdFk { get; set; }

    public int? UserIdFk { get; set; }

    public virtual Order? OrderIdFkNavigation { get; set; }

    public virtual Product? ProductIdFkNavigation { get; set; }

    public virtual User? UserIdFkNavigation { get; set; }
}
