import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getAllParks } from '../parksApi'



class ExploreParks extends Component {
  constructor () {
    super()

    this.state = {
      parks: [],
      image: null,
      currentPark: null
    }
  }

  handleChange = event => {
    this.setState({
      currentPark: this.state.parks[event.target.value],
      image: this.state.parks[event.target.value].images[0].url
    })
  }

  componentDidMount () {
    const { user } = this.props

    getAllParks(user)
      .then(res => res.json())
      .then(res => {
        this.setState(
          { parks: res.parks,
            image: res.parks[0].images[0].url,
            currentPark: res.parks[0]}
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
        { this.state.currentPark && <h1>{this.state.currentPark.name}</h1>}
        <select name='currentPark' onChange={this.handleChange}>
          { this.state.parks.map((park, parkIndex) => (
            <option key={ parkIndex } value={ parkIndex }>{ park.name }</option>
          )) }
        </select>
        <div className='buttons'>
          <button><Link to="/exploreParks/park">Learn More about Park</Link></button>
        </div>
      </div>
    )
  }
}

export default ExploreParks
