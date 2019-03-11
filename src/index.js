import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

//Vi skickar datan till vår "Childs"
class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err =>
        this.setState({ errorMessage: err.message, spinnerLoader: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
      {
        /*the new value will be put into Seasn display, and rerender it aswell. It will also rerender the children*/
      }
    }
    return <Spinner message="Please accept a location request" />;
  }

  // React says we have to define render!!
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

Spinner.defaultProps = {
  message: "Loading..."
};

ReactDOM.render(<App />, document.querySelector("#root"));
