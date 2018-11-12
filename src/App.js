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
    filteredList: restaurants.restaurants,
    markers: null,
    sidebarOpen: false
  }

  toggleSidebar = () => {
    console.log('initial status is ' + this.state.sidebarOpen)
    if (this.state.sidebarOpen === true) {
      return document.getElementById('sidebar').style.width = 0,
      this.setState({sidebarOpen: false})
    } else if (this.state.sidebarOpen === false) {
      return document.getElementById('sidebar').style.width = '350px',
      this.setState({sidebarOpen: true})
    }
  }

  updateFilteredList = (filter) => {
    this.setState({
      filteredList: filter
    })
  }

  render() {
    return (
      <div className="App">
        <DisplayList
          restaurants={this.state.restaurantList}
          filteredList={this.state.filteredList}
          filterFunc={this.updateFilteredList}
          sidebarOpen={this.state.sidebarOpen}
          toggleSidebar={this.toggleSidebar}
          markers={this.state.markers}
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
            filteredList={this.state.filteredList}
            markers={this.state.markers}
          />
        </div>
      </div>
    );
  }
}

export default App
