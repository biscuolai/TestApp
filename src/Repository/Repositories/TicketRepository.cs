﻿using TestApp.Model.Domain.Entities;
using TestApp.Repository.Persistence;
using Microsoft.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace TestApp.Repository.Repositories
{
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        public TicketRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<Ticket> GetTopUrgentTickets(int count)
        {
            //return AppContext.Tickets.ToList();
            return AppContext.Tickets.OrderByDescending(c => c.Priority).Take(count).ToList();
        }

        public IEnumerable<Ticket> GetAllAssignedTickets(int pageIndex, int pageSize = 10)
        {
            return AppContext.Tickets
                .Include(c => c.Project)
                .OrderBy(c => c.AssignedTo)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public ApplicationDbContext AppContext
        {
            get { return Context as ApplicationDbContext; }
        }
    }
}
