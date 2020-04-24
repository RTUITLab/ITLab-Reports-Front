using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITLab.TestFront.Models.RenderModels
{
    public struct LazyValue<T>
    {
        public LazyValueStatus Status;
        public T Value;
        public string errorDescription;
        public LazyValue<T> Loaded(T value) => new LazyValue<T>
        {
            Status = LazyValueStatus.Loaded,
            Value = value
        };
        public LazyValue<T> NoData() => new LazyValue<T>
        {
            Status = LazyValueStatus.NoData
        };
        public LazyValue<T> Error(string errorDescription = null) => new LazyValue<T>
        {
            Status = LazyValueStatus.Error,
            errorDescription = errorDescription
        };
        public LazyValue<T> Loading() => new LazyValue<T>
        {
            Status = LazyValueStatus.Loading,
        };
    }

    public enum LazyValueStatus
    {
        Loading = 0b_0000,
        Error = 0b_0001,
        NoData = 0b_0010,
        Loaded = 0b_0100
    }
}
