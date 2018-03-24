import React, { Component } from 'react'

class MarkersList extends Component {
  render() {
		const { locations, markers, activateMarker } = this.props

    return (
			<ul id="markerList">
			{locations.map(marker =>
				<li key={marker.name}>
					<button
						onClick={() =>
							activateMarker(
								markers.filter(m => {
									let name = marker.longName || marker.name;
									return m.title === name;
								})[0]
							)}>
						{marker.longName || marker.name}
					</button>
				</li>
			)}
			</ul>
    )
  }
}

export default MarkersList
