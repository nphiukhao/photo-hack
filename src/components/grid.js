import React, { Component } from "react";
import config from "../config";

export default class Grid extends Component {
  state = {
    query: "",
    result: [],
  };

  changeQuery = (e, query) => {
    this.setState({
      [query]: e.target.value,
    });
  };

  buildResults = (results) => {
    let resultURL = results.map((result) => {
      return result.urls.raw;
    });
    this.setState({
      result: resultURL,
    });
  };

  searchQuery = (e) => {
    e.preventDefault();
    fetch(
      `${config.API_ENDPOINT}photos?page=1&query=${this.state.query}&client_id=vxbiRTMI00ITDrgmS93sPtEm7UoETCchaFOKN-LAvKk`
    )
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => this.buildResults(res.results));
  };
  render() {
    const { result } = this.state;
    return (
      <div className="grid">
        <div className="open">
          <label htmlFor="query"> search: </label>
          <input
            id="query"
            name="query"
            type="text"
            onChange={(e) => this.changeQuery(e, "query")}
          ></input>
          <button onClick={(e) => this.searchQuery(e)}> hit me </button>
        </div>

        <div className="photo">
          {result.length === 0
            ? null
            : result.map((link, index) => {
                return (
                  <img
                    key={index}
                    src={link}
                    alt="photos of searched"
                    style={{ width: "100%" }}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}
