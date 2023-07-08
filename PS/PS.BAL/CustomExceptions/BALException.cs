namespace PS.BAL.CustomExceptions
{
    public class BALException : Exception
    {
        public BALException(string? message) : base(message)
        {
        }
    }
}
