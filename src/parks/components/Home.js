import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {
    return (
      <div className='home'>
        <h2>National Park Finder</h2>
        <div className='buttons'>
          <button><Link to="/exploreParks">Explore Parks</Link></button>
          {/*<button>Quiz</button>*/}
        </div>

      </div>
    )
  }
}

export default Home
