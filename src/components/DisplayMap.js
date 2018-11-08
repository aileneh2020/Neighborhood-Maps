import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import '../App.css'

const mapKey='AIzaSyBuL7mjc3O3hhrdTWuHRwdKv6k11bUbisk'

class DisplayMap extends Component {
	state = {
		map: null,
		showInfoWindow: false,
		activeMarker: {},
		selectedLoc: {}
	}

	mapLoaded = (map) => {
		this.setState({map})
		this.loadMarkers(this.props.restaurants)
	}

	// Add props of activeMarker to state and show InfoWindow
	onMarkerClick = (props, marker, event) => {
		// Stop animation on any existing marker
		if (this.state.showInfoWindow) {
			this.state.activeMarker.setAnimation(this.props.google.maps.Animation.null)
		}

		this.setState({
			selectedLoc: props,
			activeMarker: marker,
			showInfoWindow: true,
		})
		marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
	}

	// Reset activeMarker state and close InfoWindow
	onClose = (props) => {
		if (this.state.showInfoWindow) {
			this.state.activeMarker.setAnimation(this.props.google.maps.Animation.null)
			this.setState({
				showInfoWindow: false,
				activeMarker: null
			})
		}
	}

	// Close InfoWindow if user clicks anywhere on map
	onMapClick = (props) => {
		if (this.state.showInfoWindow) {
			this.state.activeMarker.setAnimation(this.props.google.maps.Animation.null)
			this.setState({
				showInfoWindow: false,
				activeMarker: null
			})
		}
	}

	loadMarkers = (restaurants) => {
		if (!restaurants) {
			return alert('No restaurants to show')
		}

		restaurants.restaurants.map((restaurant, index) => {
			console.log(restaurant)
		})
	}

	render() {
		const style = {
			height: '100%',
			width: '100%'
		}

		const center = {
			lat: this.props.lat,
			lng: this.props.lng
		}

		return (
			<div id='map'>
				<Map
					style={style}
					initialCenter={center}
					zoom={this.props.zoom}
					google={this.props.google}
					onReady={this.mapLoaded}
					onClick={this.onMapClick}
				>
					{this.props.restaurants.restaurants &&
					this.props.restaurants.restaurants.map((rest, index) => (
						<Marker
							name={rest.name}
							address={rest.street}
							position={rest.location}
							key={index}
							onClick={this.onMarkerClick}
							animation={this.props.google.maps.Animation.null}
						/>
					))}
						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showInfoWindow}
							onClose={this.onClose}>
							<div>
								<h4 className='infoText'>{this.state.selectedLoc.name}</h4>
								<h4 className='infoText'>{this.state.selectedLoc.address}</h4>
							</div>
						</InfoWindow>
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({apiKey: mapKey})(DisplayMap)
