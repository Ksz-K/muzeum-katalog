import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class PageNotFound extends Component {
  state = {
    counter: 7,
  };

  componentDidMount = () => {
    const intervalId = setInterval(this.countdown, 1000);
    this.setState({ intervalId });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };
  countdown = () => {
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return (
      <div className="PageNotFound" style={{ marginTop: "10vh" }}>
        <h1>
          Takiej ścieżki w tym serwisie nie ma...{" "}
          <code style={{ color: "#cba" }}>{this.props.location.pathname}</code>{" "}
        </h1>
        <p> Powrót do Strony Głównej za - {this.state.counter} - sek.</p>
        {!this.state.counter && <Redirect to="/" />}
        <img src="https://kszk.vot.pl/deadend.jpg" alt="Dead end" />
      </div>
    );
  }
}

export default PageNotFound;
