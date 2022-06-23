import { SignInContainer, ItemContainer } from "./signin.style";

import { signOut } from "firebase/auth";

import {
  getCategoriesAndDocument,
  signInWithGooglePopup,
} from "../firebase/firebase-config";
import { createUserDocumentFromAuth } from "../firebase/firebase-config";
import { addCollectionAndDocuments, auth } from "../firebase/firebase-config";
import React, { useEffect, useState } from "react";
import { DATA } from "../data";

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log(user);
};

const logOut = async () => {};

function SignIn() {
  const [products, setProducts] = useState();
  useEffect(() => {
    addCollectionAndDocuments("categories", DATA);
  }, []);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocument();
      setProducts(categoryMap);
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);
  return (
    <SignInContainer>
      {/* {console.log(typeof products)} */}
      {products
        ? Object.keys(products).map((item) => (
            <ItemContainer>
              <h2>{item}</h2>
              <div>
                {products[item].map((product) => (
                  <>
                    {Object.values(product).map((property) => (
                      <>
                        <div>{property}</div>
                      </>
                    ))}
                    {/* {console.log(product)} */}
                    <br />
                  </>
                ))}
              </div>
            </ItemContainer>
          ))
        : null}
      <button onClick={logGoogleUser}>sign in</button>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        sign Out
      </button>
    </SignInContainer>
  );
}

export default SignIn;
