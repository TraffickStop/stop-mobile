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

// import * as tf from '@tensorflow/tfjs'
import * as faceapi from '@vladmandic/face-api'

import { Plugins, HapticsImpactStyle } from '@capacitor/core'

var Clipper = require('image-clipper')

const { Haptics } = Plugins

const FacesPage = ({ history }) => {
  const { state, dispatch } = useContext(AppContext)

  const [faceData, setFaceData] = useState([])
  const [selectedFace, setSelectedFace] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [pageLoadTime, setPageLoadTime] = useState(Date.now())

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
    console.log('Find faces')
    const imageData = 'data:image/jpeg;base64,' + state.currentPhoto
    const img = await loadImage(imageData)

    console.log('loaded image')

    let predictions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().withAgeAndGender()

    console.log('Detected faces')

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
    setPageLoadTime(Date.now())
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
      moveToResults()
    } else {
      dispatch({
        type: 'setMatch',
        value: null
      })
      moveToResults()
    }

    // File.writeFile(File.dataDirectory, 'missing_persons.json', fileData)
  }

  const moveToResults = () => {
    const offset = Date.now() - pageLoadTime
    const minTime = 5000
    console.log('offset', offset)
    if (offset < minTime) {
      setTimeout(() => {
        history.push('/main/camera/results')
      }, minTime - offset)
    } else {
      history.push('/main/camera/results')
    }
  }

  useEffect(() => {
    setPageLoadTime(Date.now())
    dispatch({
      type: 'setSelectedFace',
      value: selectedFace
    })

    if (selectedFace !== null) {
      console.log('face', selectedFace.descriptor)
      checkDB(selectedFace.descriptor)
    }
  }, [selectedFace])

  useEffect(() => {
    console.log('Loading...')
    findFaces()
  }, [state.currentPhoto])

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.7
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren'
      }
    }
  }
  const item = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  return (
    <motion.div key='facestab' variants={item} initial='hidden' animate='visible' exit='hidden'>
      <IonPage className='FacesPage'>
        <IonContent>
          {/* <div className='backgroundContent'>
          <img src={backgroundImage} />
        </div> */}
          <div className='FacesPageContent'>
            <AnimatePresence exitBeforeEnter>
              {pageLoading && (
                <motion.div key='loadingBubbles' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ReactLoading type='bubbles' color='#2b2b2b' width={100} />
                </motion.div>
              )}
              {!pageLoading && faceData.length > 1 && selectedFace === null && (
                <motion.div key='SelectorContainerKey' initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} exit={{ opacity: 0 }}>
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
                <motion.div key='SearchingContainerKey' className='selectedFaceContainer' initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} exit={{ opacity: 0 }}>
                  <motion.div className='selectedFaceContainer' initial='hidden' animate='visible' variants={list}>
                    <motion.div className='selectedFace' variants={item}>
                      <img src={selectedFace.img} />
                    </motion.div>
                    <motion.div className='ageGenderPrediction' variants={item}>
                      <div>
                        We predict this is a {selectedFace.age} year old {selectedFace.gender}
                      </div>
                    </motion.div>
                    <motion.div variants={item}>
                      <ReactLoading type='bubbles' color='#2b2b2b' width={80} />
                    </motion.div>

                    <motion.div variants={item} className='selectedFaceContainer'>
                      <h2>Searching</h2>
                      <p variants={item}>We are searching our missing persons databases. If there are any potential matches, you'll see them here.</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </IonContent>
      </IonPage>
    </motion.div>
  )
}

export default FacesPage
