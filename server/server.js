import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/passengers-route.js";

// Set port
const PORT =  process.env.PORT || 4001;

// Create express app
const app = express();

// Apply middleware
app.use(cors()); // cors allows cross-origin requests
app.use(helmet()); // helmet secures Express apps by setting various HTTP headers
app.use(compression()); // compression compresses responses

// body-parser parses incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add route for GET request to retrieve all passengers
app.use("/passengers", router);

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});