import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const readSongById = async (songId) => {
  const guestRef = doc(db, "songs", songId);
  const docSnap = await getDoc(guestRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};
