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
			<div id="filter">
				<input type="text" value={query} placeholder="filter results" onChange={(event) => updateQuery(event.target.value)} />
				<div className="filterbox-label">
					<img src={icon} className="icon" />
				</div>
			</div>
    )
  }
}

export default MarkersFilter
