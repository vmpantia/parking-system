using System.ComponentModel.DataAnnotations;

namespace PS.BAL.Models
{
    public class CustomerDTO
    {
        [Key]
        public Guid InternalID { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string? MiddleName { get; set; }

        [Required, StringLength(50)]
        public string LastName { get; set; }

        [Required, StringLength(10)]
        public string Gender { get; set; }

        [Required, StringLength(13)]
        public string ContactNo { get; set; }

        [Required, StringLength(50)]
        public string Email { get; set; }

        [Range(0, 3)]
        public int Status { get; set; }
        public string? StatusDescription { get; set; }

        public Guid CreatedBy { get; set; }
        public string? CreatedByName { get; set; }

        public DateTime CreatedDate { get; set; }

        public Guid ModifiedBy { get; set; }
        public string? ModifiedByName { get; set; }

        public DateTime ModifiedDate { get; set; }

        public IEnumerable<CarDTO>? Cars { get; set; } 
    }
}
