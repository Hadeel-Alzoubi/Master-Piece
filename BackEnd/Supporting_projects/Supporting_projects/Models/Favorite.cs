﻿using System;
using System.Collections.Generic;

namespace Supporting_projects.Models;

public partial class Favorite
{
    public int FavoriteId { get; set; }

    public int? UserId { get; set; }

    public int? ProductId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? User { get; set; }
}
