import React, { Component } from 'react'
import '../App.css'

class DisplayList extends Component {
	state = {
		query: '',
		filteredList: this.props.restaurants.restaurants
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
			this.setState({ filteredList: filter })
			console.log(filter)  /**REMOVE**/
			// if (filter.length > 0) {
			// 	this.setState({ filteredList: filter })
		} else {
			//this.setState({ filteredList: [] })
			//if no query exist then filteredList equals all restaurants
			this.setState({ filteredList: allList })
			console.log('no search, filtered list is '+ this.state.filteredList)
		}
	}

	listItemClicked = (index) => {
		console.log(this.state.filteredList[index])
		// TODO: openinfowindow
	}

	render() {
		let allRestaurants = this.props.restaurants.restaurants
		let filteredRestaurants = this.state.filteredList

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
					{this.state.filteredList.length ?
						filteredRestaurants.map((rest, index) =>
							<button
								className='listItem'
								key={index}
								onClick={e => this.listItemClicked(index)}
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
