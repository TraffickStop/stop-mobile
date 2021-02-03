import React, { createContext, useReducer, useEffect } from 'react'

let AppContext = createContext()

const initialState = {
  onboarded: false,
  currentPhoto: null,
  noFacesFound: false
}

const persistedState = JSON.parse(localStorage.getItem('persistedState'))

let reducer = (state, action) => {
  switch (action.type) {
    case 'setOnboardingComplete': {
      return { ...state, onboarded: action.value }
    }
    case 'setCurrentPhoto': {
      return { ...state, currentPhoto: action.value }
    }
    case 'setNoFacesFound': {
      return { ...state, noFacesFound: action.value }
    }
    default: {
    }
  }
  return state
}

function AppContextProvider(props) {
  const fullInitialState = {
    ...initialState,
    ...persistedState
  }

  let [state, dispatch] = useReducer(reducer, fullInitialState)
  let value = { state, dispatch }

  useEffect(() => {
    // Persist any state we want to
    localStorage.setItem('persistedState', JSON.stringify(state))
  }, [state])

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

let AppContextConsumer = AppContext.Consumer

export { AppContext, AppContextProvider, AppContextConsumer }
