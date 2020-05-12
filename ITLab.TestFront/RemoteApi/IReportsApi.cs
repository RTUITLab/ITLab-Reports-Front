using ITLab.TestFront.Models;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.RemoteApi
{
    [Headers("Authorization: Bearer")]
    public interface IReportsApi
    {
        [Get("/api/reports?sorted_by=date")]
        Task<List<CompactReport>> GetAllReports();

        [Get("/api/reports/employee/{userId}")]
        Task<List<CompactReport>> GetReportsForUser(Guid userId, string dateBegin, string dateEnd);

        [Post("/api/reports")]
        Task CreateReport([Body] CreateReportRequest reportRequest, Guid implementer);

        [Delete("/api/reports/{id}")]
        Task DeleteReport(string id);
    }
}
