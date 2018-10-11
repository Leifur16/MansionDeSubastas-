const artService = require("./services/artistService");
const artistService = require("./services/artistService");
const customerService = require("./services/customerService");
const auctionService = require("./services/auctionService");

const express = require("express");
const router = express.Router();
const port = 5000;
const app = express();

router.get("/api/artists", (req, res) => {
  
});

app.use("/", router);
app.listen(port, () => {
  console.log(`we are listening on port ${port}`);
});
