import React, { Component } from 'react';
import '../App.css';

class DisplayList extends Component {
	state = {
		query: '',
		activeListItem: {}
	}

	updateQuery = (query) => {
		this.setState({ query: query },
			this.filterLocations(this.props.restaurants.restaurants, query)
		)

		// Clear detailed info box if user is typing
		document.getElementById('infoDisplay').style.visibility = 'hidden';
	}

	filterLocations = (allList, query) => {
		// If user enters query then search for matches
		if (query.length > 0) {
			let filter = allList.filter(loc =>
				loc.name.toLowerCase().includes(query.toLowerCase())
			)
			this.props.filterFunc(filter)
		} else {
			// If no query then filteredList contains all restaurants
			this.props.filterFunc(this.props.restaurants.restaurants)
		}
	}

	listItemClicked = (rest, index) => {
		let thisItem = this.props.filteredList[index];

		this.setState({ activeListItem: thisItem })

		// Show details of selected restaurant within sidebar
		document.getElementById('infoDisplay').style.visibility = 'visible';
	}

	render() {
		let filteredRestaurants = this.props.filteredList;
		let selection = this.state.activeListItem;

		return(
			<div id='sidebar'>
				<button className='closeMenu' aria-label='close menu'  onClick={this.props.toggleSidebar}>X</button>
				<div id='search'>
					<input
						id='search-box'
						role='searchbox'
						aria-label='search filter'
						type='text'
						placeholder='Filter restaurants by name'
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
				</div>
				<div>
					{filteredRestaurants.length ?
						filteredRestaurants.map((rest, index) =>
							<button
								className='listItem'
								aria-label='restaurant listing'
								key={index}
								onClick={e => this.listItemClicked(rest, index)}
							>{rest.name}
							</button>
						) : 'No Results Found'
					}
				</div>
				<div id='info-display'>
					<h3>{selection.name}</h3>
					<h3>{selection.street}</h3>
					<h3>{selection.city+', '+selection.state+', '+selection.zip}</h3>
					{selection.url ?
						<a
							aria-label='restaurant website'
							href={selection.url}
							target='_blank'
							rel='noopener noreferrer'>
							{selection.url}
						</a> :
						''
					}
				</div>
			</div>
		);
	}
}

export default DisplayList
