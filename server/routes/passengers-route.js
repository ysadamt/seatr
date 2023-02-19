import express from "express";
import { getPassengers, getPassenger, createPassenger } from "../controllers/passengers-controller.js";

const router = express.Router();

// Add route for GET request to retrieve all passengers
router.get("/all", getPassengers);
// Add route for GET request to retrieve a single passenger
router.get("/:id", getPassenger);
// Add route for POST request to create a new passenger
router.post("/create", createPassenger);

export default router;