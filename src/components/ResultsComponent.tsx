import React from 'react';
import { IonImg, IonSpinner, IonButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import CSS from 'csstype';
import SingleResult from './SingleResultComponent';

interface Props {}

interface State {
    showAlert: boolean
}

export default class ResultsComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        showAlert: false
    }

    private stockPhoto = 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'

    public count = [1,2,3,4]

    public triggerAlert = () => {
        this.setState(current => ({showAlert: !current.showAlert}))
        
    }

    render() {
        return (
            <div style={this.resultComponentStyle}>
            <IonGrid>
                <IonRow>
                    <h1>We found a high probability match</h1>
                </IonRow>
                {this.count.map(num => <SingleResult key={num} photo={this.stockPhoto} />)}
                <IonRow className="ion-justify-content-center">
                    <div style={this.resultButtonStyle}>
                        <IonButton color="danger" onClick={this.triggerAlert}>Contact Law Enforcement</IonButton>
                        <IonAlert 
                            isOpen={this.state.showAlert} 
                            onDidDismiss={() => this.triggerAlert}
                            header={'Call Law Enforcement'}
                            subHeader={'###-###-####'}
                            buttons={['Call', 'Cancel']}
                            message={'Please refrain from intervening in suspicious activity and contact local officials'}
                        />
                    </div>
                </IonRow>
            </IonGrid>
            </div>
        );
      };

    private resultComponentStyle: CSS.Properties = {
        color: 'black',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        // padding: '1rem 0 rem 0',
    }


    private resultButtonStyle: CSS.Properties = {
        paddingTop: '1em'
    }
    }
