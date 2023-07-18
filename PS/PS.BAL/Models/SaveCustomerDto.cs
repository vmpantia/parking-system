using System.ComponentModel.DataAnnotations;

namespace PS.BAL.Models
{
    public class SaveCustomerDto
    {
        public Guid ID { get; set; }

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

        public IEnumerable<SaveCarDto>? Cars { get; set; }
    }
}
