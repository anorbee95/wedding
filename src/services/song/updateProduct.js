import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const updateSong = async (songId, updatedData) => {
  const productRef = doc(db, "songs", songId);
  updateDoc(productRef, updatedData);
};
