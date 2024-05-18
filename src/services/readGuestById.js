import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const readGuestById = async (guestId) => {
  const guestRef = doc(db, "guests", guestId);
  const docSnap = await getDoc(guestRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};
