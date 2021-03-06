import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import "semantic-ui-css/semantic.min.css";
import Spinner from "./Spinner.js";
class App extends React.Component {
  constructor(props) {
    super(props);

    // THIS IS THE ONLY TIME we do direct assignment
    // to this.state
    this.state = { lat: null, errorMessage: '' };


  }
  componentDidMount(){
      window.navigator.geolocation.getCurrentPosition(
      position =>this.setState({ lat: position.coords.latitude }),
      err =>this.setState({ errorMessage: err.message })
       );
  };

  // React says we have to define render!!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div><SeasonDisplay lat={this.state.lat}></SeasonDisplay></div>;
    }

    return <Spinner message="Please Accept Location"/>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
