import { IonContent, IonPage, IonSpinner, IonButton } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import './SingleResult.css'

import { AppContext } from '../State'

import { AnimatePresence, motion } from 'framer-motion'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../graphql/queries'

import { CallNumber } from '@ionic-native/call-number'

const { Haptics } = Plugins

const ResultsPage = ({ history, location }) => {
  const { state, dispatch } = useContext(AppContext)

  const [queryFace, setQueryFace] = useState()

  const item = {
    visible: { opacity: [0, 1] },
    hidden: { opacity: 0 }
  }

  const back = () => {
    history.goBack()
  }

  const contactPolice = (number) => {
    CallNumber.callNumber(number)
  }

  const match = location.state.match

  return (
    <motion.div key='resultstab' variants={item} initial='hidden' animate='visible' exit='hidden'>
      <IonPage className='SingleResultPage'>
        <IonContent>
          <div className='ResultsPageContent'>
            <div className='full-width'>
              <div className='matchInfo'>
                <div className='matchPhoto'>
                  <img src={`https://traffick-stop-namus-missing-persons-images.s3.amazonaws.com/${match.caseNumber}.jpg`} />
                </div>
                <div className='matchName'>
                  {match.firstName} {match.lastName}
                </div>
                <div className='confidence'>{match.distance}% confidence</div>

                <div className='agencyBox'>
                  Do you believe this person to be a match? <strong>DO NOT INTERVENE</strong>. See below to contact the police assigned to this case.
                </div>

                <div className='matchInfoBox w-100'>
                  <div>
                    <strong>Missing</strong> {match.dlc}
                  </div>
                  <div>
                    <strong>Height:</strong> {match.height}
                  </div>
                  <div>
                    <strong>Weight:</strong> {match.weight}
                  </div>
                  <div>
                    <strong>Age:</strong> {match.currentAge}
                  </div>
                  <div>
                    <strong>Location: </strong>
                    {match.city}, {match.state}
                  </div>
                  <div>
                    <strong>Eye color:</strong> {match.leftEyeColor}(L), {match.rightEyeColor}(R)
                  </div>
                  <div>
                    <strong>Race:</strong> {match.race}
                  </div>
                  <div>{match.circumstancesOfDisappearance}</div>

                  <div className='mt-2'>
                    <strong>Agency Information</strong>
                    <div>{match.agencyName}</div>
                    <div>Phone: {match.agencyMainPhone}</div>
                    <div>Email: {match.agencyGeneralEmail}</div>
                    <div>Case: {match.agencyCaseNumber}</div>
                  </div>
                </div>
              </div>

              <IonButton color='danger' expand='block' onClick={() => contactPolice(match.agencyMainPhone)} className='mb-3'>
                Contact Police
              </IonButton>

              <IonButton color='dark' expand='block' onClick={back} className='mb-5'>
                Go Back
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </motion.div>
  )
}

export default ResultsPage
