import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getAllParks } from '../parksApi'



class Park extends Component {
  constructor () {
    super()

    this.state = {
      currentImage: 0
    }
  }

  handleChange = (event) => {
    const change = event.target.value
    console.log( this.state.currentImage + Number(change))
    this.setState(prev => {
      return {currentImage: prev.currentImage + Number(change) }
    })
  }

  // use redirect to stop direct access

  render () {

    const { parks, image, currentPark } = this.props

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
          <button>
            { currentPark &&
              <Link to={'/exploreParks/parks/' + currentPark.name }> Add { currentPark.name } to Favorite Parks</Link>
            }
          </button>
        </div>
      </div>
    )
  }
}

export default Park
