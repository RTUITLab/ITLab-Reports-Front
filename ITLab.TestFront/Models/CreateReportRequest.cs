using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models
{
    public class CreateReportRequest
    {
        [Required]
        public string Text { get; set; }
    }
}
