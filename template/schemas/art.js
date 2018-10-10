const Schema = require("mongoose").Schema;

module.exports = new Schema({
  title: { type: String, requre: true },
  artistId: { type: Schema.Types.ObjectId, requre: true, ref: "Artist" },
  date: { type: Date, requre: true, default: Date.now },
  images: [String],
  description: String,
  isAuctionItem: { type: Boolean, default: false }
});
