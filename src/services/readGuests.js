import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const readGuests = async (sortField, sortOrder, searchInput) => {
  let searchConditions = [];

  if (searchInput) {
    const endTerm = searchInput?.replace(/.$/, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 1)
    );
    searchConditions.push(where("name", ">=", searchInput));
    searchConditions.push(where("name", "<", endTerm));
  }

  if (sortField && sortOrder) {
    searchConditions.push(orderBy(sortField, sortOrder));
  }

  let q = query(collection(db, "guests"), ...searchConditions);
  const querySnapshot = await getDocs(q);

  let guests = [];

  querySnapshot.forEach((doc) => {
    guests.push({ id: doc.id, ...doc.data() });
  });

  return guests;
};
