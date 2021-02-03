import React, { useEffect } from 'react'

import './CameraViewfinder.css'

import { Plugins } from '@capacitor/core'
import { CameraPreviewOptions, CameraPreviewFlashMode } from '@capacitor-community/camera-preview'

const { CameraPreview } = Plugins

const CameraViewfinder = (props) => {
  const cameraPreviewOpts = {
    width: window.screen.width,
    height: window.screen.height,
    position: 'rear',
    toBack: true
  }

  const startCamera = async () => {
    await CameraPreview.start(cameraPreviewOpts)
    CameraPreview.setFlashMode({
      flashMode: 'off'
    })
  }

  useEffect(() => {
    startCamera()
  }, [])

  return <></>
}

export default CameraViewfinder
