import React, { Component } from 'react';
import climbingAreas from './data.json';
import MarkersFilter from './MarkersFilter';
import MarkersList from './MarkersList';
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
	state = {
		query: '',
		searchResults: climbingAreas,
		markers: [],
		activeMarker: {}
	}

	componentDidMount() {
		// unfortunately the google-maps-react package returns the map inside an empty
		// div that I could not give a class name, or even better: remove alltogether.
		// without the following code it has a height of 0 and the map is not visible
		// to the user. Not a very elegant solution, but the best I could think of.
		document.getElementById('map').parentElement.setAttribute("style", "width: 100%; height: 100%;");
	}

	storeMarkers = (markerArray) => {
		// put all the Google Maps markers in state so the List view can access them
		this.setState({markers: markerArray})
	}

	activateMarker = (marker) => {
		// designate a marker as the active marker
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
		let results = climbingAreas.filter(marker => {
			// for each, check if the query matches. If so, return
			let name = marker.name;
			return name.toLowerCase().indexOf(this.state.query.trim().toLowerCase()) !== -1
		});

		this.setState({
			searchResults: results
		})
	}

  render() {
		const { query, searchResults } = this.state

    return (
      <main role="main" className="App">

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

        <MapContainer
					locations={searchResults}
					markers={this.state.markers}
					activateMarker={this.activateMarker}
					activeMarker={this.state.activeMarker}
					storeMarkers={this.storeMarkers}
				/>

      </main>
    );
  }
}

export default App;
