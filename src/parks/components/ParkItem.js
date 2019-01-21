import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

class ParkItem extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {

    const { park, updateParks } = this.props

    return (
      <li>{ park && park.name}</li>
    )
  }
}

export default ParkItem
