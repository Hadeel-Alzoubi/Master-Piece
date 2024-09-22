using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class CustomRequest
{
    public int RequestId { get; set; }

    public int? UserId { get; set; }

    public string ProductDescription { get; set; } = null!;

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Img { get; set; }

    public virtual User? User { get; set; }
}
