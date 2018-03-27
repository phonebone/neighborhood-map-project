import React, { Component } from 'react'
import icon from './filter-icon.svg'

class MarkersFilter extends Component {
	componentWillReceiveProps(nextProps){
		if(this.props.query !== nextProps.query) {
			this.props.search();
		}
	}

  render() {
		const { query, updateQuery } = this.props

    return (
			<div id="filter" role="search">
				<input type="text" id="filterbox" value={query} placeholder="filter results" role="searchbox" onChange={(event) => updateQuery(event.target.value)} />
				<label htmlFor="filterbox" hidden>Filter the locations that are shown</label>
				<div className="filterbox-label">
					<img src={icon} className="icon" alt="filter icon" />
				</div>
			</div>
    )
  }
}

export default MarkersFilter
