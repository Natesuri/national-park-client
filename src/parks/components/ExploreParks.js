import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getAllParks } from '../parksApi'



class ExploreParks extends Component {
  constructor () {
    super()

  }

  handleChange = event => {
    const { parks, setParks } = this.props
    setParks({
      parks,
      currentPark: parks[event.target.value],
      image: parks[event.target.value].images[0].url
    })
  }

  componentDidMount () {
    const { user, setParks, parks, image, currentPark } = this.props

    getAllParks(user)
      .then(res => res.json())
      .then(res => {
        setParks(
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
    const { parks, image, currentPark } = this.props

    const background = { backgroundImage: 'url(' + image + ')' }
    return (
      <div className='exploreParks' style={background}>
        { currentPark && <h1>{currentPark.name}</h1>}
        <div className='buttons'>
          <select name='currentPark' onChange={this.handleChange}>
            { parks.map((park, parkIndex) => (
              <option key={ parkIndex } value={ parkIndex }>{ park.name }</option>
            )) }
          </select>
          <button>
            { currentPark &&
              <Link to={'/exploreParks/parks/' + currentPark.name }>Learn More about { currentPark.name }
              </Link>
            }
          </button>
        </div>
      </div>
    )
  }
}

export default ExploreParks
