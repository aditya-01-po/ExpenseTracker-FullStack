using Expenses.API.Data;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    //[Authorize]
    public class AuthController(AppDbContext context, PasswordHasher<User> passwordHasher, IConfiguration configuration) : ControllerBase
    {
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginUserDto payload)
        {
            var user=context.Users.FirstOrDefault(n=> n.Email== payload.Email);
            if (user == null) return Unauthorized("No User found/Invalid Credentials");

            var PassResult= passwordHasher.VerifyHashedPassword(user, user.Password, payload.Password);
            if(PassResult== PasswordVerificationResult.Failed) return Unauthorized("Wrong Password Credentials");

            var token = GenerateJwtToken(user);
            return Ok(new { Token=token });

        }


        [HttpPost("Register")]
        public IActionResult Register([FromBody] PostUserDto user)
        {
            if (context.Users.Any(n=>n.Email==user.Email))
            {
                return BadRequest("This email is already taken");
            }
            var hashedPassword = passwordHasher.HashPassword(null, user.Password);
            var newUser = new User()
            {
                Email = user.Email,
                Password = hashedPassword,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
            context.Users.Add(newUser);
            context.SaveChanges();

            var token = GenerateJwtToken(newUser);

            return Ok(new {Token=token});
        }

        private string GenerateJwtToken(User user)
        {
            var Claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Email,user.Email),
            };

            var key= configuration["Jwt:Key"];
            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var expiry = Convert.ToInt32(configuration["Jwt:ExpiryHours"]);

            var creds=new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!)), SecurityAlgorithms.HmacSha256);
            
            var token= new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: Claims,
                expires: DateTime.UtcNow.AddHours(expiry),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
