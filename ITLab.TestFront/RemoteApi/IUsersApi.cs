using ITLab.TestFront.Models;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.RemoteApi
{
    [Headers("Authorization: Bearer")]
    public interface IUsersApi
    {
        [Get("/api/user?count=1000")]
        Task<List<UserModel>> GetUsersInfo();
        [Get("/api/user/{userId}")]
        Task<UserModel> GetUserInfo(Guid userId);
    }
}
