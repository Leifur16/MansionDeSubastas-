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

// --- Art --- ///
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
      return res.status(400).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      const ret = {
        images: result.images,
        isAuctionItem: result.isAuctionItem,
        title : result.title,
        artistId: result.artistId,
        date: result.date,
        description: result.description
      };
      return res.status(201).send(ret);
    }
  });

  artServiceInstance.createArt(art);
});

// --- artists --- //

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
      const ret = {
        name: result.name,
        nickname: result.nickname,
        address: result.address,
        memberSince: result.memberSince
      };
      return res.status(201).send(ret);
    }
  });

  artistServiceInstance.createArtist(artist);
});


// --- customers --- //

router.get("/api/customers", (req, res) => {
  const customerServiceInstance = new customerService();
  customerServiceInstance.on("GET_ALL_CUSTOMERS", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(201).send(result);
    }
  });

  customerServiceInstance.getAllCustomers();
});

router.get("/api/customers/:id", (req, res) => {
  const id = req.params.id;
  const customerServiceInstance = new customerService();
  customerServiceInstance.on("GET_CUSTOMER_BY_ID", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });
  customerServiceInstance.getCustomerById(id);
});

router.post("/api/customers", (req, res) => {
  const customer = req.body;
  const customerServiceInstance = new customerService();
  customerServiceInstance.on("CREATE_CUSTOMER", result => {
    if (result === undefined) {
      return res.status(400).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      const ret = {
        name: result.name,
        username: result.username,
        email: result.email,
        address: result.address
      };
      return res.status(201).send(ret);
    }
  });
  customerServiceInstance.createCustomer(customer);
});

router.get("/api/customers/:id/auction-bids", (req, res) => {
  const id = req.params.id;
  const customerServiceInstance = new customerService();
  customerServiceInstance.on("GET_CUSTOMER_AUCTION_BIDS", result => {
    if (result === undefined) {
      return res.status(404).send();
    } else if (result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).send(result);
    }
  });
  customerServiceInstance.getCustomerAuctionBids(id);
});

// --- auction --- //


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
      return res.status(404).send();
    } else if (result === "ONGOING") {
      return res.status(409).send();
    } else if(result === null) {
      return res.status(200).send("This auction had no bids");
    }else {
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
      const ret = {
        artId : result.artId,
        minimumPrice: result.minimumPrice,
        endDate: result.endDate
      };
      return res.status(200).send(ret);
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

router.post("/api/auctions/:id/bids", (req, res) => {
  const bid = req.body;
  const id = req.params.id
  const auctionServiceInstance = new auctionService();

  auctionServiceInstance.on("PLACE_NEW_BID", result => {
    if (result === undefined) {
      return res.status(412).send();
    } else if (result === null) {
      return res.status(500).send();
    } else if(result === "FORBIDDEN") {
      return res.status(403).send();
    } else if(result === "FAIL") {
      return res.status(412).send();
    } else {
      const ret = {
        customerId : result.customerId,
        price: result.price
      };
      return res.status(200).send(ret);
    }
  });

  auctionServiceInstance.placeNewBid(id, bid.customerId, bid.price);
});




app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`we are listening to port ${port}`);
});
