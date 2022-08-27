const { Router } = require("express");
const authRouter = Router();
const generateToken = require("../utils/generateToken");
const { newUserParams, loginParams } = require("../middlewares/validParams");
const FirestoreContainer = require("../containers/FirestoreContainer");
const users = new FirestoreContainer('vecindario-users');

module.exports = authRouter.post("/new", newUserParams, async (req, res) => {
  const userData = req.body;
  
  await users.save(userData);

  res.json({ status: "New account created successfully." });
});

authRouter.post("/login", loginParams, async (req, res) => {
  const userData = req.body;
  const usersData = await users.getAll();

  const userResult = usersData.find(
    ({ email, password }) =>
      email === userData.email && password === userData.password
  );

  if (!userResult) return res.status(403).json({ error: "Wrong credentials" });

  const token = generateToken({ email: userData.email });
  delete userResult.password;

  return res.json({ token, user: userResult });
});
