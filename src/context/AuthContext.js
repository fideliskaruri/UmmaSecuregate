import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(true);
  const [user, setUser] = useState();
  const [emailInUse, setEmailInUse] = useState(false);
  const [noSuchUser, setNoSuchUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setSignedIn(true);
        const currentUser = user.email;
        saveAccessLog(currentUser, true, "signIn");
      } else {
        // User is signed out
        console.log("User is signed out");
        setUser(null);
        setSignedIn(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  //function to save the failed or succefull access log to the firestore db
  const saveAccessLog = async (email, success, type) => {
    const accessLogRef = collection(db, "accessLogs");
    await addDoc(accessLogRef, {
      email,
      success,
      type,
      date: Date.now() / 1000,
    }).catch((e) => {
      console.log(e);
    });
  };

  // Formatted date
  function getFormattedDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear());

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const createUser = async (
    firstname,
    lastname,
    role,
    gender,
    email,
    password,
    file
  ) => {
    const customId = crypto.randomUUID(); // Set your custom ID here
    const incidentRef = doc(db, "users", customId);

    const querySnapshot = await getDocs(collection(db, "users"));
    const emailExists = querySnapshot.docs.some(
      (doc) => doc.data().email === email
    );

    if (emailExists) {
      console.log("Email already in use");
      setEmailInUse(true);

      return;
    }

    // Storage ref
    const storageRef = ref(storage, `profilepics/${customId}`);

    if (file) {
      // Upload the file to storage
      await uploadBytes(storageRef, file).then(() => {
        console.log("Image uploaded");
      });
    }

    const imageURL = file
      ? await getDownloadURL(ref(storageRef))
      : console.log("Please select a file");

    await setDoc(incidentRef, {
      firstname,
      lastname,
      role,
      gender,
      email,
      password,
      imageURL,
      date: getFormattedDate(),
      admin: false,
      id: customId,
      assigned: false,
    });
  };

  //signing user in if  exists
  const signInUser = async (email, password) => {
    try {
      setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      setSignedIn(true);
      // save the access log to database
    } catch (error) {
      let firstname = null;
      let lastname = null;
      let customId = null;
      let imageURL = null;
      const querySnapshot = await getDocs(collection(db, "users"));
      const emailExists = querySnapshot.docs.some((doc) => {
        const docInfo = doc.data();
        if (docInfo.email === email && docInfo.password === password) {
          firstname = docInfo.firstname;
          lastname = docInfo.lastname;
          customId = docInfo.id;
          imageURL = docInfo.imageURL;

          return true;
        } else {
          return false;
        }
      });

      if (emailExists) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Update currentUser fields
        const currentUser = userCredential.user;
        await updateProfile(currentUser, {
          displayName: `${firstname} ${lastname}`,
          photoURL: imageURL,
        });
      } else {
        setNoSuchUser(true);
      }
    }
  };

  const contextValue = {
    signInUser,
    user,
    createUser,
    emailInUse,
    setEmailInUse,
    noSuchUser,
    setNoSuchUser,
    date: getFormattedDate(),
    saveAccessLog,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
