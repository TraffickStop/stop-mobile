import CSS from 'csstype';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Start from '../components/Start';
import './Home.scss';

const pageStyles: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const Home: React.FC = () => {
  return (
    <IonPage style={pageStyles}>
      <Start></Start>
    </IonPage>
  );
};

export default Home;
