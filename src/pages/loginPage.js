  import { useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { getCognitoconfig } from "../services/CognitiService";
  import { LandingPage } from "../services/ApiServices";
  import {
    IonContent,
    IonPage,
    IonButton,
    IonList,
    IonToast,
  } from "@ionic/react";
  // import ApiServices from './services/ApiServices';
  // eslint-disable-next-line no-undef
  export async function fetchDetails() {
    const devices =  await LandingPage();
    console.log("devices",devices)
  }

  function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
      console.log("mounted");
      return () => {
        console.log("unmounted");
      };
    }, []);

    const handleClick = async () => {
      console.log("username", username);
      window.localStorage.setItem("user_name", username);
      console.log("password", password);
      await getCognitoconfig(username, password);
      await fetchDetails();
      navigate("/landing");
      // ApiServices.generateServerDataFormat()
    };
    const login = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "90vh",
    };
    return (
      <div>
        <IonPage>
          <IonContent>
            <div style={login}>
              <div>
                <input
                  className="ion-margin"
                  type="number"
                  placeholder="mobile"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="ion-margin"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <IonButton className="ion-margin" onClick={handleClick}>
                  Login Page
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonPage>
      </div>
    );
  }

  export default LoginPage;
