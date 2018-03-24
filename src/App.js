import React, { Component } from 'react';
import bicycleParkingData from './data.json';
import MarkersFilter from './MarkersFilter';
import MarkersList from './MarkersList';
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
	state = {
		query: '',
		searchResults: bicycleParkingData,
		markers: [],
		activeMarker: {}
	}

	storeMarkers = (markerArray) => {
		this.setState({markers: markerArray})
	}

	activateMarker = (marker) => {
		this.setState({activeMarker: marker});
	}

	updateQuery = (term) => {
		if(term) {
      this.setState({ query: term })
    } else {
      this.setState({ query: '' })
    }
	}

	search = () => {
		// loop over all titles in markers array
		let results = bicycleParkingData.filter(marker => {
			// for each, check if the query matches. If so, return
			let name = marker.longName || marker.name;
			return name.toLowerCase().indexOf(this.state.query.trim().toLowerCase()) !== -1
		});

		this.setState({
			searchResults: results
		})
	}

  render() {
		const { query, searchResults } = this.state

    return (
      <div className="App">

				<div id="controls">

					<MarkersFilter
						query={query}
						updateQuery={this.updateQuery}
						search={this.search}
					/>

					<MarkersList
						locations={searchResults}
						activateMarker={this.activateMarker}
						markers={this.state.markers}
					/>

				</div>

        <MapContainer
					className='mapContainer'
					locations={searchResults}
					markers={this.state.markers}
					activateMarker={this.activateMarker}
					activeMarker={this.state.activeMarker}
					storeMarkers={this.storeMarkers}
				/>

      </div>
    );
  }
}

export default App;
