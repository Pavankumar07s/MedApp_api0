const User = require("../models/User");
const axios = require("axios");
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.externalApiCall = async (req, res) => {
  console.log(req);
  const { pan, consent, consent_text } = req.body;

  const options = {
    method: "POST",
    url: "https://pan-information-verification-api.p.rapidapi.com/validation/api/v1/panverification",
    headers: {
      "x-rapidapi-key": "3dce9a4405msh2c075ea66c19e31p1ea634jsnbe2025e47b4f",
      "x-rapidapi-host": "pan-information-verification-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      pan: pan,
      consent: consent,
      consent_text: consent_text,
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
