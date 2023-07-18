using AutoMapper;
using PS.BAL.Models;
using PS.Common.Extensions;
using PS.Common.Utilities;
using PS.DAL.Database.Entities;
using System.Net;

namespace PS.BAL.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Customer
            CreateMap<Customer, CustomerDTO>()
                .ForMember(dto => dto.FullName, opt => opt.MapFrom(source => $"{source.LastName.ToTitleCase()}, {source.FirstName.ToTitleCase()}"))
                .ForMember(dto => dto.Status, opt => opt.MapFrom(source => Parser.ParseStatus(source.Status)))
                .ForMember(dto => dto.CreatedDate, opt => opt.MapFrom(source => source.CreatedDate.ToString("yyyy-MM-dd")))
                .ForMember(dto => dto.ModifiedDate, opt => opt.MapFrom(source => source.ModifiedDate != null ? source.ModifiedDate.Value.ToString("yyyy-MM-dd") : "N/A"));
            CreateMap<SaveCustomerDto, Customer>().ReverseMap();

            //Car
            CreateMap<Car, CarDTO>()
                .ForMember(dto => dto.CustomerFullName, opt => opt.MapFrom(source => $"{source.Customer.LastName.ToTitleCase()}, {source.Customer.FirstName.ToTitleCase()}"))
                .ForMember(dto => dto.Status, opt => opt.MapFrom(source => Parser.ParseStatus(source.Status)))
                .ForMember(dto => dto.CreatedDate, opt => opt.MapFrom(source => source.CreatedDate.ToString("yyyy-MM-dd")))
                .ForMember(dto => dto.ModifiedDate, opt => opt.MapFrom(source => source.ModifiedDate != null ? source.ModifiedDate.Value.ToString("yyyy-MM-dd") : "N/A"));
            CreateMap<SaveCarDto, Car>().ReverseMap();
        }
    }
}
