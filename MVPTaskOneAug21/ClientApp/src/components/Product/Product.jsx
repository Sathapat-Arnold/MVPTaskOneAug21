import React, { Component } from "react";
import TableProduct from "./TableProduct";
import CreateProduct from "./CreateProduct";
import Pagination from "../Pagination/Pagination";
import RowOptionsDropDown from "../Pagination/RowOptionsDropDown";
import axios from "axios";
import { Button } from "semantic-ui-react";
import "../../custom.css";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      createProductModal: false,
      currentPage: 1,
      postsPerPage: 5,
    };
  }

  fetchProduct = () => {
    axios
      .get("/api/Product")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          product: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("Component Did mount");
    this.fetchProduct();
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  toggleCreateProductModal = (value) => {
    this.setState({ createProductModal: value });
  };

  handleRowOptionsDropDown = (value) => {
    this.setState({ postsPerPage: value });
  };

  render() {
    const { product, createProductModal, currentPage, postsPerPage } =
      this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div>
        <CreateProduct
          open={createProductModal}
          toggleCreateProductModal={this.toggleCreateProductModal}
          fetchProduct={this.fetchProduct}
        />

        <h1>Product</h1>

        <Button
          className="create-button"
          primary
          onClick={() => this.toggleCreateProductModal(true)}
        >
          Create Product
        </Button>

        <TableProduct
          productData={product}
          posts={currentPosts}
          fetchProduct={this.fetchProduct}
        />

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={product.length}
          paginate={paginate}
        />

        <RowOptionsDropDown
          handleRowOptionsDropDown={this.handleRowOptionsDropDown}
        />
      </div>
    );
  }
}
