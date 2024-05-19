import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const createSong = async (formData) => {
  const docRef = await addDoc(collection(db, "songs"), formData);
  return docRef.id;
};
