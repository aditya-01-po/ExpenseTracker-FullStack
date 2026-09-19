using Expenses.API.Data;
using Expenses.API.Data.Services;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService transactionService;

        public TransactionsController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody] PostTransactionDto payload)
        {
            var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(nameIdentifierClaim))
            {
                return BadRequest("Could not find user id in claims."); 
            }
            if(!int.TryParse(nameIdentifierClaim, out int userId))
            {
                return BadRequest("Invalid user id in claims.");
            }
            var newTransacation = transactionService.AddTransaction(payload,userId);
            return Ok(newTransacation);
        }


        [HttpGet("All")]
        public IActionResult GetTransactions()
        {
            var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(nameIdentifierClaim))
            {
                return BadRequest("Could not find user id in claims.");
            }
            if (!int.TryParse(nameIdentifierClaim, out int userId))
            {
                return BadRequest("Invalid user id in claims.");
            }
            var transactions = transactionService.GetAllTransactions(userId);
            return Ok(transactions);
        }

        [HttpGet("Details/{id:int}")]
        public IActionResult GetTransaction(int id)
        {
            if (!TryGetCurrentUserId(out int userId))
            {
                return BadRequest("Invalid user id in claims.");
            }
            var transaction = transactionService.GetTransactionById(id, userId);
            if (transaction == null)
            {
                return BadRequest("Transaction not found or does not belong to the user.");
            }   
            return Ok(transaction);
        }

        [HttpPut("Update/{id:int}")]
        public IActionResult UpdateTransaction(int id, [FromBody] PutTransactionDto payload)
        {
            if (!TryGetCurrentUserId(out int userId))
            {
                return BadRequest("Invalid user id in claims.");
            }
            var updatedTransaction = transactionService.UpdateTransaction(id, payload, userId);
            if (updatedTransaction == null)
            {
                return BadRequest("Transaction not found or does not belong to the user.");
            }
            return Ok(updatedTransaction);
        }

        [HttpDelete("Delete/{id:int}")]
        public IActionResult DeleteTransaction(int id)
        {
            if (!TryGetCurrentUserId(out int userId))
            {
                return BadRequest("Invalid user id in claims.");
            }
            var deleted = transactionService.DeleteTransaction(id, userId);
            if (!deleted)
            {
                return BadRequest("Transaction not found or does not belong to the user.");
            }
            return Ok();
        }
           

        private bool TryGetCurrentUserId(out int userId)
        {
            var claimValue = User.FindFirst(
                ClaimTypes.NameIdentifier
            )?.Value;

            return int.TryParse(claimValue, out userId);
        }
    }
}
