import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const createGuest = async (guestData) => {
  const docRef = await addDoc(collection(db, "guests"), guestData);
  return docRef.id;
};
