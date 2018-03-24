import React, { Component } from 'react';

export class Map extends Component {
	state = {
		infoWindow: {}
	}

	componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
    if (prevProps.activeMarker !== this.props.activeMarker) {
      this.populateInfoWindow(this.props.activeMarker);
    }
	}

	populateInfoWindow = () => {
		const marker = this.props.activeMarker;
		console.log(marker);
		// clear infowindow's content
		this.state.infoWindow.setContent('');
		// fetch a Ron Swanson quote
		fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
		// convert response to object
		.then(response => response.json())
		// process the data
		.then(data => {
			const quote = data[0];
			// put the title of the marker and the quote in the infoWindow
			this.state.infoWindow.setContent(`<h4>${marker.title}</h4><p>Thank you for your interest, have a Ron Swanson quote!</p><blockquote>${quote}</blockquote>`);
			// open the infoWindow!
			this.state.infoWindow.open(this.map, marker);
		})
	}

	initMap = () => {
		if (this.props && this.props.google) {
			let map,
					infowindow,
					markers = [];

			const { google, activateMarker } = this.props;

			// create a new Google Maps map and put it in the DOM element with ref 'map'
			map = new google.maps.Map(this.map, {
				center: {lat: 52.0914165, lng: 5.1147089},
				zoom: 16
			});

			// create one info window that the markers can use later on
			infowindow = new google.maps.InfoWindow({content:''});
			this.setState({infoWindow: infowindow});

			// create a marker for every item in the database (JSON file in this case)
			for (let location of this.props.locations){
				const mark = new google.maps.Marker({
					position: location.position,
					// use a longer name if available
					title: location.longName || location.name,
					animation: google.maps.Animation.DROP,
					map: map
				});

				// open the infowindow that when clicking on the marker
				mark.addListener('click', function(){
					activateMarker(mark)
				});

				markers.push(mark);
			}

			this.props.storeMarkers(markers);
		}
	}

	render() {
    return (
      <div id="map" ref={(map) => { this.map = map; }}></div>
    );
  }
}

export default Map
