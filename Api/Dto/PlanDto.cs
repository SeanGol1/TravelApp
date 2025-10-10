namespace TravelPlannerApp.Dto
{
    public class CreatePlanDto
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public CreatePlanDto()
        {

        }
        public CreatePlanDto(string _name,string _username)
        {
            Name = _name;
            Username = _username;
        }
    }

}
