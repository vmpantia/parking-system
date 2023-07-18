using PS.Common.Utilities;
using System.ComponentModel.DataAnnotations;

namespace PS.BAL.Models
{
    public class CarDTO
    {
        public Guid InternalID { get; set; }
        public string CustomerFullName { get; set; }
        public string PlateNo { get; set; }
        public string YearModel { get; set; }
        public string Color { get; set; }
        public string Type { get; set; }
        public string Make { get; set; }
        public string Status { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedDate { get; set; }
        public string ModifiedByName { get; set; }
    }
}
