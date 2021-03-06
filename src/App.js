import React, { Component } from 'react';
import './App.css';
import DisplayList from './components/DisplayList';
import DisplayMap from './components/DisplayMap';
import restaurants from './data/RestaurantList';


class App extends Component {
  state = {
    lat: 33.7592028,
    lng: -117.9897071,
    zoom: 13,
    restaurantList: restaurants.restaurants,
    filteredList: restaurants.restaurants,
    itemClicked: {},
    sidebarOpen: false
  }

  toggleSidebar = () => {
    if (this.state.sidebarOpen === true) {
      return (
        (document.getElementById("sidebar").style.width = 0),
        this.setState({ sidebarOpen: false })
      );
    }
    else if (this.state.sidebarOpen === false) {
      return (
        (document.getElementById("sidebar").style.width = "320px"),
        this.setState({ sidebarOpen: true })
      );
    }
  }

  updateFilteredList = (filter) => {
    this.setState({ filteredList: filter })
  }

  getItemClicked = (item) => {
    this.setState({itemClicked: item}, () => this.toggleSidebar());
  }

  resetItemClicked = () => {
    this.setState({ itemClicked: {} })
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <button className='menuBtn' aria-label='show menu' onClick={this.toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div id='page-title'>
            <h1>Restaurants near Westminster, CA</h1>
          </div>
        </header>
        <DisplayList
          restaurants={this.state.restaurantList}
          filteredList={this.state.filteredList}
          filterFunc={this.updateFilteredList}
          sidebarOpen={this.state.sidebarOpen}
          toggleSidebar={this.toggleSidebar}
          getItemClicked={this.getItemClicked}
        />
        <DisplayMap
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          restaurants={this.state.restaurantList}
          filteredList={this.state.filteredList}
          itemClicked={this.state.itemClicked}
          resetItemClicked={this.resetItemClicked}
        />
      </div>
    );
  }
}

export default App;
