import React, { Component } from "react";
import TableStore from "./TableStore";
import CreateStore from "./CreateStore";
import StorePagination from "./StorePagination";
import StoreRowOptionsDropDown from "./StoreRowOptionsDropDown";
import axios from "axios";
import { Button } from "semantic-ui-react";
import "../../custom.css";

export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
      createStoreModal: false,
      currentPage: 1,
      postsPerPage: 5,
    };
  }

  fetchStore = () => {
    axios
      .get("/api/Store")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          store: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("Component Did mount");
    this.fetchStore();
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  toggleCreateStoreModal = (value) => {
    this.setState({ createStoreModal: value });
  };

  handleRowOptionsDropDown = (value) => {
    this.setState({ postsPerPage: value });
  };

  render() {
    const { store, createStoreModal, currentPage, postsPerPage } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = store.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div>
        <CreateStore
          open={createStoreModal}
          toggleCreateStoreModal={this.toggleCreateStoreModal}
          fetchStore={this.fetchStore}
        />

        <h1>Store</h1>

        <Button
          className="create-button"
          primary
          onClick={() => this.toggleCreateStoreModal(true)}
        >
          Create Store
        </Button>

        <TableStore
          storeData={store}
          posts={currentPosts}
          fetchStore={this.fetchStore}
        />

        <StorePagination
          postsPerPage={postsPerPage}
          totalPosts={store.length}
          paginate={paginate}
        />

        <StoreRowOptionsDropDown
          handleRowOptionsDropDown={this.handleRowOptionsDropDown}
          fetchStore={this.fetchStore}
        />
      </div>
    );
  }
}
