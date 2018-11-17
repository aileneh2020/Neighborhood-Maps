import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import '../App.css';

const mapKey='AIzaSyBuL7mjc3O3hhrdTWuHRwdKv6k11bUbisk';
const fsClientID='0KIQPKH3YXQ0JVIUFLOKB315XNQ2VNE31YRMWYIRFT42S3CV';
const fsClientSecret='OYN5K2A3JMLM3FHP2OVB3CVK4CLP5FJDPXJNSRPHFJVWDRGV';
const fsVersion='20181108';

function loadMap() {
	return new Promise((resolve) => {
		window.resolveGoogleMapsPromise = () => {
			resolve(window.google);
			delete window.resolveGoogleMapsPromise;
		}
	});
}

class Map extends Component {
	state = {
		map: null,
		showInfoWindow: false,
		activeMarker: {},
		selectedLoc: {},
		currMarker: {}
	}


	render() {
		if (!this.props.loaded) {
			return <div>Loading...</div>
		}

		return(
			<div id='map-container' role='application' aria-label='Google Maps'>

			</div>
		)
	}
}

export default GoogleApiWrapper({apiKey: mapKey})(Map);
