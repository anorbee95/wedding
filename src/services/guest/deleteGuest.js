import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const deleteGuest = async (guestId) => {
  deleteDoc(doc(db, "guests", guestId));
};
