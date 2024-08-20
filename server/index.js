const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./usermodel");

server.use(cors());
server.use(express.json());

server.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "All users info",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

server.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

server.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

server.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/rtkquery")
  .then(() => {
    console.log("Database connected successfully.");
    server.listen(8000, () => {
      console.log("Server listening on port 8000.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
