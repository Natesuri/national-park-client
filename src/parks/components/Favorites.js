import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { showFavorites } from '../parksApi'
import ParkItem from './ParkItem'

class Favorites extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount () {
    const { favoriteParksData, setFavorites, user } = this.props

    showFavorites(user)
      .then(res => res.json())
      .then(res => {
        setFavorites({favoriteParksData: res.favoriteParksData})
        return res
      })
      .catch(console.error)


  }

  render () {

    const { favoriteParksData, setFavorites, user } = this.props

    return (
      <React.Fragment>
        <ul className='favorites'>
          { favoriteParksData
            ? favoriteParksData.map((park, parkIndex) => (
              <ParkItem key={ parkIndex } park={ park } user={user} setFavorites={ setFavorites } />
            ))
            : <p>You do not have any favorite parks. <Link to={'/exploreParks'}>Go explore some!</Link></p>
          }
        </ul>
      </React.Fragment>
    )
  }
}

export default Favorites
