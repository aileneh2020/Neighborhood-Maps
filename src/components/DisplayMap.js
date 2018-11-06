import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import '../App.css'

const mapKey='AIzaSyBuL7mjc3O3hhrdTWuHRwdKv6k11bUbisk'

class DisplayMap extends Component {
	state = {

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
				>
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({apiKey: mapKey})(DisplayMap)
