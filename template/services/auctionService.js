EventEmitter = require('events');

const { Auction, AuctionBid, Customer, Art } = require("../data/db");

class AuctionService extends EventEmitter {
	constructor() {
		super();
		this.events = {
			GET_ALL_AUCTIONS: 'GET_ALL_AUCTIONS',
			GET_AUCTION_BY_ID: 'GET_AUCTION_BY_ID',
			GET_AUCTION_WINNER: 'GET_AUCTION_WINNER',
			CREATE_AUCTION: 'CREATE_AUCTION',
			GET_AUCTION_BIDS_WITHIN_AUCTION: 'GET_AUCTION_BIDS_WITHIN_AUCTION',
			PLACE_NEW_BID: 'PLACE_NEW_BID'
		};
	}

	getAllAuctions() {
			Auction.find({}, (err, art) => {
				if (err) {
					if (err.reason === undefined) {
						this.emit(this.events.GET_ALL_AUCTIONS, err.reason);
					} else {
						this.emit(this.events.GET_ALL_AUCTIONS);
					}
				}
				this.emit(this.events.GET_ALL_AUCTIONS, art);
			});
	};

	getAuctionById(id) {
		Auction.findById(id, (err, auction) => {
			if (err) {
				if (err.reason === undefined) {
					this.emit(this.events.GET_AUCTION_BY_ID, err.reason);
				} else {
					this.emit(this.events.GET_AUCTION_BY_ID);
				}
			} else {
				this.emit(this.events.GET_AUCTION_BY_ID, auction);
			}
		});
	};

	getAuctionWinner(auctionId) {
		Auction.findById(auctionId, (err, auction) => {
			if (err) {
				if (err.reason === undefined) {
					this.emit(this.events.GET_AUCTION_WINNER, err.reason);
				} else {
					this.emit(this.events.GET_AUCTION_WINNER);
				}
			}
			else {
				Customer.findById(auction.auctionWinner, (err, customer) => {
					if (err) {
						if (err.reason === undefined) {
							this.emit(this.events.GET_AUCTION_WINNER, err.reason);
						} else {
							this.emit(this.events.GET_AUCTION_WINNER);
						}
					} else {
						this.emit(this.events.GET_AUCTION_WINNER, customer);
					}
				})
			}
			})
	};

	createAuction(auction) {
		Auction.findById(auction.id, err => {
			if (err) {
				if (err.reason === undefined) {
					// artist with the provided id exists
					this.emit(this.events.CREATE_AUCTION, err.reason);
				} else {
					// server error when getting the id
					this.emit(this.events.createArtist);
				}
			} else {
				Auction.create(
					{
						artId: auction.artId,
						minimumPrice: auction.minimumPrice,
						endDate: auction.endDate,
						auctionWinner: auction.auctionWinner
					},
					(err, createdAuction) => {
						if (err) {
							if (err.reason === undefined) {
								// the body was incorrect
								this.emit(this.events.CREATE_AUCTION, err.reason);
							} else {
								// something went wrong in the database when creating
								this.emit(this.events.CREATE_AUCTION);
							}
						}
				 else {
				 Art.findById(auction.artId, (err, art) => {
	 					if(err) {
	 						if(err.reason === undefined) {
	 							this.emit(this.events.CREATE_AUCTION, err.reason);
	 						} else {
	 							this.emit(this.events.createAuction);
	 						}
	 					}
						else if(art.isAuctionItem){
                this.emit(this.events.CREATE_AUCTION, createdAuction);
            } else {
								this.emit(this.events.CREATE_AUCTION);
						}
          }
	          );
					}

				});
			}
		});
	};

	getAuctionBidsWithinAuction(auctionId) {

			AuctionBid.find({auctionId:auctionId}, (err, bids) => {
				if (err) {
					if (err.reason === undefined) {
						this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION, err.reason);
					} else {
						this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION);
					}
				} else {
					this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION, bids);
				}
			});
	};

	placeNewBid(auctionId, customerId, price) {
		// Your implementation goes here
        // Should emit a PLACE_NEW_BID event when the data is available
	};
};

module.exports = AuctionService;
