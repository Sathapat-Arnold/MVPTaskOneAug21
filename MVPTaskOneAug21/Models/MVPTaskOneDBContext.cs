using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVPTaskOneAug21.Models
{
    public class MVPTaskOneDBContext : DbContext
    {
        public MVPTaskOneDBContext(DbContextOptions<MVPTaskOneDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Store> Store { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Sales> Sales { get; set; }
    }
}
