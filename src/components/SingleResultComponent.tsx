import { IonCol, IonImg, IonRow, IonText } from '@ionic/react';
import React from 'react';
import CSS from 'csstype';

interface Props {
    photo?: string
}

export default class SingleResult extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <IonRow>
                <IonCol>
                    <div>
                    <IonImg src={this.props.photo} style={{height: '125px', objectFit:"cover"}} />
                    </div>
                </IonCol>
                <IonCol>
                    <IonText>99% Match</IonText>
                    <p style={this.pTagStyle}>Name: Bryce Lund :(</p>
                    <p style={this.pTagStyle}>Age: 29</p>
                    <p style={this.pTagStyle}>Last seen location: Provo, UT</p>
                    <p style={this.pTagStyle}>Last seen Date: 1/29/2021</p>
                </IonCol>
            </IonRow>
        )
    }

    private pTagStyle : CSS.Properties = {
        fontSize: '0.75em',
        margin: '.5em'
    }
}