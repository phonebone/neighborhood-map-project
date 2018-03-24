import React, { Component } from 'react';

export class Map extends Component {
	componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
	}

	populateInfoWindow = (marker, infoWindow) => {
		// clear infowindow's content
		infoWindow.setContent('');
		// fetch a Ron Swanson quote
		fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
		// convert response to object
		.then(response => response.json())
		// process the data
		.then(data => {
			const quote = data[0];
			// put the title of the marker and the quote in the infoWindow
			infoWindow.setContent(`<h4>${marker.title}</h4><p>Thank you for your interest, have a Ron Swanson quote!</p><blockquote>${quote}</blockquote>`);
			// open the infoWindow!
			infoWindow.open(this.map, marker);
		})
	}

	initMap = () => {
		let map,
				infowindow;

		if (this.props && this.props.google) {
			const {google} = this.props;
			const maps = google.maps;
			const populateInfoWindow = this.populateInfoWindow;

			// create a new Google Maps map and put it in the DOM element with ref 'map'
			map = new google.maps.Map(this.map, {
				center: {lat: 52.0914165, lng: 5.1147089},
				zoom: 16
			});

			// create one info window that the markers can use later on
			infowindow = new google.maps.InfoWindow({content:''});

			// create a marker for every item in the database (JSON file in this case)
			for (let marker of this.props.markers){
				const mark = new google.maps.Marker({
					position: marker.position,
					// use a longer name if available
					title: marker.longName || marker.name,
					animation: google.maps.Animation.DROP,
					map: map
				});

				// open the infowindow that when clicking on the marker
				mark.addListener('click', function(){
					// console.log('I clicked a marker!', mark.title);
					populateInfoWindow(mark, infowindow)
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
