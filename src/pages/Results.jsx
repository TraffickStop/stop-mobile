import { IonContent, IonPage, IonSpinner, IonButton } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import './Results.css'

import { AppContext } from '../State'

import { AnimatePresence, motion } from 'framer-motion'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../graphql/queries'

const { Haptics } = Plugins

const ResultsPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [queryFace, setQueryFace] = useState()
  const [faceInfo, setFaceInfo] = useState([])

  useEffect(() => {
    const imageData = state.selectedFace?.img
    setQueryFace(imageData)
  }, [state.selectedFace])

  useEffect(() => {
    if (state.match !== null) {
      let info = []
      const requests = state.match.map(async (m) => {
        const r = await API.graphql({ query: queries.getPeople, variables: { id: m.id } })
        let data = r['data']['getPeople']
        data.distance = Math.round((1 - m.match) * 100)
        info.push(data)
      })

      Promise.all(requests).then(() => {
        info = info.sort((a, b) => a.distance < b.distance)
        setFaceInfo(info)
      })
    }
  }, [state.match])

  const item = {
    visible: { opacity: [0, 1] },
    hidden: { opacity: 0 }
  }

  const backToCamera = () => {
    history.replace('/main/camera')
  }

  const seeMatchDetails = (match) => {
    history.push('/main/camera/results/details', {
      match: match
    })
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
              {faceInfo.length > 0 && (
                <div className='resultsContainer'>
                  <h1 className='pageTitle text-center'>Matches</h1>
                  {faceInfo.length > 0 &&
                    faceInfo.map((match) => {
                      return (
                        <div className='matchBox' onClick={() => seeMatchDetails(match)}>
                          <div className='matchPhoto'>
                            <img src={`https://traffick-stop-namus-missing-persons-images.s3.amazonaws.com/${match.caseNumber}.jpg`} />
                          </div>
                          <div className='matchInfoBox'>
                            <div className='matchName'>
                              {match.firstName} {match.lastName}
                            </div>

                            <div className='smallInfoText'>
                              <div>{match.distance}% confidence</div>
                              <div>Missing {match.dlc}</div>
                              <div>Height: {match.height}</div>
                              <div>Weight: {match.weight}</div>
                              <div>Age: {match.currentAge}</div>
                              <div>
                                {match.city}, {match.state}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}

              {/* (
                <motion.div className='selectedFaceContainer'>
                  <motion.div className='selectedFace'>
                    <img src={queryFace} />
                  </motion.div>
                  <h2>Results</h2>
                  <p>This person may be someone</p>
                </motion.div>
              )} */}

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
