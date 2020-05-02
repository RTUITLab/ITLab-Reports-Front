using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models
{
    public class ReportSalaryCompact
    {
        public string PrettyDate => $"{Approved.Year}.{Approved.Month:D2}.{Approved.Day:D2}";
        public string ReportId { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public DateTime Approved { get; set; }
        public Guid ApproverId { get; set; }
    }
}
