import React, { Component } from 'react'
import '../App.css'

class DisplayList extends Component {


	onButtonClose = () => {
		return document.getElementById('sidebar').style.width = 0
	}

	render() {
		let allRestaurants = this.props.restaurants

		return(
			<div id='sidebar'>
				<a href='javascript:void(0)' className='btnClose' onClick={this.onButtonClose}>&times;</a>
				<div id='search'>
					<input id='searchBox' placeholder={'Search for restaurant'}></input>
					<button className='btnFilter'>{'Filter'}</button>
				</div>
				<div>
					{allRestaurants.restaurants.map((rest, index) =>
						<button className='listItem' key={index}>{rest.name}</button>
					)}
				</div>
			</div>
		)
	}
}

export default DisplayList
