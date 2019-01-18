const apiUrl = 'http://localhost:4741'

export const getAllParks = ( user ) => (
  user && user.userList
    ? fetch(apiUrl + '/exploreParks/' + user.userList)
    : fetch(apiUrl + '/exploreParks/' + '0')
)

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
