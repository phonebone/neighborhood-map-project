import React, { Component } from 'react';

export class Map extends Component {
	state = {
		map: {},
		infoWindow: {}
	}

	componentDidUpdate(prevProps, prevState) {
		// only initialize the map if google has loaded
    if (prevProps.google !== this.props.google) {
      this.initMap();
    }
		// if the active marker has changed, update/populate (and open) the info window
    if (prevProps.activeMarker !== this.props.activeMarker) {
      this.populateInfoWindow(this.props.activeMarker);
    }
		// if the locations change (usually after the user changes the search term)
		// update the shown markers. (hide or show markers depending on the search)
    if (prevProps.locations !== this.props.locations) {
			this.filterDisplayedMarkers()
    }
	}

	filterDisplayedMarkers = () => {
		const { markers, locations } = this.props;

		// hide all markers on the map
		for (let marker of markers) {
			marker.setMap(null);
		}
		// show all the markers that are in the locations array, which contains
		// either all the markers or just the markers that match the search query
		for (let location of locations) {
			let markerArray = markers.filter(marker => marker.title === location.name);
			if(typeof markerArray !== 'undefined' && markerArray.length > 0){
				markerArray[0].setMap(this.state.map);
			}
		}
	}

	populateInfoWindow = () => {
		const marker = this.props.activeMarker;
		const lat = marker.position.lat();
		const lon = marker.position.lng();
		// construct the url for the 3rd party API (openweathermap.org) using the
		// lattitude and longitude of the marker that was selected by the user
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=cbb2bcf4f41d7db1cac72f7b35777814`;

		// make the marker bounce twice when selected
		if (this.props && this.props.google) {
			marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
			setTimeout(()=> {
				marker.setAnimation(null);
			}, 1400);
		}

		// clear infowindow's content
		this.state.infoWindow.setContent('');

		// fetch weather data for location
		fetch(url)
		// convert response to a javascript object
		.then(response => response.json())
		// process the data
		.then(data => {
			let weatherMessage = '';
			// assign values from the API call to variables but set them to undefined
			// if the API did not return a value
			const weather = data.weather[0].description || data.weather[0].main || undefined;
			const wind = {
				deg: data.wind.deg || undefined,
				speed: data.wind.speed || undefined
			};
			const celcius = data.main.temp ? Math.round((data.main.temp - 273.15)*10)/10 : undefined;
			const humidity = data.main.humidity || undefined;

			// for every data point we use, check if it is not undefined (if the API
			// returned something) and if so add it to the info window content
			if(weather !== undefined){
				weatherMessage += `<strong>Weather:</strong> ${weather.toLowerCase()}<br/>`;
			}

			if(wind.deg !== undefined || wind.speed !== undefined){
				weatherMessage += '<strong>Wind:</strong>';
				if(wind.deg !== undefined){
					weatherMessage += `<span id="wind-deg">
					<span style="transform: rotate(${wind.deg}deg);"></span>
					</span>`;
				}
				if(wind.speed !== undefined){
					weatherMessage += `${wind.speed}m/s`;
				}
				weatherMessage += '<br/>';
			}

			if(celcius !== undefined){
				weatherMessage += `<strong>Temperature:</strong> ${celcius} °C<br/>`;
			}

			if(humidity !== undefined) {
				weatherMessage += `<strong>Humidity:</strong> ${humidity}%`;
			}

			// if any data was returned from the API, add it to the infowindow now
			if(weatherMessage){
				weatherMessage = `
				<p id="infowindow-content">
					${weatherMessage}
				</p>
				<p id="data-credits">
					Weather data provided by
					<a href="https://openweathermap.org">
						openweathermap.org
					</a>
				</p>`
			} else {
				// if no data was returned from the API, let the user know
				weatherMessage = 'Sorry, we could not retreive any data.'
			}
			// put the title of the marker and the weather data in the infoWindow
			this.state.infoWindow.setContent(`
				<h3>${marker.title}</h3>
				${weatherMessage}
			`);

			// open the infoWindow!
			this.state.infoWindow.open(this.map, marker);
		})
		// if something went wrong with the request (network error for example)
		// let the user know something went wrong
		.catch(message => {
			this.state.infoWindow.setContent(`
				<h3>${marker.title}</h3>
				<p id="infowindow-content">
					<strong>Oh no!</strong>
					<br/>
					Something went wrong while retreiving the weather data :(
				</p>
			`);
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

			// add the map and the infowindow to the state so other functions can
			// access them (filterDisplayedMarkers and populateInfoWindow to be exact)
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
