import knex from "../db.js";

export const getPassengers = async (req, res) => {
  try {
    const passengers = await knex.select("*").from("passengers");
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getPassenger = async (req, res) => {
  try {
    const passenger = await knex
      .select("*")
      .from("passengers")
      .where({ ticketID: req.params.id });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}