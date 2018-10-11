const EventEmitter = require("events");
const Schema = require("mongoose").Schema;

// this should be here right?
const { Art, Artist } = require("../data/db");

class ArtService extends EventEmitter {
  constructor() {
    super();
    this.events = {
      GET_ALL_ARTS: "GET_ALL_ARTS",
      GET_ART_BY_ID: "GET_ART_BY_ID",
      CREATE_ART: "CREATE_ART"
    };
  }
  getAllArts() {
    // Your implementation goes here
    // Should emit a GET_ALL_ARTS event when the data is available
    Art.find({}, (err, art) => {
      if (err) {
        if (err.reason === undefined) {
          this.emit(this.events.GET_ALL_ARTS, err.reason);
        } else {
          this.emit(this.events.GET_ALL_ARTS);
        }
      }
      this.emit(this.events.GET_ALL_ARTS, art);
    });
  }

  getArtById(id) {
    // Your implementation goes here
    // Should emit a GET_ART_BY_ID event when the data is available
    Art.findById(id, (err, art) => {
      if (err) {
        if (err.reason === undefined) {
          this.emit(this.events.GET_ART_BY_ID, err.reason);
        } else {
          this.emit(this.events.GET_ART_BY_ID);
        }
      } else {
        this.emit(this.events.GET_ART_BY_ID, art);
      }
    });
  }

  createArt(art) {
    // Your implementation goes here
    // Should emit a CREATE_ART event when the data is available
    Artist.findById(art.id, err => {
      if (err) {
        if (err.reason === undefined) {
          // no artist with the provided id exists
          this.emit(this.events.CREATE_ART, err.reason);
        } else {
          // server error when getting the id
          this.emit(this.events.createArt);
        }
      } else {
        Art.create(
          {
            title: art.title,
            artistId: art.artistId,
            date: art.date,
            images: art.images,
            description: art.description,
            isAuctionItem: art.isAuctionItem
          },
          (err, createdArt) => {
            console.log("found id");
            if (err) {
              if (err.reason === undefined) {
                // the body was incorrect
                this.emit(this.events.CREATE_ART, err.reason);
              } else {
                // something went wrong in the database when creating
                this.emit(this.events.CREATE_ART);
              }
            } else {
              this.emit(this.events.CREATE_ART, createdArt);
            }
          }
        );
      }
    });
  }
}

module.exports = ArtService;
