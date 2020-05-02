using ITLab.TestFront.Models;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.RemoteApi
{
    [Headers("Authorization: Bearer")]
    public interface IFilesApi
    {
        [Get("/files")]
        Task<List<FileObjectModel>> FilesList(string user);
    }
}
