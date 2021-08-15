using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVPTaskOneAug21.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        
        [Required]
        public float Price { get; set; }

        public virtual ICollection<Sales> ProductSold { get; set; }
    }
}
