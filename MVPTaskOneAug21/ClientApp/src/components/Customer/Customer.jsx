import React, { Component } from "react";
import TableCustomer from "./TableCustomer";
import CreateCustomer from "./CreateCustomer";
import CustomerPagination from "./CustomerPagination";
import CustomerRowOptionsDropDown from "./CustomerRowOptionsDropDown";
import axios from "axios";
import { Button } from "semantic-ui-react";
import "../../custom.css";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      createCustomerModal: false,
      currentPage: 1,
      postsPerPage: 5,
    };
  }

  fetchCustomer = () => {
    axios
      .get("/api/Customer")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          customer: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("Component Did mount");
    this.fetchCustomer();
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  toggleCreateCustomerModal = (value) => {
    this.setState({ createCustomerModal: value });
  };

  handleRowOptionsDropDown = (value) => {
    this.setState({ postsPerPage: value });
  };

  render() {
    const { customer, createCustomerModal, currentPage, postsPerPage } =
      this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = customer.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div>
        <CreateCustomer
          open={createCustomerModal}
          toggleCreateCustomerModal={this.toggleCreateCustomerModal}
          fetchCustomer={this.fetchCustomer}
        />

        <h1>Customer</h1>

        <Button
          className="create-button"
          primary
          onClick={() => this.toggleCreateCustomerModal(true)}
        >
          Create Customer
        </Button>

        <TableCustomer
          customerData={customer}
          posts={currentPosts}
          fetchCustomer={this.fetchCustomer}
        />

        <CustomerPagination
          postsPerPage={postsPerPage}
          totalPosts={customer.length}
          paginate={paginate}
        />

        <CustomerRowOptionsDropDown
          handleRowOptionsDropDown={this.handleRowOptionsDropDown}
          fetchCustomer={this.fetchCustomer}
        />
      </div>
    );
  }
}
