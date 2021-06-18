import { createSlice } from '@reduxjs/toolkit'

const ENDPOINT = 'https://mobile-staging.gametime.co/v1/'

export const gametimeSlice = createSlice({
  name: 'gametime',
  initialState: {
    queries: {},      // all search terms will be keys in this object
  },
  reducers: {
    createQuery: (state, action) => {
      state.queries[action.payload] = {}
      state.queries[action.payload].status = 'in progress'
    },
    setQueryResults: (state, action) => {
      const term = action.payload.term
      const results = action.payload.data
      state.queries[term].data = results
      if ( ! results ) {
        state.queries[term].status = 'error'
      } else {
        state.queries[term].status = 'success'
      }
    },
  },
})

export const { createQuery, setQueryResults } = gametimeSlice.actions


// thunk
export const query = queryTerm => dispatch => {
  const searchTerm = `${ENDPOINT}search?q=${queryTerm}`

  fetch(searchTerm)
  .then(response => {
    if ( !response.ok ) {
      throw new Error('Network response was not ok')
    } else {
      dispatch(createQuery(queryTerm))
      return response.json()
    }

  })
  .then(data => {
    dispatch(setQueryResults({term: queryTerm, data: data}))
  })
  .catch(error => {
    dispatch(setQueryResults({term: queryTerm, data: null}))
    console.error('Problem fetching data:', error)
  })
}


// selectors
export const selectQueries = state => state.gametime.queries

export default gametimeSlice.reducer;