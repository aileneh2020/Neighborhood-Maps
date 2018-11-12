import React, { Component } from 'react'
import '../App.css'

class DisplayList extends Component {
	state = {
		query: '',
		// filteredList: this.props.restaurants.restaurants,
		showInfoWindow: this.props.showInfoWindow
	}

	updateQuery = (query) => {
		this.setState({ query: query },
			this.filterLocations(this.props.restaurants.restaurants, query)
		)
		console.log(query)  /**REMOVE**/
	}

	filterLocations = (allList, query) => {
		// if (this.state.query === '' || this.state.query === undefined) {
		// 	return this.setState({ filteredList: [] })
		// }
		if (query.length > 0) {
			let filter = allList.filter(loc =>
				loc.name.toLowerCase().includes(query.toLowerCase())
			)
			this.props.filterFunc(filter)
			// this.setState({ filteredList: filter })
			console.log(filter)  /**REMOVE**/
			// if (filter.length > 0) {
			// 	this.setState({ filteredList: filter })
		} else {
			//this.setState({ filteredList: [] })
			//if no query exist then filteredList equals all restaurants
			// this.setState({ filteredList: allList })
			this.props.filterFunc(this.props.restaurants.restaurants)
			console.log('no search performed, show all restaurants')
		}
	}

	listItemClicked = (rest, index) => {
		let thisItem = this.props.filteredList[index]
		console.log(this.props.filteredList[index])
		// TODO: openinfowindow
		// set infowindow.visible=false from DisplayMap

		this.setState({
			activeMarker: thisItem,
			showInfoWindow: true
		})
		// TODO: filter markers
		// set all markers to visible, when filtered hide
	}

	render() {
		let allRestaurants = this.props.restaurants.restaurants
		let filteredRestaurants = this.props.filteredList

		return(
			<div id='sidebar'>
				<button className='btnClose' onClick={this.props.toggleSidebar}>X</button>
				<div id='search'>
					<input
						id='searchBox'
						aria-label='search filter'
						type='text'
						placeholder='Filter restaurants'
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)} />
					<button className='btnFilter'>{'Filter'}</button>
				</div>
				<div>
					{this.props.filteredList.length ?
						this.props.filteredList.map((rest, index) =>
							<button
								className='listItem'
								key={index}
								onClick={e => this.listItemClicked(rest, index)}
							>{rest.name}
							</button>
						) : 'No Results Found'
					}
				</div>
			</div>
		)
	}
}

export default DisplayList
