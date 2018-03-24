import React, { Component } from 'react';

export class Map extends Component {
	componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
	}

	initMap = () => {
		let map;

		if (this.props && this.props.google) {
			const {google} = this.props;
			const maps = google.maps;

			// create a new Google Maps map and put it in the DOM element with ref 'map'
			map = new google.maps.Map(this.map, {
				center: {lat: 52.0914165, lng: 5.1147089},
				zoom: 16
			});
		}
	}

	render() {
    return (
      <div id="map" ref={(myMap) => { this.map = myMap; }}></div>
    );
  }
}

export default Map
