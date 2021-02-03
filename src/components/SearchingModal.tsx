import React from 'react';
import { IonImg, IonSpinner, IonButton, IonItem } from '@ionic/react';
import CSS from 'csstype';

interface Props {
    capturePhoto?: ImageData,
    setShowModal: () => void
}

class SearchingModal extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    private stockPhoto = 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'

    render() {
        return (
            <div style={this.SearchingModalStyle}>
              <h1>
                  Searching...
              </h1>
              <div style={this.ImageContainerStyle}>
                <IonImg src={this.stockPhoto} />
              </div>
              <div>
                <IonSpinner name="bubbles" style={this.SpinnerStyle} />
              </div>
              <p>
                  We are searching all missing persons databases. If there are any potential matches. You'll see them here.
              </p>

              {/* Button for testing the Modal */}
              <IonButton expand="block" onClick={this.props.setShowModal}>Close Modal</IonButton>
              
              <IonItem routerLink="/results">
              <IonButton expand="block" onClick={this.props.setShowModal}>Go to results</IonButton>
              </IonItem>
            
            </div>
        );
      };

    private SearchingModalStyle: CSS.Properties = {
        color: 'black',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        margin: '8rem 0 8rem 0',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',    
    }

    private ImageContainerStyle: CSS.Properties = {
        textAlign: 'center',
        padding: '2rem'
    }

    private SpinnerStyle: CSS.Properties = {
        transform: 'scale(1.5)'
    }


    }



export default SearchingModal;
