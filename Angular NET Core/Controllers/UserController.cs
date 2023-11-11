using DB;
using GreenMaterialBackEnd.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace Angular_NET_Core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly GreenMaterialContext _context;

        private IConfiguration _configuration;

        private readonly ILogger<UserController> _logger;

        public UserController(
            GreenMaterialContext context,
            IConfiguration configuration,
            ILogger<UserController> logger) 
        { 
            _context = context; 
            _configuration = configuration; 
            _logger = logger;
        }

        [HttpGet]
        public ActionResult GetUsers()
        {
            try
            {
                return Ok(_context.users.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult GetUsersById(int id)
        {
            try
            {
                return Ok(_context.users.FirstOrDefault(user => user.id == id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ByEmailPassword")]
        public ActionResult GetUserByEmailPassword(string email, string password)
        {
            var user = new UserResponse();

            try
            {
                var userFound = _context.users.FirstOrDefault(user => user.email == email && user.password == password);

                if (userFound != null)
                {
                    user.id = userFound.id;
                    user.email = email;
                    user.firstName = userFound.firstName;
                    user.lastName = userFound.lastName;
                }
                else
                {
                    throw new Exception("usuario no encontrado");
                }

                /*ALGUN DÍA VOY A IMPLEMENTAR JWT
                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
                    new Claim("id", userFound.id.ToString())
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                var sigIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(jwt.Issuer, jwt.Audience, claims, expires: DateTime.Now.AddMinutes(10), signingCredentials: sigIn);
                return Ok(new
                {
                    user = userFound,
                    status = 200,
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });*/

                return Ok(userFound);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult PostUser([FromBody] User user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.lastName) ||
                    string.IsNullOrEmpty(user.firstName) ||
                    string.IsNullOrEmpty(user.email) ||
                    string.IsNullOrEmpty(user.password)) return BadRequest("Faltan campos obligatorios.");
                if (_context.users.Any(u => u.email == user.email))
                {
                    return Conflict("El correo electrónico ya está en uso.");
                }

                _context.users.Add(user);
                _context.SaveChanges();
                return Ok(user.id);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
