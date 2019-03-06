import React, { Component } from "react";
export default class BooksList extends Component {
  render() {
    return (
      <div class="row">
        {this.props.propsItems.map((item, i) => {
          return (
            <div className="col-4">
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="image-responsive"
                />
              </div>
              <div className="">{item.title} </div>
              <p>By: {item.authors}</p>
              <p>Published By: {item.publisher}</p>
              <a href={item.link} target="_blank">
                See this Book
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
