﻿using PS.Common.Utilities;
using System.ComponentModel.DataAnnotations;

namespace PS.BAL.Models
{
    public class CarDTO
    {
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

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public string? CustomerName { get; set; }
        public string StatusDescription
        {
            get { return Parser.ParseStatus(Status); }
        }
        public string? CreatedByName { get; set; }
        public string? ModifiedByName { get; set; }
    }
}