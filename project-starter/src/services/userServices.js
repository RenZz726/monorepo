import { db, remoteConfig } from "../firebase";
import {
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";
import { fetchAndActivate, getValue } from "firebase/remote-config";

export const addUserData = async (userData, userId) => {
  return await addDoc(collection(db, "personal-details"), {
    ...userData,
    userId: userId,
    createdAt: new Date(),
  });
};

export const readUserData = async () => {
  const querySnapShot = await getDocs(collection(db, "personal-details"));
  return querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// for setDoc() - need to pass the id
export const addDataUsingSet = async (userData, userId) => {
  return await setDoc(doc(db, "personal-details", "personal"), {
    ...userData,
    userId: userId,
    createdAt: new Date(),
  });
};

export const mergeData = async () => {
  return await setDoc(
    doc(db, "personal-details", "personal"),
    { age: 100 },
    { merge: true },
  );
};

export const updateData = async () => {
  return await updateDoc(doc(db, "personal-details", "personal"), {
    phoneNumber: 9090748232,
  });
};

export const fetchAuthorizedUsers = async () => {
  await fetchAndActivate(remoteConfig);
  const authorizedUsers = getValue(remoteConfig, "authorized_users").asString();
  return authorizedUsers.split(",");
};
