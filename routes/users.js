import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

//mock database
let users = [];

//Getting the list of users from the mock database
router.get("/", (req, res) => {
  res.send(users);
});

//Adding users to our mock database
router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`${user.firstName} has been added to the Database`);
});

//how to create the GET /users/:id Endpoint
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

//How to Create the DELETE /users/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`${id} deleted successfully from database`);
});

//How to Create the PATCH /users/:id Endpoint
router.patch("/:id",(req, res) => {
    const { id } = req.params;

    const { firstName, lastName, email } = req.body;

    const user = users.find((user) => user.id === id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    res.send(`User with the ${id} has been update`);
  });
export default router;
