import { IonContent, IonPage, IonSpinner } from '@ionic/react'
import { cloudSharp } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'

import { File } from '@ionic-native/file'

import './Faces.css'

import { AppContext } from '../State'

import ReactLoading from 'react-loading'

import { AnimatePresence, motion } from 'framer-motion'

// Import @tensorflow/tfjs-core
// import * as tf from '@tensorflow/tfjs-core'
// Adds the CPU backend to the global backend registry.
// import '@tensorflow/tfjs-backend-cpu'
// import '@tensorflow/tfjs-node'
// import '@tensorflow/tfjs-backend-webgl'

import * as faceapi from 'face-api.js'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

var Clipper = require('image-clipper')

const { Haptics } = Plugins

const FacesPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [faceData, setFaceData] = useState([])
  const [selectedFace, setSelectedFace] = useState(null)
  const [selectedFaceAge, setSelectedFaceAge] = useState(null)
  const [selectedFaceGender, setSelectedFaceGender] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.src = url
      im.onload = function () {
        resolve(im)
      }
    })
  }

  async function findFaces() {
    const imageData = 'data:image/jpeg;base64,' + state.currentPhoto
    const img = await loadImage(imageData)

    const MODEL_URL = '/models'

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    await faceapi.loadFaceDetectionModel(MODEL_URL)
    await faceapi.loadAgeGenderModel(MODEL_URL)

    let predictions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().withAgeAndGender()

    setPageLoading(false)

    if (predictions.length > 0) {
      /*
      `predictions` is an array of objects describing each detected face, for example:
      */

      let faces = []
      let faceProcessingCounter = 0

      const clipFace = (imgData, f) => {
        const box = f.detection._box

        const height = 200
        const newWidth = (height * box._width) / box._height

        Clipper(imgData, function () {
          this.crop(box._x, box._y, box._width, box._height)
            .quality(100)
            .resize(newWidth, height)
            .toDataURL(function (dataUrl) {
              const faceResult = {
                img: dataUrl,
                gender: f.gender,
                age: Math.round(f.age),
                descriptor: f.descriptor
              }

              faceProcessingCounter += 1
              faces.push(faceResult)
              if (faceProcessingCounter === predictions.length) {
                setFaceData(faces)
                if (predictions.length === 1) {
                  setSelectedFace(faceResult)
                }
              }
            })
        })
      }

      for (let i = 0; i < predictions.length; i++) {
        const face = predictions[i]
        clipFace(imageData, face)
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
    console.log(faceData[idx].descriptor)
  }

  const checkDB = async (faceDescriptor) => {
    const file_response = await File.readAsText(File.dataDirectory, 'missing_persons.json')
    const missing_persons = JSON.parse(file_response)

    const labeledDescriptors = missing_persons.data.map((person) => {
      const des = Object.values(person.descriptor)
      const desarr = new Float32Array(des)
      return new faceapi.LabeledFaceDescriptors(person.name, [desarr])
    })

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)

    const match = faceMatcher.findBestMatch(faceDescriptor)
    console.log('match', match)

    if (match._label !== 'unknown') {
      dispatch({
        type: 'setMatch',
        value: match._label
      })
      history.push('/main/camera/results')
    } else {
      dispatch({
        type: 'setMatch',
        value: null
      })
      history.push('/main/camera/results')
    }

    // File.writeFile(File.dataDirectory, 'missing_persons.json', fileData)
  }

  useEffect(() => {
    dispatch({
      type: 'setSelectedFace',
      value: selectedFace
    })
    if (selectedFace !== null) {
      checkDB(selectedFace.descriptor)
    }
  }, [selectedFace])

  useEffect(() => {
    findFaces()
  }, [state.currentPhoto])

  return (
    <IonPage className='FacesPage'>
      <IonContent>
        {/* <div className='backgroundContent'>
          <img src={backgroundImage} />
        </div> */}
        <div className='FacesPageContent'>
          <AnimatePresence exitBeforeEnter>
            {pageLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ReactLoading type='bubbles' color='#22a6b3' width={100} />
              </motion.div>
            )}
            {!pageLoading && faceData.length > 1 && selectedFace === null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1>Which Person?</h1>

                <div className='FaceGrid'>
                  {faceData.length > 1 &&
                    selectedFace === null &&
                    faceData.map((face, index) => {
                      return (
                        <div key={`face${index}`} className='faceSelectorBox' onClick={() => selectFace(index)}>
                          <img src={face.img} />
                        </div>
                      )
                    })}
                </div>
              </motion.div>
            )}
            {!pageLoading && selectedFace !== null && (
              <motion.div className='selectedFaceContainer' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <motion.div className='selectedFace'>
                  <img src={selectedFace.img} />
                </motion.div>
                <motion.div className='ageGenderPrediction' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div>
                    We predict this is a {selectedFace.age} year old {selectedFace.gender}
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ReactLoading type='bubbles' color='#22a6b3' width={80} />
                </motion.div>

                <h2>Searching</h2>
                <p>We are searching our missing persons databases. If there are any potential matches, you'll see them here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default FacesPage
