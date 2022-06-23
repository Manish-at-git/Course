import {
  getCategoriesAndDocument,
  signInWithGooglePopup,
} from "../firebase/firebase-config";
import { createUserDocumentFromAuth } from "../firebase/firebase-config";
import { addCollectionAndDocuments } from "../firebase/firebase-config";
import React, { useEffect, useState } from "react";
import { DATA } from "../data";

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log(user);
};

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
    <div>
      {/* {console.log(typeof products)} */}
      {products
        ? Object.keys(products).map((item) => (
            <>
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
            </>
          ))
        : null}
      <button onClick={logGoogleUser}>sign in</button>
    </div>
  );
}

export default SignIn;
