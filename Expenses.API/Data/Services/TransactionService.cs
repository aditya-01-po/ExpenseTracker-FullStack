using Expenses.API.Data;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Data.Services
{
    public interface ITransactionService
    {
        List<Transaction> GetAllTransactions(int userId);
        Transaction AddTransaction(PostTransactionDto transaction,int userId);
        Transaction? UpdateTransaction(int id, PutTransactionDto transaction,int userId);
        bool DeleteTransaction(int id, int userId);
        Transaction? GetTransactionById(int id, int userId);

    }

    public class TransactionService(AppDbContext context) : ITransactionService
    {
        public Transaction AddTransaction(PostTransactionDto transaction, int userID)
        {
            Transaction newTransacation = new Transaction()
            {
                Type = transaction.Type,
                Amount = transaction.Amount,
                Category = transaction.Category,
                CreatedAt = transaction.CreatedAt,
                UpdatedAt = DateTime.UtcNow,
                UserId = userID
            };
            context.Transactions.Add(newTransacation);
            context.SaveChanges();
            return newTransacation;
        }

        public bool DeleteTransaction(int id, int userId)
        {
            var transaction = context.Transactions.FirstOrDefault(t => t.Id == id && t.UserId == userId);
            if (transaction != null)
            {
                context.Transactions.Remove(transaction);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public List<Transaction> GetAllTransactions(int userId)
        {
            var transactions = context.Transactions.Where(t => t.UserId == userId).ToList();
            return transactions;
        }

        public Transaction? GetTransactionById(int id, int userId)
        {
           var transaction = context.Transactions.FirstOrDefault(t => t.Id == id && t.UserId == userId);
           return transaction;
        }

        public Transaction? UpdateTransaction(int id, PutTransactionDto transaction,int userId)
        {
            var transactions = context.Transactions.FirstOrDefault(t => t.Id == id && t.UserId == userId);
            if (transactions != null)
            {
                transactions.Amount = transaction.Amount;
                transactions.Category = transaction.Category;
                transactions.Type = transaction.Type;
                transactions.UpdatedAt = DateTime.UtcNow;
                context.Transactions.Update(transactions);
                context.SaveChanges();
            }
            return transactions;
        }
    }
}
