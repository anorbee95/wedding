import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const updateGuest = async (guestId, updatedData) => {
  const productRef = doc(db, "guests", guestId);
  updateDoc(productRef, updatedData);
};
