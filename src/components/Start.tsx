import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
    CameraPhoto, CameraSource } from '@capacitor/core';
import CSS from 'csstype';
import { IonButton, IonModal, IonText } from "@ionic/react";
import React from "react";
import { constants } from '../core/constants';
import CameraFocus from './graphics/CameraFocus';
import examplePhoto from '../assets/imgs/example-photo.png';
import SearchingModal from './SearchingModal';

const { Camera, Filesystem, Storage } = Plugins;


interface StartProps {}

interface IState {
    showModal: boolean;
}

class Start extends React.Component<any, IState> {

    state = {
        showModal: false
    }

    private capturedPhoto: CameraPhoto | null = null;


    private capturePhoto = async () => {
        this.capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri, 
            source: CameraSource.Camera, 
            quality: 100 
        });
    }

    public setShowModal = () => {
        this.setState(current => ({showModal: !current.showModal}))
    }

    render() {
        return (
            <div style={this.componentStyle}>
                <IonText color="dark" style={this.titleStyle}>
                    <h1>Discreetly take a photo</h1>
                </IonText>
                <CameraFocus width={150} height={150} color={'white'} style={this.cameraFocusStyle}></CameraFocus>
                <IonText color="dark">
                    <p>We will securely upload, process, then immediately delete this photo.</p>
                    <p>We will show you potential matches of missing people.</p>
                </IonText>
                <IonButton expand="block" onClick={this.capturePhoto}>Start</IonButton>
                
                {/* Button for testing the Modal only  */}
                <IonButton expand="block" onClick={this.setShowModal}>Test Searching Modal</IonButton>
                
                <IonModal isOpen={this.state.showModal} animated={false}>
                    <SearchingModal setShowModal={this.setShowModal} />
                </IonModal>
            </div>
        )
    }

    private componentStyle: CSS.Properties = {
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,1)), url(${examplePhoto}) no-repeat`,
        backgroundSize: 'cover',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        maxWidth: constants.CONTAINER_MAX_WIDTH,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
    }

    private titleStyle: CSS.Properties = {
        alignSelf: 'center',
        margin: '3rem 0',
    }

    private cameraFocusStyle: CSS.Properties = {
        alignSelf: 'center',
        marginBottom: '3rem',
    }
}

export default Start;