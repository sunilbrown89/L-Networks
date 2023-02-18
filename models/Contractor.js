const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
    LenderId: mongoose.Types.ObjectId,
    BorrowerId: mongoose.Types.ObjectId,
    Principle: Number,
    Interest: Number,
    LoanStartDate: String,
    LoanDueDate: String,
    IsRepaid: Boolean,
  });

   const ContractModel = mongoose.model("Contracts", contractSchema);
  module.exports = ContractModel