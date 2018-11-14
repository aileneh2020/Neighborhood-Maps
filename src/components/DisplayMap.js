import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../App.css';

const mapKey='AIzaSyBuL7mjc3O3hhrdTWuHRwdKv6k11bUbisk';
const fsClientID='0KIQPKH3YXQ0JVIUFLOKB315XNQ2VNE31YRMWYIRFT42S3CV';
const fsClientSecret='OYN5K2A3JMLM3FHP2OVB3CVK4CLP5FJDPXJNSRPHFJVWDRGV';
const fsVersion='20181108';

class DisplayMap extends Component {
	state = {
		map: null,
		showInfoWindow: false,
		activeMarker: {},
		selectedLoc: {},
		currMarker: {}
	}

	mapLoaded = (map) => {
		this.setState({ map })
	}

	getVenueData = (props, fsData) => {
		// Compare FourSquare data for matching restaurant name
		// Accept names that are longer or shorter versions of same restaurant
		return fsData.response.venues.filter(item =>
			item.name.includes(props.name) || props.name.includes(item.name)
		);
	}

	onMarkerClick = (props, marker) => {
		// Set up fetch URL
		let baseUrl = `https://api.foursquare.com/v2/venues/search?client_id=${fsClientID}&client_secret=${fsClientSecret}&v=${fsVersion}&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
		let headers = new Headers();
		let request = new Request(baseUrl, {
			method: 'GET',
			headers
		});
		let currMarker;

		// Request data from FourSquare for current marker
		fetch(request)
		.then(response => response.json())
		.then(result => {
			let currRestaurant = this.getVenueData(props, result)
			this.setState({
				currMarker: {
					...props,
					fs: currRestaurant[0]
				}
			})

			// If FourSquare data found, search for venue's photo
			if (this.state.currMarker.fs) {
				let detailUrl = `https://api.foursquare.com/v2/venues/${currRestaurant[0].id}/photos?client_id=${fsClientID}&client_secret=${fsClientSecret}&v=${fsVersion}&limit=1`;

				fetch(detailUrl)
				.then(response => response.json())
				.then(result => {
					this.setState({
						currMarker: {
							...currMarker,
							image: result.response.photos
						}
					})
				})
			}
		})

		// Stop animation on any previous active marker
		if (this.state.showInfoWindow) {
			this.state.activeMarker.setAnimation(this.props.google.maps.Animation.null)
		}

		// Add props to activeMarker state, display InfoWindow, make marker bounce
		this.setState({
			selectedLoc: props,
			activeMarker: marker,
			showInfoWindow: true,
		})
		marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
	}

	// Reset activeMarker state and close InfoWindow when "X" is clicked
	onClose = (props) => {
		if (this.state.showInfoWindow) {
			this.state.activeMarker.setAnimation(this.props.google.maps.Animation.null)
			this.setState({
				showInfoWindow: false,
				activeMarker: null
			})
		}
	}

	// Reset activeMarker state and close InfoWindow when map is clicked
	onMapClick = (props) => {
		if (this.state.showInfoWindow) {
			this.state.activeMarker.setAnimation(this.props.google.maps.Animation.null)
			this.setState({
				showInfoWindow: false,
				activeMarker: null
			})
		}
	}

	render() {
		const center = {
			lat: this.props.lat,
			lng: this.props.lng
		}

		return (
			<div id='map-container' role='application' aria-label='Google Maps'>
				<Map
					initialCenter={center}
					zoom={this.props.zoom}
					google={this.props.google}
					onReady={this.mapLoaded}
					onClick={this.onMapClick}
				>
					{this.props.filteredList &&
					this.props.filteredList.map((rest, index) => (
						<Marker
							name={rest.name}
							address={rest.street}
							url={rest.url}
							position={rest.location}
							key={index}
							onClick={this.onMarkerClick}
							animation={this.props.google.maps.Animation.null}
						/>
					))}
						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showInfoWindow}
							onClose={this.onClose}
						>
							<div>
								<h4 className='infoText'>
									{this.state.selectedLoc.name}
								</h4>
								{this.state.selectedLoc.url ?
									<a
										aria-label='restaurant website'
										href={this.state.selectedLoc.url}
										target='_blank'
										rel='noopener noreferrer'>
										{this.state.selectedLoc.url}
									</a> :
									''
								}
								<div className='infoImage'>
									{this.state.currMarker.image ?
										<div>
											<img
											alt={'Photo of ' + this.state.selectedLoc.name}
											src={this.state.currMarker.image.items[0].prefix + 'cap100' + this.state.currMarker.image.items[0].suffix}/>
											<p>Photo by FourSquare</p>
										</div> :
										'No Image Available'
									}
								</div>
							</div>
						</InfoWindow>
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({ apiKey: mapKey })(DisplayMap);
