const { Router } = require("express");
const dataRouter = Router();
const FirestoreContainer = require("../containers/FirestoreContainer");
const users = new FirestoreContainer("vecindario-users");

module.exports = dataRouter.get("/users/:id/favorites", async (req, res) => {
  const id = req.params.id;

  const userData = await users.getById(id);

  res.json(userData.favorites);
});

dataRouter.post("/users/:id/favorites", async (req, res) => {
  const id = req.params.id;
  const { entityId } = req.body;

  const userData = await users.getById(id);
  const updatedFavorites = { favorites: [...userData.favorites, { entityId }] };

  await users.update(id, updatedFavorites);

  res.json(updatedFavorites);
});

dataRouter.delete("/users/:userid/favorites/:favoriteid", async (req, res) => {
  const { userid, favoriteid } = req.params;

  const userData = await users.getById(userid);

  const filteredFavorites = userData.favorites.filter(
    (_, i) => i != favoriteid
  );

  const updatedFavorites = { favorites: filteredFavorites };

  await users.update(userid, updatedFavorites);

  res.json(updatedFavorites);
});

dataRouter.get("/users/:id/properties", async (req, res) => {
  const id = req.params.id;

  const userData = await users.getById(id);

  res.json(userData.properties);
});

dataRouter.post("/users/:id/properties", async (req, res) => {
  const id = req.params.id;
  const { entityId } = req.body;

  const userData = await users.getById(id);
  const updatedProperties = {
    properties: [...userData.properties, { entityId }],
  };

  await users.update(id, updatedProperties);

  res.json(updatedProperties);
});

dataRouter.delete("/users/:userid/properties/:propertyid", async (req, res) => {
  const { userid, propertyid } = req.params;

  const userData = await users.getById(userid);

  const filteredProperties = userData.properties.filter(
    (_, i) => i != propertyid
  );

  const updatedProperties = { properties: filteredProperties };

  await users.update(userid, updatedProperties);

  res.json(updatedProperties);
});

dataRouter.get("/users/:id/profile", async (req, res) => {
  const id = req.params.id;

  const userData = await users.getById(id);

  delete userData.data.password;

  res.json(userData.data);
});

dataRouter.put("/users/:id/profile", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  
  const userData = await users.getById(id);
  const updatedData = { data: {...userData.data, ...newData} }

  await users.update(id, updatedData);

  delete updatedData.password;

  res.json(updatedData);
});

dataRouter.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const userData = await users.getById(id);

  delete userData.data.password;

  res.json(userData);
});
