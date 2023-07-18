using System.ComponentModel.DataAnnotations;

namespace PS.BAL.Models
{
    public class SaveCarDto
    {
        public Guid ID { get; set; }
        public Guid CustomerID { get; set; }

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
    }
}
