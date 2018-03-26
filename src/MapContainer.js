import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map'

export class MapContainer extends Component {
	// I used the google-maps-react package to include Google Maps. I looked at
	// their documentation at https://github.com/fullstackreact/google-maps-react/
	// to set things up. Basicly just the export at the bottom of this file and
	// using the google prop in the Map component.
	render() {
    return (
      <Map
				google={this.props.google}
				locations={this.props.locations}
				markers={this.props.markers}
				activateMarker={this.props.activateMarker}
				activeMarker={this.props.activeMarker}
				storeMarkers={this.props.storeMarkers}
			/>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBSuE7XZgQPCA_8lF06nQazCpnno12LO_Y'),
	version: '3'
})(MapContainer)
