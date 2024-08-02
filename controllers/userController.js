const User = require("../models/User");
const axios = require("axios");
const redisClient = require("../redisClient");
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

exports.getUser = async (req, res) => {
  console.log(req.params);
  const userId = req.params.id;

  try {
    // Check if user data is in Redis cache
    const cachedUser = await redisClient.get(userId);
    if (cachedUser) {
      return res.json(JSON.parse(cachedUser));
    }

    // If not in cache, fetch from MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store user data in Redis cache
    await redisClient.set(userId, JSON.stringify(user));

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
