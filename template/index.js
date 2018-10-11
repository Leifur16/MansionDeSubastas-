// Here the web service should be setup and routes declared
const artService = require("./services/artService");
const artistService = require("./services/artistService");
const customerService = require("./services/customerService");
const auctionService = require("./services/auctionService");

const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const port = 3000;
const app = express();

router.get("/api/arts", (req, res) => {
  const artServiceInstance = new artService();
  artServiceInstance.on("GET_ALL_ARTS", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  artServiceInstance.getAllArts();
});

router.get("/api/arts/:id", (req, res) => {
  const id = req.params.id;
  const artServiceInstance = new artService();
  artServiceInstance.on("GET_ART_BY_ID", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  artServiceInstance.getArtById(id);
});

router.post("/api/arts", (req, res) => {
  const art = req.body;
  const artServiceInstance = new artService();

  artServiceInstance.on("CREATE_ART", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(201).send(result);
    }
  });

  artServiceInstance.createArt(art);
});

app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`we are listening to port ${port}`);
});
