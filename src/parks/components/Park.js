import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { addToParks } from '../parksApi'



class Park extends Component {
  constructor () {
    super()

    this.state = {
      currentImage: 0
    }
  }

  // allows the user to cycle through available images of the currentPark.
  handleChange = event => {
    // grabs the value of the clicked button
    const change = event.target.value
    // changes currentImage by adding or subtracting one based on the buttons value
    this.setState(prev => {
      return {currentImage: prev.currentImage + Number(change) }
    })
  }

  // allows a user to add a park to their favoriteParks list.
  addFavorite = event => {
    const { user, history, flash, setUser, setFavorites } = this.props

    // grabs the parkCode of the currentPark
    const favorite = event.target.value

    // if the user is signed in, send user info and favorite
    // to the api's update or create endpoint.
    user
      ? addToParks(user, favorite)
        .then(res => res.json())
        .then(res => {
          setFavorites( { favoriteParksData: res.favoriteParksData } )
          return res
        })
        .then(res => {
          setUser(
            {
              userFavorites: res.favoriteParksId,
              email: user.email,
              token: user.token,
              _id: user._id
            }
          )
          return res
        }
        )
        .catch(console.error)
        // otherwise, redirect the user to sign-in
      : history.push('/sign-in')
  }
  // use redirect to stop direct access

  render () {

    const { parks, image, currentPark, user, favoriteParksData } = this.props

    const parkImage = currentPark.images

    const ParkToggleButtonUi = () =>
      favoriteParksData && favoriteParksData.some(fav => fav.parkCode === currentPark.parkCode)
        ? <button onClickCapture={this.addFavorite} value={currentPark.parkCode}>
          Remove { currentPark.name } from Favorite Parks
        </button>
        : <button onClickCapture={this.addFavorite} value={currentPark.parkCode}>
          Add { currentPark.name } to Favorite Parks
        </button>

    // sets the backgroundImage to the url in the currentPark images array at the currentImage index.
    // SHOULD FIND PLACE ON PAGE TO CREDIT THE PHOTOGRAPHER
    const background = { backgroundImage: 'url(' + parkImage[this.state.currentImage].url + ')' }
    return (
      <div className='park' style={background}>
        { currentPark &&
          <React.Fragment>
            <h1>{currentPark.name}</h1>
            <div className='info'>
              <h6>{currentPark.fullName}</h6>
              <p>{currentPark.description}</p>
            </div>
          </React.Fragment>
        }

        <div className='buttons'>
          {/* only display prev and next button when there is an image
            at the currentImage-1 index or currentImage+1 index in the currentPark.images array*/}
          { parkImage[this.state.currentImage - 1] &&
              <button value={-1} onClickCapture={this.handleChange}>
                Prev Picture
              </button> }
          { parkImage[this.state.currentImage + 1] &&
              <button value={1} onClickCapture={this.handleChange}>
                Next Picture
              </button> }
          { user
            ? <ParkToggleButtonUi />
            : <button onClickCapture={this.addFavorite}>
              Sign In to add { currentPark.name } to Favorites Parks List
            </button>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Park)
