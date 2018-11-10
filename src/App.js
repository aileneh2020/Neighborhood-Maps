import React, { Component } from 'react'
import './App.css'
import DisplayList from './components/DisplayList'
import DisplayMap from './components/DisplayMap'
import restaurants from './data/RestaurantList'

class App extends Component {
  state = {
    lat: 33.7592028,
    lng: -117.9897071,
    zoom: 14,
    restaurantList: restaurants,
    sidebarOpen: false
  }

  toggleSidebar = (state) => {
    if (!this.state.sidebarOpen) {
      return document.getElementById('sidebar').style.width = '350px'
      this.setState({sidebarOpen: true})
    } else {
      return document.getElementById('sidebar').style.width = 0
      this.setState({sidebarOpen: false})
    }
  }

  render() {
    return (
      <div className="App">
        <DisplayList
          restaurants={this.state.restaurantList}
        />
        <div id='main'>
          <div id='header'>
            <button className='btnMenu' onClick={this.toggleSidebar}><i className="fas fa-bars"></i></button>
            <h1>Restaurants near Westminster, CA</h1>
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
