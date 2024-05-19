import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const deleteSong = async (songId) => {
  deleteDoc(doc(db, "songs", songId));
};
