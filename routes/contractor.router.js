



const {Router} = require("express")
const ContractModel = require("../models/Contractor")
const UserModel = require("../models/User")

const contractRouter = Router();

contractRouter.post("/contractors", async (req, res) => {
    const {
      LenderId,
      BorrowerId,
      Principle,
      Interest,
      LoanStartDate,
      LoanDueDate,
      IsRepaid,
    } = req.body;
  
    try {
      const newContract = new ContractModel({
        LenderId,
        BorrowerId,
        Principle,
        Interest,
        LoanStartDate,
        LoanDueDate,
        IsRepaid,
      });
      await newContract.save();
      res.json(newContract);
      console.log("contract saved successfully") 
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.log(error,"err in contract")
    }
  });

module.exports = contractRouter;
