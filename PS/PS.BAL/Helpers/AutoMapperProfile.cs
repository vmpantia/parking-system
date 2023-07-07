using AutoMapper;
using PS.BAL.Models;
using PS.DAL.Database.Entities;
using System.Net;

namespace PS.BAL.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Customer, CustomerDTO>().ReverseMap();
            CreateMap<Car, Car>().ReverseMap();
        }
    }
}
