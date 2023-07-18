namespace PS.BAL.Models
{
    public class CustomerDTO
    {
        public Guid ID { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedByName { get; set; }
        public string ModifiedDate { get; set; }
        public string ModifiedByName { get; set; }
        public IEnumerable<CarDTO>? Cars { get; set; }
    }
}
