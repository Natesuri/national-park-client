import apiUrl from '../apiConfig'

// gets the parks from the NPS /parks api endpoint via the app's /exploreParks endpoint.
// The /exploreParks endpoint recieves
// either the user's favoriteParks list (if signed in and has a favoriteParks list),
// the default parks list (if not signed in),
// or a combination of both (if the user is signed in, but has fewer than 10 favorites.)

// userFavorites contains the _id for a user's favoriteParks if they have one.
export const getAllParks = ( user ) => (
  user && user.userFavorites
    ? fetch(apiUrl + '/exploreParks/' + user.userFavorites)
    : fetch(apiUrl + '/exploreParks/' + '0')
)

// if the user has a userFavorites (favoriteParks list)
// then pass in the park that will be used to update the list.
// otherwise create a userFavorites with that item
export const addToParks = (user, favorite) => {


  return user.userFavorites
    ? fetch(apiUrl + '/favoriteParks/' + user.userFavorites + '/updateOne', {
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
}
