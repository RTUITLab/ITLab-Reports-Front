using ITLab.TestFront.Models;
using ITLab.TestFront.RemoteApi;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Services
{
    public class UserInfoPool
    {
        private ConcurrentDictionary<Guid, UserModel> pool = new ConcurrentDictionary<Guid, UserModel>();
        private readonly IUsersApi usersApi;

        public UserInfoPool(IUsersApi usersApi)
        {
            this.usersApi = usersApi;
        }
        public void Fill(IEnumerable<UserModel> userModels)
        {
            foreach (var userModel in userModels)
            {
                pool.TryAdd(userModel.Id, userModel);
            }
        }
        public async Task<UserModel> GetUserInfo(Guid userId)
        {
            if (pool.TryGetValue(userId, out var model))
            {
                return model;
            }
            model = await usersApi.GetUserInfo(userId);
            pool.TryAdd(userId, model);
            Console.WriteLine($"REQUESTED {model.LastName}");
            return model;
        }
    }
}
