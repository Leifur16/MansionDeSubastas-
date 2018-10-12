const EventEmitter = require("events");

const { Customer, AuctionBid } = require("../data/db");

class CustomerService extends EventEmitter {
  constructor() {
    super();
    this.events = {
      GET_ALL_CUSTOMERS: "GET_ALL_CUSTOMERS",
      GET_CUSTOMER_BY_ID: "GET_CUSTOMER_BY_ID",
      GET_CUSTOMER_AUCTION_BIDS: "GET_CUSTOMER_AUCTION_BIDS",
      CREATE_CUSTOMER: "CREATE_CUSTOMER"
    };
  }
  getAllCustomers() {
    // Your implementation goes here
    // Should emit a GET_ALL_CUSTOMERS event when the data is available
    Customer.find({}, (err, customers) => {
      if (err) {
        if (err.reason === undefined) {
          this.emit(this.events.GET_ALL_CUSTOMERS, err.reason);
        } else {
          this.emit(this.events.GET_ALL_CUSTOMERS);
        }
      }
      this.emit(this.events.GET_ALL_CUSTOMERS, customers);
    });
  }

  getCustomerById(id) {
    // Your implementation goes here
    // Should emit a GET_CUSTOMER_BY_ID event when the data is available
    Customer.findById(id, (err, customer) => {
      if (err) {
        if (err.reason === undefined) {
          this.emit(this.events.GET_CUSTOMER_BY_ID, err.reason);
        } else {
          this.emit(this.events.GET_CUSTOMER_BY_ID);
        }
      }
      this.emit(this.events.GET_CUSTOMER_BY_ID, customer);
    });
  }

  getCustomerAuctionBids(customerId) {
    // Your implementation goes here
    // Should emit a GET_CUSTOMER_AUCTION_BIDS event when the data is available

    Customer.findById(customerId, err => {
      if (err) {
        if (err.reason === undefined) {
          this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, err.reason);
        } else {
          this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS);
        }
      } else {
        //valid id
        AuctionBid.find({ customerId: customerId }, (err, bids) => {
          if (err) {
            if (err.reason === undefined) {
              this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, err.reason);
            } else {
              this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS);
            }
          } else if (bids.length == 0) {
            // no bids
            this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, undefined);
          } else {
            this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, bids);
          }
        });
      }
    });
  }

  createCustomer(customer) {
    // Your implementation goes here
    // Should emit a CREATE_CUSTOMER event when the data is available
    Customer.create(
      {
        name: customer.name,
        username: customer.username,
        email: customer.email,
        address: customer.address
      },
      (err, createdCustomer) => {
        if (err) {
          if (err.reason === undefined) {
            this.emit(this.events.CREATE_CUSTOMER, err.reason);
          } else {
            this.emit(this.events.CREATE_CUSTOMER);
          }
        } else {
          this.emit(this.events.CREATE_CUSTOMER, createdCustomer);
        }
      }
    );
  }
}

module.exports = CustomerService;
