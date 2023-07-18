using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace PS.DAL.Contractors
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        DbSet<TEntity> Table { get; }
        void Add(TEntity entity);
        void Delete(Guid id);
        void Delete(TEntity entity);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> condition);
        TEntity GetByID(Guid id);
        void Update(TEntity entity);
    }
}