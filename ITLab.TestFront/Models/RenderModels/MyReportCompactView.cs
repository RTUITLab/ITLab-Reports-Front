using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models.RenderModels
{
    public class MyReportCompactView
    {
        public CompactReport ReportInfo { get; set; }
        public LazyValue<ReportSalaryCompact> SalaryInfo { get; set; }
    }
}
