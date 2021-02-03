import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { ellipse, square, triangle } from 'ionicons/icons'
import CameraTab from './pages/CameraTab'
import FacesPage from './pages/Faces'
import Tab2 from './pages/Tab2'
import Tab3 from './pages/Tab3'

import { AnimatePresence } from 'framer-motion'

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

// import './tabs.scss'

import { AppContext } from './State'

const MainApp = (props) => {
  const { state, dispatch } = useContext(AppContext)

  return (
    <IonTabs>
      <IonRouterOutlet>
        <AnimatePresence exitBeforeEnter>
          <Route path='/main/:tab(camera)' component={CameraTab} exact />
          <Route path='/main/:tab(camera)/faces' component={FacesPage} exact />
          <Route path='/' render={() => <Redirect to='/main/:tab(camera)' />} exact />
        </AnimatePresence>
      </IonRouterOutlet>

      <IonTabBar slot='bottom' className='tabs'>
        <IonTabButton tab='home' href='/main/camera'>
          <IonIcon icon={ellipse} />
        </IonTabButton>
        <IonTabButton tab='repository' href='/main/upload'>
          <IonIcon icon={triangle} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default MainApp
