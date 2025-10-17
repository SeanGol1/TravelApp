using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace TravelPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtherController : ControllerBase
    {
        [HttpGet("sitemap.xml")]
        public IActionResult GetSitemap()
        {
            var xml = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
  <url>
    <loc>https://backpackererapp.web.app/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://backpackererapp.web.app/plans</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://backpackererapp.web.app/explore</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://backpackererapp.web.app/login</loc>
    <priority>0.5</priority>
  </url>
</urlset>";

            return Content(xml, "application/xml", Encoding.UTF8);
        }
    }
}
