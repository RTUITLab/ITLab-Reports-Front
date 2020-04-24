using ITLab.TestFront.Models;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.RemoteApi
{
    [Headers("Authorization: Bearer")]
    interface ISalaryApi
    {
        [Get("/api/salary/v1/report/user/{userId}")]
        Task<List<ReportSalaryCompact>> GetUsersReportsSalary(string userId);

        [Put("/api/salary/v1/report/{reportId}")]
        Task<ReportSalaryCompact> UpdateUsersReportsSalary(string reportId, [Body]UpdateSalaryRequest request);
    }
}
