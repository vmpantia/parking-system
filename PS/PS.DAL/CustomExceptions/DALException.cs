namespace PS.DAL.CustomExceptions
{
    public class DALException : Exception
    {
        public DALException(string? message) : base(message)
        {
        }
    }
}
