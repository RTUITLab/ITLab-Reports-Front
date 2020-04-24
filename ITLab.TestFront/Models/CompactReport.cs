using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models
{
    public class CompactReport
    {
        public string Id { get; set; }
        public Guid ReportSender { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
        public bool Archived { get; set; }
    }
}
