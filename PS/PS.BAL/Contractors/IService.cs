using PS.BAL.Models;

namespace PS.BAL.Contractors
{
    public interface IService
    {
        IEnumerable<T> GetAll<T>();
        IEnumerable<T> GetByQuery<T>(string query);
        T GetByID<T>(Guid id);
        Task SaveDataAsync<T>(T inputData);
        Task DeleteDataByIDAsync(Guid id);
    }
}
