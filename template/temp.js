const artService = require("./services/artService");
const artistService = require("./services/artistService");
const customerService = require("./services/customerService");
const auctionService = require("./services/auctionService");

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const port = 3000;
const app = express();

router.get("/api/artists", (req, res) => {
  const artistServiceInstance = new artistService();
  artistServiceInstance.on("GET_ALL_ARTISTS", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  artistServiceInstance.getAllArtists();
});

router.get("/api/artists/:id", (req, res) => {
  const id = req.params.id;
  const artistServiceInstance = new artistService();
  artistServiceInstance.on("GET_ARTIST_BY_ID", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  artistServiceInstance.getArtistById(id);
});

router.post("/api/artists", (req, res) => {
  const artist = req.body;
  const artistServiceInstance = new artistService();

  artistServiceInstance.on("CREATE_ARTIST", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(201).send(result);
    }
  });

  artistServiceInstance.createArtist(artist);
});



router.get("/api/auctions", (req, res) => {
  const artistServiceInstance = new auctionService();
  artistServiceInstance.on("GET_ALL_AUCTIONS", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  artistServiceInstance.getAllAuctions();
});

router.get("/api/auctions/:id", (req, res) => {
  const id = req.params.id;
  const auctionServiceInstance = new auctionService();
  auctionServiceInstance.on("GET_AUCTION_BY_ID", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  auctionServiceInstance.getAuctionById(id);
});

router.get("/api/auctions/:id/winner", (req, res) => {
  const id = req.params.id;
  const auctionServiceInstance = new auctionService();
  auctionServiceInstance.on("GET_AUCTION_WINNER", result => {
    if (result === undefined) {
      return res.status(409).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  auctionServiceInstance.getAuctionWinner(id);
});

router.post("/api/auctions", (req, res) => {
  const auction = req.body;
  const auctionServiceInstance = new auctionService();
  auctionServiceInstance.on("CREATE_AUCTION", result => {
    if (result === undefined) {
      return res.status(412).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  auctionServiceInstance.createAuction(auction);
});

router.get("/api/auctions/:id/bids", (req, res) => {
  const id = req.params.id;
  const auctionServiceInstance = new auctionService();
  auctionServiceInstance.on("GET_AUCTION_BIDS_WITHIN_AUCTION", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });

  auctionServiceInstance.getAuctionBidsWithinAuction(id);
});

app.use(bodyParser.json());
app.use("/", router);
app.listen(port, () => {
  console.log(`we are listening on port ${port}`);
});
