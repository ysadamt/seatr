import express from "express";

import { getPassengers, createPassenger } from "../controllers/routes.js";

const router = express.Router();

router.get("/", getPassengers);
router.post("/", createPassenger);

export default router;