import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getAllParks } from '../parksApi'



class ExploreParks extends Component {
  constructor () {
    super()

    this.state = {
      parks: [],
      image: null
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    const { user } = this.props

    getAllParks(user)
      .then(res => res.json())
      .then(res => {
        this.setState(
          { parks: res.parks, image: res.parks[0].images[0].url }
        )
        return res
      })
      .then()
      .catch(console.error)
  }

  render () {

    const background = { backgroundImage: 'url(' + this.state.image + ')' }
    return (
      <div className='exploreParks' style={background}>
        { this.state.parks[0] && <h1>{this.state.parks[0].name}</h1>}
        <div className='buttons'>
          <button><Link to="/exploreParks/park">Learn More about Park</Link></button>
        </div>
      </div>
    )
  }
}

export default ExploreParks
