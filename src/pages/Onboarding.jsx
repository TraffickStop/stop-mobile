import React, { useContext, useEffect, useRef, useState } from 'react'
import { IonContent, IonHeader, IonIcon, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react'
import './Onboarding.css'
import { AnimatePresence, motion } from 'framer-motion'

import { AppContext } from '../State'
import { arrowForwardOutline } from 'ionicons/icons'

const Onboarding = ({ history, location }) => {
  const { state, dispatch } = useContext(AppContext)
  const slidesRef = useRef()

  const [nextButton, setNextButton] = useState(true)

  useEffect(() => {
    if (state.onboarded === true) {
      if (location.state && location.state.gettingHelp && location.state.gettingHelp === true) {
      } else {
        history.replace('/main/camera')
      }
    }
  }, [])

  const nextSlide = async () => {
    let activeSlide = await slidesRef.current.getActiveIndex()
    if (activeSlide === 2) {
      setNextButton(false)
    }
    slidesRef.current.slideNext()
  }

  const slideDidChange = async () => {
    let active_slide = await slidesRef.current.getActiveIndex()
    if (active_slide === 3) {
      setNextButton(false)
    } else {
      setNextButton(true)
    }
  }

  return (
    <IonPage className='ion-page-ipad-compatibility'>
      <IonContent fullscreen className='ion-padding' scroll-y='false'>
        <IonSlides ref={slidesRef} onIonSlideDidChange={slideDidChange}>
          <IonSlide>
            <div className='slide'>
              <img src='assets/facial-recognition.svg' />
              <h2>Traffick Stop</h2>
              <p>Use facial recognition to identify missing people, or upload information about a loved one who has gone missing.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='slide'>
              <img src='assets/group-identify.svg' className='biggerImage' />
              <h2>Identify</h2>
              <p>If you see someone in a situation that doesn't seem right, you can scan their face across the database of missing people</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='slide'>
              <img src='assets/take-photo.svg' />
              <h2>Take a photo</h2>
              <p>Discreetly take a clear photo of their face and scan for matches. These photos are deleted immediately after scanning.</p>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='slide'>
              <img src='assets/results.svg' className='biggerImage' />
              <h2>Results</h2>
              <p>
                You will then be shown a list of possible matches. If you determine that you have identified a missing person, <strong>do not intervene in the situation.</strong> Contact local police or the detectives assigned to their case.
              </p>
            </div>
          </IonSlide>
        </IonSlides>
        <AnimatePresence>
          {nextButton && (
            <motion.div className='next-button ion-ipad-compatibility' onClick={nextSlide} initial={{ opacity: 1, scale: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }}>
              Next
            </motion.div>
          )}
        </AnimatePresence>

        {!nextButton && (
          <motion.div
            className='ready-button'
            animate={{ scale: [0.9, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            // ={{ scale: 0.9, opacity: 0 }}
            onClick={() => {
              dispatch({ type: 'setOnboardingComplete', value: true })
              history.replace('/main/camera')
            }}>
            Next <IonIcon icon={arrowForwardOutline} />
          </motion.div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Onboarding
