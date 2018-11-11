import React, { Component } from 'react'
import '../App.css'

class DisplayList extends Component {
	state = {
		query: '',
		filteredList: null
	}

	updateQuery = (query) => {
		this.setState({ query: query },
			this.filterLocations(this.props.restaurants.restaurants, query)
		)
		console.log(this.state.query)  /**REMOVE**/
	}

	filterLocations = (allList, query) => {
		if (this.state.query === '' || this.state.query === undefined) {
			return this.setState({ filteredList: [] })
		}

		let filter = allList.filter(loc =>
			loc.name.toLowerCase().includes(query.toLowerCase())
		)
		this.setState({ filteredList: filter })
		console.log(filter)  /**REMOVE**/

		if (filter.length > 0) {
			this.setState({ filteredList: filter })
		} else {
			this.setState({ filteredList: [] })
			console.log('no results found')
		}
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
						type='text'
						placeholder='Search for restaurant'
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)} />
					<button className='btnFilter'>{'Filter'}</button>
				</div>
				<div>
					{this.state.query.length ?
						filteredRestaurants.map((rest, index) =>
							<button
								className='listItem'
								key={index}
							>
								{rest.name}
							</button>
						) :
						allRestaurants.map((rest, index) =>
							<button
								className='listItem'
								key={index}
							>
								{rest.name}
							</button>
						)
					}
				</div>
			</div>
		)
	}
}

export default DisplayList
