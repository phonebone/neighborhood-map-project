import React, { Component } from 'react'
import icon from './gmmwo.svg'

class MarkersList extends Component {
	toggleMenu = (e) => {
		const btn = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentElement;
		// const icn = btn.firstChild;
		const nav = btn.parentElement;

		if(nav.classList.contains('is-active')){
			// close nav
			nav.classList.remove('is-active');
		} else {
			// open nav
			nav.classList.add('is-active');
		}
	}

  render() {
		const { locations, markers, activateMarker } = this.props

    return (
			<div id="markerList">
				<button
					id="menutoggle"
					onClick={this.toggleMenu}
				>
					<div className="hamburger"></div>
				</button>
				<div id="list">
					<ul>
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
								<img src={icon} alt="marker icon" className="icon"/>
								{marker.longName || marker.name}
							</button>
						</li>
					)}
					</ul>
				</div>
			</div>
    )
  }
}

export default MarkersList
