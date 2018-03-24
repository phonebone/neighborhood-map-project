import React, { Component } from 'react';
import bicycleParkingData from './data.json';
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer
					className='mapContainer'
					markers={bicycleParkingData}
				/>
      </div>
    );
  }
}

export default App;
