const { Router } = require("express");
const authRouter = Router();
const multer = require("multer");
const path = require("path");
const generateToken = require("../utils/generateToken");
const { loginParams } = require("../middlewares/validParams");
const FirestoreContainer = require("../containers/FirestoreContainer");
const users = new FirestoreContainer('vecindario-users');

//Configs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

module.exports = authRouter.post("/new", upload.single('avatar'), async (req, res) => {
  const avatar = req.file;
  const userData = JSON.parse(req.body.data);
  
  await users.save({ data: { ...userData, avatar: `https://vecindario-backend.herokuapp.com${avatar.path}` }, favorites: [], properties: [] });

  res.json({ status: "New account created successfully." });
});

authRouter.post("/login", loginParams , async (req, res) => {
  const userData = req.body;
  const usersData = await users.getAll();

  const userResult = usersData.find(
    ({ data }) =>
      data.email === userData.email && data.password === userData.password
  );

  if (!userResult) return res.status(403).json({ error: "Wrong credentials" });

  const token = generateToken({ id: userResult.id });
  delete userResult.data.password;

  return res.json({ token, user: userResult });
});
