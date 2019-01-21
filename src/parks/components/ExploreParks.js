import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getAllParks } from '../parksApi'



class ExploreParks extends Component {
  constructor () {
    super()

  }

  // When there is a change via the select input,
  // set the currentPark and image to selected park
  handleChange = event => {
    const { parks, setParks } = this.props
    setParks({
      parks,
      currentPark: parks[event.target.value],
      image: parks[event.target.value].images[0].url
    })
  }

  // run this as soon as the component mounts.
  // might want to revise so that the user sees a loading screen until image is loaded.
  componentDidMount () {
    const { user, setParks, parks, image, currentPark } = this.props

    // calls api exploreParks/:id endpoint.
    // If user is signed in, they get back their favoriteParks in addition to the default parks list.
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

    // sets the .exploreParks background-image to to the state image's url
    const background = { backgroundImage: 'url(' + image + ')' }
    return (
      <div className='exploreParks' style={background}>
        { currentPark && <h1>{currentPark.name}</h1>}
        <div className='buttons'>
          { /* creates a select for each park in the parks state.
            Setting value to the index allows for handleChange to easily
            set currentPark and image to the selected index in parks */ }
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
