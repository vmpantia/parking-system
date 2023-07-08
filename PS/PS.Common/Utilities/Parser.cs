using PS.Common.Constants;

namespace PS.Common.Utilities
{
    public class Parser
    {
        public static string ParseStatus(int status)
        {
            switch(status)
            {
                case Status.ENABLED_INT:
                    return Status.ENABLED_STR;
                case Status.DISABLED_INT:
                    return Status.DISABLED_STR;
                case Status.DELETION_INT:
                    return Status.DELETION_STR;
                default:
                    return string.Empty;
            }
        }

        public static int ParseStatus(string status)
        {
            switch (status)
            {
                case Status.ENABLED_STR:
                    return Status.ENABLED_INT;
                case Status.DISABLED_STR:
                    return Status.DISABLED_INT;
                case Status.DELETION_STR:
                    return Status.DELETION_INT;
                default:
                    return default;
            }
        }
    }
}
