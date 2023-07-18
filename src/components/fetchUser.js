import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fetchUser = async (uid) => {
  const userInfo = await getDoc(doc(db, "users", uid));
  if (userInfo) {
    const thisUser = userInfo.data();
    const allUserIncidents = [];
    const solvedIncidents = [];
    const unsolvedIncidents = [];

    //push al the user's reported incidents to array
    if (thisUser.ReportedIncidents) {
      allUserIncidents.push(...thisUser.ReportedIncidents);
         for (let i = 0; i < allUserIncidents.length; i++) {
           if (allUserIncidents[i].completed === true) {
             solvedIncidents.push(allUserIncidents[i].id);
           } else {
             unsolvedIncidents.push(allUserIncidents[i].id);
           }
         }
    }
 
    return {
      currentUser: thisUser,
      solved: solvedIncidents,
      unsolved: unsolvedIncidents,
      allUserIncidents: allUserIncidents,
    };
  } else {
    console.log("invalid");
  }
};
