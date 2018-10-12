const EventEmitter = require('events');
const Schema = require("mongoose").Schema;

// this should be here right?
const { Artist } = require("../data/db");

class ArtistService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_ARTISTS: 'GET_ALL_ARTISTS',
            GET_ARTIST_BY_ID: 'GET_ARTIST_BY_ID',
            CREATE_ARTIST: 'CREATE_ARTIST'
        };
    }
    getAllArtists() {
        Artist.find({}, (err, art) => {
          if (err) {
            if (err.reason === undefined) {
              this.emit(this.events.GET_ALL_ARTISTS, err.reason);
            } else {
              this.emit(this.events.GET_ALL_ARTISTS);
            }
          }
          this.emit(this.events.GET_ALL_ARTISTS, art);
        });
    };

    getArtistById(id) {
      Artist.findById(id, (err, art) => {
        if (err) {
          if (err.reason === undefined) {
            this.emit(this.events.GET_ARTIST_BY_ID, err.reason);
          } else {
            this.emit(this.events.GET_ARTIST_BY_ID);
          }
        } else {
          this.emit(this.events.GET_ARTIST_BY_ID, art);
        }
      });
    };

    createArtist(artist) {
      Artist.findById(artist.id, err => {
        if (err) {
          if (err.reason === undefined) {
            // artist with the provided id exists
            this.emit(this.events.CREATE_ARTIST, err.reason);
          } else {
            // server error when getting the id
            this.emit(this.events.createArtist);
          }
        } else {
          Artist.create(
            {
              name: artist.name,
              nickname: artist.nickname,
              address: artist.address,
              memberSince: new Date()
            },
            (err, createdArtist) => {
              if (err) {
                if (err.reason === undefined) {
                  // the body was incorrect
                  this.emit(this.events.CREATE_ARTIST, err.reason);
                } else {
                  // something went wrong in the database when creating
                  this.emit(this.events.CREATE_ARTIST);
                }
              } else {
                this.emit(this.events.CREATE_ARTIST, createdArtist);
              }
            }
          );
        }
      });
    };
};

module.exports = ArtistService;
