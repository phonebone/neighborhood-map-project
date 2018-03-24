import React, { Component } from 'react';
import bicycleParkingData from './data.json';
import MarkersList from './MarkersList';
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
	state = {
		markers: [],
		activeMarker: {}
	}

	storeMarkers = (markerArray) => {
		this.setState({markers: markerArray})
	}

	activateMarker = (marker) => {
		this.setState({activeMarker: marker});
	}

  render() {
    return (
      <div className="App">
				<div id="controls">
					<MarkersList
					locations={bicycleParkingData}
					activateMarker={this.activateMarker}
					markers={this.state.markers}
					/>
				</div>
        <MapContainer
					className='mapContainer'
					locations={bicycleParkingData}
					activateMarker={this.activateMarker}
					activeMarker={this.state.activeMarker}
					storeMarkers={this.storeMarkers}
				/>
      </div>
    );
  }
}

export default App;
