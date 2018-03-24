import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map'

export class MapContainer extends Component {
	render() {
    return (
      <Map
				google={this.props.google}
				locations={this.props.locations}
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
