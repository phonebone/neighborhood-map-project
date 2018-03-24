import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map'

export class MapContainer extends Component {
	render() {
		const { markers, google } = this.props

    return (
      <Map
				google={google}
				markers={markers}
			/>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBSuE7XZgQPCA_8lF06nQazCpnno12LO_Y'),
	version: '3'
})(MapContainer)
