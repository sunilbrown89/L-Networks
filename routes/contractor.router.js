



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



  contractRouter.get("/lender/:n", async (req, res) => {
    const n = parseInt(req.params.n);
    try {
      const lenderData = await ContractModel.aggregate([
        {
          $group: {
            _id: "$LenderId",
          
            count: { $sum: 1 },
            totalAmount: { $sum: "$Principle" },
           
            
          
          },
        },
        {
          $match: { count: { $gte: n } },
          
        },
        { $sort: { count: 1 } },
      ]);
  
      const lenders = await UserModel.find({
        _id: { $in: lenderData.map((item) => item._id) },
      });
  
      const result = lenders.map((lender) => {
        const data = lenderData.find((item) => item._id.equals(lender._id));
        return {
          LenderName: lender.Name,
          Total: data.totalAmount,
          totalBorrowerSize:data.count,
          
        };
      });
     
      res.json(result);
    } catch (error) {
      console.log(error,"error")
    }
     
  })
  
module.exports = contractRouter;
