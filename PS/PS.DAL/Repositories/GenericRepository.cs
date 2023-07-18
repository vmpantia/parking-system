using Microsoft.EntityFrameworkCore;
using PS.DAL.Contractors;
using PS.DAL.CustomExceptions;
using PS.DAL.Database;
using System.Linq.Expressions;

namespace PS.DAL.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        public readonly PSDbContext _context;
        public readonly DbSet<TEntity> _table;

        public GenericRepository(PSDbContext context)
        {
            _context = context;
            _table = context.Set<TEntity>();
        }

        public DbSet<TEntity> Table
        {
            get { return _table; }
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _table.AsNoTracking();
        }

        public IEnumerable<TEntity> GetByExpression(Expression<Func<TEntity, bool>> condition)
        {
            return _table.Where(condition);
        }

        public TEntity GetByID(Guid id)
        {
            var result = _table.Find(id);
            if (result == null)
                throw new DALException(string.Format("ID {0} is not found in the system.", id));

            return result;
        }

        public void Add(TEntity entity)
        {
            _table.Add(entity);
        }

        public void Update(TEntity entity)
        {
            _table.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(TEntity entity)
        {
            _table.Remove(entity);
        }
        public void Delete(Guid id)
        {
            var result = GetByID(id);
            if (result != null)
                _table.Remove(result);
        }
    }
}
