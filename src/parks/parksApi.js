const apiUrl = 'http://localhost:4741'

export const getAllParks = ( user ) => (
  user && user.list
    ? fetch(apiUrl + '/exploreParks/' + user.userList)
    : fetch(apiUrl + '/exploreParks/' + '0')
)
