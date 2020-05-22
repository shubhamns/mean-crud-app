const User = require("../models/user");

exports.createUser = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.age ||
    !req.body.gender ||
    !req.body.state
  ) {
    return res.status(422).json({
      status: 422,
      user: {
        firstName: "firstName is required",
        lastName: "lastName is required",
        email: "enail is required",
        age: "age is required",
        gender: "gender is required",
        state: "state is required",
      },
    });
  }
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({ status: 409, message: "Email already exists" });
    } else {
      res.status(500).send({ status: 500, error: error });
    }
  }
};

exports.readUser = async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.readUserById = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!user) {
      return res.send({ message: `user not found with id ${id}` });
    }
    res.send({ message: "Update user successfully", user: user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({ status: 409, message: "Email already exists" });
    } else {
      res.status(500).send({ status: 500, error: error });
    }
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!user) {
      return res.send({ message: `user not found with id ${id}` });
    }
    res.send({ message: "Delete user successfully" });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
