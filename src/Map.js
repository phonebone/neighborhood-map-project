import React, { Component } from 'react';

export class Map extends Component {
	// componentDidMount(){}
	// componentWillReceiveProps(nextProps){}

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

			// create a marker for every item in the database (JSON file in this case)
			for (let marker of this.props.markers){
				const mark = new google.maps.Marker({
					position: marker.position,
					// use a longer name if available
					title: marker.longName || marker.name,
					animation: google.maps.Animation.DROP,
					map: map
				});
			}
		}
	}

	render() {
    return (
      <div id="map" ref={(map) => { this.map = map; }}></div>
    );
  }
}

export default Map
