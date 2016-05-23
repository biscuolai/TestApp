﻿using DLGP_SVDK.Model.Repositories;
using DLGP_SVDK.Model.Domain.Entities;
using System.Collections.Generic;

namespace DLGP_SVDK.Repository
{
    public interface ITicketStatusRepository : IRepository<TicketStatus>
    {
        IEnumerable<TicketStatus> GetTicketStatusList();
    }
}