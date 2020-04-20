using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models
{
    public class ConnectionStrings
    {
        public string BaseAddress { get; set; }
        public Uri ReportsList
        {
            get
            {
                var builder = new UriBuilder(BaseAddress)
                {
                    Path = "/api/reports",
                    Query = "?sorted_by=date"
                };
                return builder.Uri;
            }
        }
        public Uri CreateReport
        {
            get
            {
                var builder = new UriBuilder(BaseAddress)
                {
                    Path = "/api/reports"
                };
                return builder.Uri;
            }
        }
        public Uri UserInfo(Guid userId)
        {
            var builder = new UriBuilder(BaseAddress)
            {
                Path = $"/api/user/{userId}"
            };
            return builder.Uri;
        }

        public string FileServerBase { get; set; }

        public Uri FilesList
        {
            get
            {
                var builder = new UriBuilder(FileServerBase)
                {
                    Path = "/files"
                };
                return builder.Uri;
            }
        }

        public Uri UploadFile
        {
            get
            {
                var builder = new UriBuilder(FileServerBase)
                {
                    Path = "/files/upload"
                };
                return builder.Uri;
            }
        }
        public Uri DownloadFile(string fileId)
        {
            var builder = new UriBuilder(FileServerBase)
            {
                Path = $"/download/{fileId}"
            };
            return builder.Uri;
        }
    }
}
