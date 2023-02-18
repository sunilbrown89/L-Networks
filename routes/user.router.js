const {Router} = require("express")


const UserModel = require("../models/User")

const userRouter = Router();


userRouter.post("/users", async (req, res) => {
    const { Name, MobileNumber } = req.body;
  
    try {
      const newUser = new UserModel({
        Name,
        MobileNumber,
      });
      await newUser.save();
      res.json(newUser);
      console.log("Users saved suucessfully")
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  userRouter.get("/users", async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  userRouter.get("/users/:type", async (req, res) => {
    //type means like id that matches the type contractor
    const type = req.params.type;
    try {
      const users = await UserModel.find({ type: type });
      res.json(users);
      console.log("getting type user",type)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = userRouter;
  