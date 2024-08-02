import RadialChart from "../components/RadiaChart";
import {
  IonContent,
  IonPage,
  IonButton,
  IonList,
  IonToast,
} from "@ionic/react";

function LandingPage() {
  return (
    <div>
      <IonPage>
        <IonContent>
        <div>
            <div className="ion-margin">
            <RadialChart></RadialChart>

            </div>
        </div>
        </IonContent>

      </IonPage>
    </div>
  );
}
export default LandingPage;
