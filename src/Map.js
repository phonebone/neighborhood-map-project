import React, { Component } from 'react';

export class Map extends Component {
	state = {
		map: {},
		infoWindow: {}
	}

	componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
    if (prevProps.activeMarker !== this.props.activeMarker) {
      this.populateInfoWindow(this.props.activeMarker);
    }
    if (prevProps.locations !== this.props.locations) {
			this.filterDisplayedMarkers()
    }
	}

	filterDisplayedMarkers = () => {
		const { markers, locations } = this.props;

		for (let marker of markers) {
			marker.setMap(null);
		}
		for (let location of locations) {
			let markerArray = markers.filter(marker => marker.title === location.name);
			if(typeof markerArray !== 'undefined' && markerArray.length > 0){
				markerArray[0].setMap(this.state.map);
			}
		}
	}

	populateInfoWindow = () => {
		const marker = this.props.activeMarker;

		// make the marker bounce twice when selected
		if (this.props && this.props.google) {
			marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
			setTimeout(()=> {
				marker.setAnimation(null);
			}, 1400);
		}

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
				center: {lat: 48.359944, lng: 2.603201},
				zoom: 11,
				styles: [
					{
						"featureType": "administrative",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#444444"
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [
							{
								"color": "#f2f2f2"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "all",
						"stylers": [
							{
								"saturation": -100
							},
							{
								"lightness": 45
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"color": "#ff6a6a"
							},
							{
								"lightness": "0"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ee3123"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#ee3123"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ee3123"
							},
							{
								"lightness": "62"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"lightness": "75"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "transit.station.bus",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "transit.station.rail",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "transit.station.rail",
						"elementType": "labels.icon",
						"stylers": [
							{
								"weight": "0.01"
							},
							{
								"hue": "#ff0028"
							},
							{
								"lightness": "0"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#80e4d8"
							},
							{
								"lightness": "25"
							},
							{
								"saturation": "-23"
							}
						]
					}
				]
			});

			// create one info window that the markers can use later on
			infowindow = new google.maps.InfoWindow({content:''});

			this.setState({
				map: map,
				infoWindow: infowindow
			});

			// create a marker for every item in the database (JSON file in this case)
			for (let location of this.props.locations){
				const mark = new google.maps.Marker({
					position: location.position,
					// use a longer name if available
					title: location.name,
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
