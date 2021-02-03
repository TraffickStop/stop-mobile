import CSS from 'csstype';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
// import Results from '../components/Results';
import ResultsComponent from '../components/ResultsComponent';
import './Home.scss';

const pageStyles: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const Results: React.FC = () => {
  return (
    <IonPage style={pageStyles}>
      <ResultsComponent />
    </IonPage>
  );
};

export default Results;
