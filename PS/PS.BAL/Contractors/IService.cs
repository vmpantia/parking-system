using PS.BAL.Models;

namespace PS.BAL.Contractors
{
    public interface IService<TDto> where TDto : class
    {
        IEnumerable<TDto> GetAll();
        IEnumerable<TDto> GetByQuery(string query);
        TDto GetByID(Guid internalID);
        Task SaveDataAsync(TDto inputData);
        Task DeleteDataAsync(TDto inputData);
    }
}
