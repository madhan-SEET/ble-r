import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonList, IonToast } from '@ionic/react';
import cognitoService from '../services/cognitoService';
import apiService from '../services/apiService';
import { addDevice, LandingDevices, DbClose, DbOpen } from '../services/dbService';
import { useHistory } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import moment from 'moment'; // import moment library

const YourComponent = () => {
  const [openToast, setOpenToast] = useState(false);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await DbOpen();
      setOpenToast(false);
      const authenticated = await cognitoService.refreshTokens();
      console.log('authenticated', authenticated);
      if (authenticated.authenticated) {
        await fetchDeviceDetails();
        console.log('after fetch device details');
        history.push('/landingPage');
      } else {
        if (authenticated.error === "Network error") {
          setOpenToast(true);
          history.push('/landingPage');
        } else {
          history.push('/login');
        }
      }
    };
    fetchData();

    return async () => {
      await DbClose();
    };
  }, [history]);

  const isLocationEnable = async () => {
    try {
      const permission = await Geolocation.checkPermissions();
      console.log("permission", permission);
    } catch (error) {
      history.push('/EnableLocation');
    }
  };

  const login = () => {
    history.push('/login');
  };

  const formatDate = (val) => {
    const momentDate = moment(val);
    const formatDate = momentDate.format('DD MMM YYYY ');
    return formatDate;
  };

  const fetchDeviceDetails = async () => {
    try {
      const landingPageDetails = await apiService.getLandingPage();
      let assign = Object.keys(landingPageDetails);
      window.localStorage.setItem('user_limit', landingPageDetails.user_limit);
      window.localStorage.setItem('noc_limit', landingPageDetails.noc_limit);
      const landingPageValues = [];

      for (let i = 0; i < assign.length; i++) {
        const item = assign[i];
        await LandingDevices(landingPageDetails[assign[i]]);
        if (landingPageDetails[assign[i]].total_monthly_flow != null || landingPageDetails[assign[i]].total_monthly_flow != undefined) {
          setTotal(prevTotal => prevTotal + landingPageDetails[assign[i]].total_monthly_flow);
        }

        const newItem = {
          macID: landingPageDetails[assign[i]].mac_address,
          token: landingPageDetails[assign[i]].device_name,
          record_sequence: landingPageDetails[assign[i]].last_record_seq_telemetry,
          record_sequence_pump: landingPageDetails[assign[i]].last_record_seq_pump,
          record_sequence_error: landingPageDetails[assign[i]].last_record_seq_error,
          record_sequence_day: landingPageDetails[assign[i]].last_record_seq_day,
          last_sync: landingPageDetails[assign[i]].last_sync_time,
          passKey: landingPageDetails[assign[i]].passkey,
          total_forward_flow: landingPageDetails[assign[i]].total_monthly_flow
        };

        landingPageValues.push(newItem);
      }

      if (total != null) {
        setTotal(prevTotal => prevTotal + 0);
      }
      window.localStorage.setItem('totalConsumption', total);

      for (let i = 0; i < landingPageValues.length; i++) {
        await addDevice(landingPageValues[i]);
      }

      console.log('landingPageDetails', landingPageDetails);
    } catch (error) {
      console.log('error fetching device details', error);
    }
  };

  return (
    <IonPage>
      <IonContent className="submit-form">
        <div className="submit-form">
          <div className="image-container">
            <img className="image" src={require('../assets/kritsnam.jpg')} alt="Image" />
          </div>
          <p className="font">Dhaara Connect</p>
          <IonList>
            {/* List items go here if needed */}
          </IonList>
        </div>
      </IonContent>
      <p className="version">V.1.1.7</p>
      <IonToast isOpen={openToast} message="Network Error" duration={2000} />
    </IonPage>
  );
};

export default YourComponent;

