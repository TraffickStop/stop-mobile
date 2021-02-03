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

import Jimp from 'jimp'

const { Haptics } = Plugins

const blazeface = require('@tensorflow-models/blazeface')

const FacesPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [faceData, setFaceData] = useState([])
  const [selectedFace, setSelectedFace] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)

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

  const modifyFace = (start, size, landmarks) => {
    const mouth = landmarks[3]
    const left_ear = landmarks[5]
    const right_ear = landmarks[4]
    const right_eye = landmarks[0]
    const left_eye = landmarks[1]

    const eye_level_average = (right_eye[1] + left_eye[1]) / 2

    const face_half_height = Math.abs(eye_level_average - mouth[1])

    const offsetX = size[1] * 0.15
    const offsetY = size[0] * 0.3

    let TopLeftX = start[0] - offsetX
    let TopLeftY = start[1] - offsetY * 2.5 //eye_level_average - face_half_height * 2
    let Width = size[0] + offsetX * 2
    let Height = size[1] + offsetY * 2 //face_half_height * 4

    // const RotatedPoint = rotatePoint(Width / 2, Height / 2, TopLeftX, TopLeftY, rotation)
    // TopLeftX = RotatedPoint[0]
    // TopLeftY = RotatedPoint[1]

    return [TopLeftX, TopLeftY, Width, Height]
  }

  const getFaceRotation = (landmarks) => {
    const rightEye = landmarks[0]
    const leftEye = landmarks[1]

    const X = [leftEye[0], rightEye[0]]
    const Y = [leftEye[1], rightEye[1]]

    const hypotenuse = Math.sqrt(Math.pow(X[1] - X[0], 2) + Math.pow(Y[1] - Y[0], 2))
    const opposite = Y[0] - Y[1]
    const radians = Math.sin(opposite / hypotenuse)
    const degrees = radians * (180 / Math.PI)
    return degrees
  }

  async function findFaces() {
    // setFaceData([imageData])

    // console.log(':::Finding faces')

    const imageData = 'data:image/jpeg;base64,' + state.currentPhoto
    const image = await loadImage(imageData)

    setBackgroundImage(imageData)

    // console.log(':::face loaded')

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

      // console.log(':::', predictions)

      let faces = []
      let faceProcessingCounter = 0
      for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft
        const end = predictions[i].bottomRight
        const size = [end[0] - start[0], end[1] - start[1]]

        // let faceRotation = getFaceRotation(predictions[i].landmarks)
        let face = modifyFace(start, size, predictions[i].landmarks)

        let imageBuffer = Buffer.from(state.currentPhoto, 'base64')
        // let imageBuffer = Buffer.from(faceimage.replace('data:image/jpeg;base64,', ''), 'base64')

        Jimp.read(imageBuffer, (err, img) => {
          if (err) throw err
          img
            // .rotate(faceRotation)
            .crop(face[0], face[1], face[2], face[3])

            .getBase64(Jimp.AUTO, (err, res) => {
              faceProcessingCounter += 1
              faces.push(res)
              if (faceProcessingCounter === predictions.length) {
                setFaceData(faces)
                if (predictions.length === 1) {
                  setSelectedFace(res)
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

  // const testFace = async () => {
  //   const img = await Jimp.read('https://images.unsplash.com/photo-1542897730-cc0c1dd8b73b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80')

  //   img
  //     .rotate(-10)
  //     .crop(img.getWidth() / 3, img.getHeight() / 3, img.getWidth() / 2, img.getHeight() / 2)
  //     // .crop(face[0], face[1], face[2], face[3])

  //     .getBase64(Jimp.AUTO, (err, res) => {
  //       // setSelectedFace(res)

  //       findFaces(res)

  //       // console.log(res)
  //     })
  // }

  useEffect(() => {
    findFaces()
  }, [state.currentPhoto])

  return (
    <IonPage className='FacesPage'>
      <IonContent>
        <div className='backgroundContent'>
          <img src={backgroundImage} />
        </div>
        <div className='FacesPageContent'>
          {faceData.length > 1 && selectedFace === null && <h1>Which Person?</h1>}

          <motion.div layout className='FaceGrid'>
            {faceData.length > 1 &&
              selectedFace === null &&
              faceData.map((face, index) => {
                return (
                  <motion.div layout key={`face${index}`} className='faceSelectorBox' onClick={() => selectFace(index)}>
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

function rotatePoint(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy
  return [nx, ny]
}
