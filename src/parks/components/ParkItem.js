import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

class ParkItem extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {

    const { park, setFavorites } = this.props

    return (
      <li>{ park.fullName }</li>
    )
  }
}

export default ParkItem
