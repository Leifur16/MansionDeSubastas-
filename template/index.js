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
      return res.status(201).send(result);
    }
  });
  customerServiceInstance.createCustomer(customer);
});

router.get("/api/customers/:id/auction-bids", (req, res) => {
  console.log("inside the function");
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

app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`we are listening to port ${port}`);
});
