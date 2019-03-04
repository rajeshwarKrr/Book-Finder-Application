import React, { Component } from "react";
import BooksList from "./BooksList";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      items: []
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(event) {
    if (event.key === "Enter") this.search();
  }

  search() {
    const query = this.state.query;
    const key = "key=AIzaSyDzJSgN1WapYXNU84aSP_Z3vNv_xV-yXTA";
    const BASE_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&${key}`;
    console.log(BASE_URL);
    fetch(BASE_URL, { method: "GET" })
      .then(response => response.json())
      .then(result => {
        if(result.items === undefined) {
          return;
        }
        let books = result.items.map(item => {
          return {
            image:
              item.volumeInfo.imageLinks !== undefined
                ? item.volumeInfo.imageLinks.thumbnail
                : "",

            title: item.volumeInfo.title ? item.volumeInfo.title : "",
            authors: item.volumeInfo.authors ? item.volumeInfo.authors : "",
            publisher: item.volumeInfo.publisher
              ? item.volumeInfo.publisher
              : "",
            link: item.volumeInfo.infoLink
              ? item.volumeInfo.infoLink
              : "https://books.google.com/"
          };
        });

        this.setState({
          items: books
        });
      });
  }
  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }
  render() {
    return (
      <div>
        <h2>Book Finder</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.search();
          }}
        >
          <input
            type="text"
            placeholder="Search for a book"
            value={this.state.query}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <input type="submit" value="Search" />
        </form>
        <div className="container">
          <div className="row">
            <BooksList propsItems={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}
