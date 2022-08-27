const loginParams = (req, res, next) => {
  const userData = req.body;

  if (
    !("email" in userData) ||
    !("password" in userData) ||
    Object.keys(userData).length > 2 ||
    Object.keys(userData).length < 2
  )
    return res.status(400).json({ error: "Invalid parameters" });

  return next();
};

const newUserParams = (req, res, next) => {
  const userData = req.body;

  if (
    !("firstname" in userData) ||
    !("lastname" in userData) ||
    !("email" in userData) ||
    !("password" in userData) ||
    !("propertyOwner" in userData) ||
    Object.keys(userData).length > 5 ||
    Object.keys(userData).length < 5
  )
    return res.status(400).json({ error: "Invalid parameters" });

  return next();
};

module.exports = {
    loginParams,
    newUserParams
}
