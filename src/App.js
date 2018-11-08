import React, { Component } from 'react'
import './App.css'
import DisplayMap from './components/DisplayMap'
import restaurants from './data/RestaurantList'

class App extends Component {
  state = {
    lat: 33.7592028,
    lng: -117.9897071,
    zoom: 14,
    restaurantList: restaurants
  }

  render() {
    return (
      <div className="App">
        <div id='sidebar'></div>
        <div id='main'>
          <div>
            <header>Restaurants near Westminster, CA</header>
          </div>
          <DisplayMap
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
            restaurants={this.state.restaurantList}
          />
        </div>

      </div>
    );
  }
}

export default App
