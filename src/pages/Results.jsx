import { IonContent, IonPage, IonSpinner, IonButton } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import './Results.css'

import { AppContext } from '../State'

import { AnimatePresence, motion } from 'framer-motion'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

const { Haptics } = Plugins

const ResultsPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [queryFace, setQueryFace] = useState()

  useEffect(() => {
    const imageData = state.selectedFace?.img
    setQueryFace(imageData)
  }, [state.selectedFace])

  const item = {
    visible: { opacity: [0, 1] },
    hidden: { opacity: 0 }
  }

  const backToCamera = () => {
    history.replace('/main/camera')
  }

  return (
    <motion.div key='resultstab' variants={item} initial='hidden' animate='visible' exit='hidden'>
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

              <div className='full-width'>
                <IonButton color='dark' expand='block' onClick={backToCamera}>
                  Start Over
                </IonButton>
              </div>
            </AnimatePresence>
          </div>
        </IonContent>
      </IonPage>
    </motion.div>
  )
}

export default ResultsPage
