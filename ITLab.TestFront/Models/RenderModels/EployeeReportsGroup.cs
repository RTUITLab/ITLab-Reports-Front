using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models.RenderModels
{
    public class EployeeReportsGroup
    {
        public string ReportSenderName => Employee.Status switch
        {
            LazyValueStatus.Loading => "Загрузка...",
            LazyValueStatus.Error | LazyValueStatus.NoData => EmployeeId.ToString(),
            LazyValueStatus.Loaded => $"{Employee.Value.LastName} {Employee.Value.FirstName} {Employee.Value.MiddleName}",
            _ => "Некорректное состояние",
        };
        public Guid EmployeeId { get; set; }
        public LazyValue<UserModel> Employee { get; set; }
        public List<ReportAndCompaceSalary> Reports { get; set; }

        public class ReportAndCompaceSalary
        {
            public string Date => $"{Report.Date.Year}.{Report.Date.Month:D2}.{Report.Date.Day:D2}";
            public CompactReport Report { get; set; }
            public LazyValue<ReportSalaryCompact> Salary { get; set; }
            public UpdateSalaryRequest UpdateSalaryInfo { get; set; } = new UpdateSalaryRequest();
        }
    }
}
