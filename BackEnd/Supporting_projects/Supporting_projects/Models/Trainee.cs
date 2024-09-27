using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class Trainee
{
    public int TraineeId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public int? Course { get; set; }

    public bool? Status { get; set; }
}
