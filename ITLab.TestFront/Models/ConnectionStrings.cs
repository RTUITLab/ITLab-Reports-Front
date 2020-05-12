using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models
{
    public class ConnectionStrings
    {
        public string Token { get; set; }
        public string BaseAddress { get; set; }
        public string FileServerBase { get; set; }
        public Guid UserId { get; set; }
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
