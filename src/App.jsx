import { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { HTTP } from '@ionic-native/http'
import { NativeStorage } from '@ionic-native/native-storage'

import MainTabs from './MainTabs'
import Onboarding from './pages/Onboarding'

import { AppContextProvider } from './State'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import './App.css'

import '@capacitor-community/camera-preview'

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const App = () => {
  // const downloadModel = (model_name) => {
  //   console.log('Download block')
  //   // NativeStorage.getItem()

  //   const savedItem = NativeStorage.getItem(model_name)
  //   if (!savedItem || Object.keys(savedItem).length === 0) {
  //     HTTP.get(`https://raw.githubusercontent.com/vladmandic/face-api/master/model/${model_name}.json`, {}, {})
  //       .then((response) => {
  //         // prints 200
  //         console.log('saved block', response.data)
  //         NativeStorage.setItem(model_name, response.data)
  //       })
  //       .catch((err) => {
  //         // prints 403
  //         console.log('error block ... ', err.status)
  //         // prints Permission denied
  //         console.log('error block ... ', err.error)
  //       })
  //   } else {
  //     console.log('already got it block:', NativeStorage.getItem(model_name))
  //   }
  // }

  return (
    <AppContextProvider>
      <IonApp>
        <IonReactRouter>
          <Route path='/onboarding' component={Onboarding} exact={true} />
          <Route path='/main' component={MainTabs} />
          <Route path='/' render={() => <Redirect to='/onboarding' />} exact={true} />
        </IonReactRouter>
      </IonApp>
    </AppContextProvider>
  )
}

export default App
