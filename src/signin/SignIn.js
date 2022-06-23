import {
  getCategoriesAndDocument,
  signInWithGooglePopup,
} from "../firebase/firebase-config";
import { createUserDocumentFromAuth } from "../firebase/firebase-config";
import { addCollectionAndDocuments } from "../firebase/firebase-config";
import React, { useEffect } from "react";
import { DATA } from "../data";

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log(user);
};

function SignIn() {
  useEffect(() => {
    addCollectionAndDocuments("categories", DATA);
  }, []);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocument();
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);
  return (
    <div>
      <h2>sign in page</h2>
      <button onClick={logGoogleUser}>sign in</button>
    </div>
  );
}

export default SignIn;
