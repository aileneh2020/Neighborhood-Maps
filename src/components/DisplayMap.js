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

	// Show InfoWindow
	onMarkerClick = (props, marker, event) =>
		this.setState({
			selectedLoc: props,
			activeMarker: marker,
			showInfoWindow: true,
			allMarkers: []
		})

	// Close InfoWindow
	onClose = (props) => {
		if (this.state.showInfoWindow) {
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
				>
					{this.props.restaurants.restaurants &&
					this.props.restaurants.restaurants.map((rest, index) => (
						<Marker
							name={rest.name}
							position={rest.location}
							key={index}
							onClick={this.onMarkerClick}
						/>
					))}
						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showInfoWindow}
							onClose={this.onClose}>
							<div>
								<h4>{this.state.selectedLoc.name}</h4>
							</div>
						</InfoWindow>
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({apiKey: mapKey})(DisplayMap)
