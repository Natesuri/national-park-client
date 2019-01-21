import apiUrl from '../apiConfig'

// gets the parks from the NPS /parks api endpoint via the app's /exploreParks endpoint.
// The /exploreParks endpoint recieves
// either the user's favoriteParks list (if signed in and has a favoriteParks list),
// the default parks list (if not signed in),
// or a combination of both (if the user is signed in, but has fewer than 10 favorites.)

// userList contains the _id for a user's favoriteParks if they have one.
export const getAllParks = ( user ) => (
  user && user.userList
    ? fetch(apiUrl + '/exploreParks/' + user.userList)
    : fetch(apiUrl + '/exploreParks/' + '0')
)

// if the user has a userList (favoriteParks list)
// then pass in the park that will be used to update the list.
// otherwise create a userList with that item
export const addToParks = (user, favorite) => (

  user.userList
    ? fetch(apiUrl + '/favoriteParks/' + user.userList + '/updateOne', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      },
      body: JSON.stringify({
        favoriteParks: {
          list: favorite
        }
      })
    })
    : fetch(apiUrl + '/favoriteParks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      },
      body: JSON.stringify({
        favoriteParks: {
          list: favorite
        }
      })
    })
)
