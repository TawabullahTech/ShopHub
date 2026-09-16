import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../config/firebase";

export async function fetchProducts() {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

