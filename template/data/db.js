const mongoose = require("mongoose");
const artSchema = require("../schemas/art");
const artistSchema = require("../schemas/artist");
const auctionSchema = require("../schemas/auction");
const auctionBidSchema = require("../schemas/auctionBid");
const customerSchema = require("../schemas/customer");

const connection = mongoose.createConnection(
  //"mongodb://abc123:abc123@ds129770.mlab.com:29770/leifur16-bjarki15-mansion-de-subastas",
   "mongodb://abc123:abc123@ds113849.mlab.com:13849/lbjarki15-mansion-de-subastas",
  { useNewUrlParser: true }
);

module.exports = {
  Art: connection.model("Art", artSchema),
  Artist: connection.model("Artist", artistSchema),
  Auction: connection.model("Auction", auctionSchema),
  AuctionBid: connection.model("AuctionBid", auctionBidSchema),
  Customer: connection.model("Customer", customerSchema),
  connection
};
