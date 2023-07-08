using System.Globalization;

namespace PS.Common.Extensions
{
    public static class StringExtension
    {
        public static string ToTitleCase(this string value) 
        {
            CultureInfo culture = new CultureInfo("en-US");
            return culture.TextInfo.ToTitleCase(value.ToLower());
        }
    }
}
