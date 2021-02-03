import { IonContent, IonPage, IonSpinner } from '@ionic/react'
import { cloudSharp } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'

import './Faces.css'

import { AppContext } from '../State'

import { AnimatePresence, motion } from 'framer-motion'

// Import @tensorflow/tfjs-core
import * as tf from '@tensorflow/tfjs-core'
// Adds the CPU backend to the global backend registry.
import '@tensorflow/tfjs-backend-cpu'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

const { Haptics } = Plugins

const blazeface = require('@tensorflow-models/blazeface')

var Clipper = require('image-clipper')

const FacesPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [faceData, setFaceData] = useState([])
  const [selectedFace, setSelectedFace] = useState(null)

  const imageData = 'data:image/jpeg;base64,' + state.currentPhoto

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.src = url
      im.onload = () => {
        resolve(im)
      }
    })
  }

  const modifyFace = (start, size) => {
    const offsetY = size[0] * 0.3
    const offsetX = size[1] * 0.15

    let TopLeftX = start[0] - offsetX
    let TopLeftY = start[1] - offsetY * 2.5
    let Width = size[0] + offsetX * 2
    let Height = size[1] + offsetY * 2

    return [TopLeftX, TopLeftY, Width, Height]
  }

  async function findFaces() {
    // setFaceData([imageData])

    const image = await loadImage(imageData)

    // Load the model.
    const model = await blazeface.load()
    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
    const returnTensors = false // Pass in `true` to get tensors back, rather than values.
    const predictions = await model.estimateFaces(image, returnTensors)
    if (predictions.length > 0) {
      /*
      `predictions` is an array of objects describing each detected face, for example:
      */

      let faces = []
      let faceProcessingCounter = 0
      for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft
        const end = predictions[i].bottomRight
        const size = [end[0] - start[0], end[1] - start[1]]

        let face = modifyFace(start, size)

        Clipper(imageData, function () {
          this.crop(face[0], face[1], face[2], face[3])
            .quality(100)
            .toDataURL(function (dataUrl) {
              faceProcessingCounter += 1
              faces.push(dataUrl)
              //   faces.push(dataUrl)
              //   faces.push(dataUrl)

              if (faceProcessingCounter === predictions.length) {
                setFaceData(faces)
                if (predictions.length === 1) {
                  setSelectedFace(dataUrl)
                }
              }
            })
        })
      }
    } else {
      dispatch({ type: 'setNoFacesFound', value: true })
      history.replace('/main/camera')
    }
  }

  const selectFace = (idx) => {
    Haptics.impact({
      style: HapticsImpactStyle.Heavy
    })
    setSelectedFace(faceData[idx])
  }

  useEffect(() => {
    findFaces()
  }, [state.currentPhoto])

  return (
    <IonPage className='FacesPage'>
      <IonContent>
        <div className='FacesPageContent'>
          {faceData.length > 1 && selectedFace === null && <h1>Which Person?</h1>}

          <motion.div layout className='FaceGrid'>
            {faceData.length > 1 &&
              selectedFace === null &&
              faceData.map((face, index) => {
                return (
                  <motion.div layout className='faceSelectorBox' onClick={() => selectFace(index)}>
                    <img src={face} />
                  </motion.div>
                )
              })}
          </motion.div>
          {/* </AnimatePresence> */}

          <AnimatePresence>
            {selectedFace !== null && (
              <>
                <motion.div className='selectedFace'>
                  <img src={selectedFace} />
                </motion.div>
                <IonSpinner />
                <h2>Searching</h2>
                <p>We are searching our missing persons databases. If there are any potential matches, you'll see them here.</p>
              </>
            )}
          </AnimatePresence>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default FacesPage
