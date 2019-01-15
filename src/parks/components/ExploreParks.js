import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getAllParks } from '../parksApi'



class ExploreParks extends Component {
  constructor () {
    super()

    this.state = {
      parks: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    const { user } = this.props

    getAllParks(user)
      .then(res => res.json())
      .then(res => this.setState(
        { parks: res.parks }
      ))
      .catch(console.error)
  }

  render () {
    return (
      <div className='exploreParks'>
        { this.state.parks[0] && <h1>{this.state.parks[0].name}</h1>}
        <div className='buttons'>
          <button><Link to="/exploreParks/park">Learn More about Park</Link></button>
        </div>
      </div>
    )
  }
}

export default ExploreParks
