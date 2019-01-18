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

  handleChange = event => {
    const change = event.target.value
    console.log( this.state.currentImage + Number(change))
    this.setState(prev => {
      return {currentImage: prev.currentImage + Number(change) }
    })
  }

  addFavorite = event => {
    const { user, history, flash, setUser } = this.props

    const favorite = event.target.value


    user
      ? addToParks(user, favorite)
        .then(res => res.json())
        .then(res => {
          setUser(
            {
              userList: res.favoriteParks._id,
              email: user.email,
              token: user.token,
              _id: user._id
            }
          )
          return res
        }
        )
        .catch(console.error)
      : history.push('/sign-in')
  }
  // use redirect to stop direct access

  render () {

    const { parks, image, currentPark, user } = this.props

    const parkImage = currentPark.images

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
          { parkImage[this.state.currentImage - 1] &&
              <button value={-1} onClickCapture={this.handleChange}>
                Prev Picture
              </button> }
          { parkImage[this.state.currentImage + 1] &&
              <button value={1} onClickCapture={this.handleChange}>
                Next Picture
              </button> }
          { currentPark &&
            <button onClickCapture={this.addFavorite} value={currentPark.parkCode}>
              Add { currentPark.name } to Favorite Parks
            </button>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Park)
