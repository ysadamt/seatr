import PostPassenger from "../models/postPassenger.js";

export const getPassengers = async (req, res) => {
  try {
    const passengers = await PostPassenger.find();

    res.status(200).json(passengers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

export const createPassenger = async (req, res) => {
  const body = req.body;

  const newPassenger = new PostPassenger(body);
  try {
    await newPassenger.save();

    res.status(201).json(newPassenger);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};