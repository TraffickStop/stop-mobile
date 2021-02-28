import { IonContent, IonPage, IonSpinner } from '@ionic/react'
import { cloudSharp } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'

import { File } from '@ionic-native/file'

import './Results.css'

import { AppContext } from '../State'

import ReactLoading from 'react-loading'

import { AnimatePresence, motion } from 'framer-motion'

import * as faceapi from 'face-api.js'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

const { Haptics } = Plugins

const ResultsPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [queryFace, setQueryFace] = useState()

  useEffect(() => {
    const imageData = state.selectedFace?.img
    setQueryFace(imageData)
  }, [state.selectedFace])

  return (
    <IonPage className='ResultsPage'>
      <IonContent>
        <div className='ResultsPageContent'>
          <AnimatePresence>
            {state.match === null && (
              <motion.div className='selectedFaceContainer'>
                <motion.div className='selectedFace'>
                  <img src={queryFace} />
                </motion.div>
                <h2>Results</h2>
                <p>This photo did not match any faces in our database. If you see something suspicious, please report it to the police and do not intervene.</p>
              </motion.div>
            )}

            {state.match !== null && (
              <motion.div className='selectedFaceContainer'>
                <motion.div className='selectedFace'>
                  <img src={queryFace} />
                </motion.div>
                <h2>Results</h2>
                <p>This person may be {state.match}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ResultsPage
