using AutoMapper;
using TravelPlannerApp.Dto;
using TravelPlannerApp.Models;

namespace TravelPlannerApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<Country, GetCountryDto>()
            //    .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.RefCountry.Code))
        }
    }
}
