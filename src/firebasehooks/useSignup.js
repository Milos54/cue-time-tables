import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  // const [imgUrl, setImgUrl] = useState('')

  const signup = async (
    email,
    password,
    firstName,
    lastName,
    displayName,
    thumbnail
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(email, password);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      // ADD THUMBNAIL TO STORAGE

      const imgRef = ref(storage, `thumbnails/${res.user.uid}/thumbnail`);
      // uploadBytes(imgRef, thumbnail).then(() => {
      //   getDownloadURL(imgRef).then((url) => {
      //     setImgUrl(url)
      //     console.log(imgUrl)
      //   })
      // })

      // const img = await uploadBytes(imgRef, thumbnail)
      // const imgUrl = await getDownloadURL(imgRef)

      //                      // update auth profile
      // await updateProfile(auth.currentUser, {
      //   displayName,
      //   photoURL: imgUrl
      // })

      // create document in users collection,
      //  name of the document is users id

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        online: true,
        firstName,
        lastName,
        email,
        // photoURL: imgUrl
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
