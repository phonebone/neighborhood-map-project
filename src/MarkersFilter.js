import React, { Component } from 'react'

class MarkersFilter extends Component {
	componentWillReceiveProps(nextProps){
		if(this.props.query !== nextProps.query) {
			this.props.search();
		}
	}

  render() {
		const { query, updateQuery } = this.props

    return (
			<input type="text" value={query} placeholder="filter results" onChange={(event) => updateQuery(event.target.value)} />
    )
  }
}

export default MarkersFilter
