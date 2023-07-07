using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace PS.DAL.Database.Entities
{
    public class Car
    {
        [Key]
        public Guid InternalID { get; set; }

        public Guid Customer_InternalID { get; set; } /*Related to Customer*/

        [Required, StringLength(15)] 
        public string PlateNo { get; set; }

        [Required, StringLength(4)]  
        public string YearModel { get; set; }

        [Required, StringLength(50)] 
        public string Color { get; set; }

        [Required, StringLength(50)] 
        public string Type { get; set; }

        [Required, StringLength(50)] 
        public string Make { get; set; }

        [Range(0, 3)]
        public int Status { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
