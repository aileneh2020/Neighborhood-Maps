import React, { Component } from "react";
import "./App.css";
import DisplayList from "./components/DisplayList";
import DisplayMap from "./components/DisplayMap";
import restaurants from "./data/RestaurantList";

class App extends Component {
  state = {
    lat: 33.7592028,
    lng: -117.9897071,
    zoom: 14,
    restaurantList: restaurants,
    filteredList: restaurants.restaurants,
    markers: null,
    activeMarker: {},
    clickedItem: [],
    clickedIndex: null,
    showInfoWindow: false,
    sidebarOpen: false,
    markerObjs: []
  };

  toggleSidebar = () => {
    console.log("initial status is " + this.state.sidebarOpen);
    if (this.state.sidebarOpen === true) {
      return (
        (document.getElementById("sidebar").style.width = 0),
        this.setState({ sidebarOpen: false })
      );
    } else if (this.state.sidebarOpen === false) {
      return (
        (document.getElementById("sidebar").style.width = "350px"),
        this.setState({ sidebarOpen: true })
      );
    }
  };

  updateFilteredList = filter => {
    this.setState({
      filteredList: filter
    });
  };

  listItemClicked = (rest, index) => {
    let thisItem = this.state.filteredList[index];
    console.log(thisItem);
    // TODO: openinfowindow
    // set infowindow.visible=false from DisplayMap

    this.setState((state, props) => {
      return {
        clickedItem: rest,
        clickedIndex: index
      };
    }, this.print);

    // trying to attach marker to this item
    // window.google.maps.event.addListener(thisItem, 'click', this.printA)
  };

  print = () => {
    console.log("did status update?");
    // console.log(this.state.clickedIndex)
    // console.log(this.state.clickedItem)
  };

  onMarkerMounted = element => {
    this.setState(
      prevState => ({
        markerObjs: [...prevState.markerObjs, element.marker]
      }),
      () => console.log(this.state.markerObjs)
    );
  };

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
          activeMarker={this.state.activeMarker}
          showInfoWindow={this.state.showInfoWindow}
          listItemClicked={this.listItemClicked}
        />
        <div id="main">
          <div id="header">
            <button className="btnMenu" onClick={this.toggleSidebar}>
              <i className="fas fa-bars" />
            </button>
            <h1>Restaurants near Westminster, CA</h1>
          </div>
          <DisplayMap
            onMarkerMounted={this.onMarkerMounted}
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
            restaurants={this.state.restaurantList}
            filteredList={this.state.filteredList}
            markers={this.state.markers}
            clickedItem={this.state.clickedItem}
            clickedIndex={this.state.clickedIndex}
            showInfoWindow={this.state.showInfoWindow}
          />
        </div>
      </div>
    );
  }
}

export default App;
