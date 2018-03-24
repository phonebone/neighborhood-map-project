import React, { Component } from 'react'

class MarkersList extends Component {
  render() {
		const { markers } = this.props

    return (
			<ul id="markerList">
			{markers.map(marker =>
				<li key={marker.name}>
					<button>{marker.name}</button>
				</li>
			)}
			</ul>
    )
  }
}

export default MarkersList
