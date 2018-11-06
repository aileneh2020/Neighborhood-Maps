import React, { Component } from 'react'
import './App.css'
import DisplayMap from './components/DisplayMap'

class App extends Component {
  state = {
    lat: 33.7592028,
    lng: -117.9897071,
    zoom: 13,
  }

  render() {
    return (
      <div className="App">
        <div id='sidebar'></div>
        <div id='main'>
          <div>
            <header>Restaurants in Westminster, CA</header>
          </div>
          <DisplayMap
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
          />
        </div>

      </div>
    );
  }
}

export default App
