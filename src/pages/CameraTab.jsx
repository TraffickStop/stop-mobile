import { useContext, useEffect, useState } from 'react'
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast, IonIcon } from '@ionic/react'
import CameraViewfinder from '../components/CameraViewfinder'
import './CameraTab.css'

import { AppContext } from '../State'
import { motion, useAnimation } from 'framer-motion'

import { Camera, Plugins, HapticsImpactStyle, HapticsImpactOptions, Toast } from '@capacitor/core'
import { helpCircle, helpCircleOutline } from 'ionicons/icons'
const { CameraPreview, Haptics } = Plugins

const CameraTab = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [showInstructions, setShowInstructions] = useState(true)
  const tapHandlerOverlayAnimation = useAnimation()

  const pushToOnboarding = () => {
    history.push({
      pathname: '/onboarding',
      state: { gettingHelp: true }
    })
  }

  const handleTap = async () => {
    Haptics.impact({
      style: HapticsImpactStyle.Heavy
    })
    const result = await CameraPreview.capture({ quality: 100 })
    dispatch({
      type: 'setCurrentPhoto',
      value: result.value
    })
    tapHandlerOverlayAnimation
      .start({
        opacity: [0, 1]
      })
      .then(async () => {
        await CameraPreview.stop()
        history.replace('/main/camera/faces')
      })
  }

  useEffect(() => {
    tapHandlerOverlayAnimation.start({
      opacity: [1, 0]
    })
  }, [])

  useEffect(() => {
    if (state.noFacesFound === true) {
      setShowInstructions(false)
    }
  }, [state.noFacesFound])

  return (
    <IonPage>
      <IonContent fullscreen className='CameraTab transparentBackground'>
        <div className='helpButton' onClick={pushToOnboarding}>
          <IonIcon icon={helpCircle} />
        </div>
        <div className='overlayContainer'>
          <div className='viewFinder'></div>
        </div>
        <motion.div animate={tapHandlerOverlayAnimation} className='tapHandlerOverlay' onClick={handleTap}>
          <IonToast isOpen={state.noFacesFound} onDidDismiss={() => dispatch({ type: 'setNoFacesFound', value: false })} duration={3000} message='No Faces Found' position='top' />
        </motion.div>
        {/* <div className='instructionsOverlay'>Tap the screen to take a photo</div> */}
        {showInstructions && (
          <div className='instructionsOverlay'>
            <h1 className='HeavyTitle'>Discreetly take a photo</h1>
            <div className='lowerSection'>
              <strong>Tap the screen to take a photo.</strong>
              <div className='infoText'>Photos will be scanned, processed, and then deleted immediately and never shared.</div>
              <IonButton expand='full' onClick={() => setShowInstructions(false)}>
                Start
              </IonButton>
            </div>
          </div>
        )}
        <CameraViewfinder />
      </IonContent>
    </IonPage>
  )
}

export default CameraTab
