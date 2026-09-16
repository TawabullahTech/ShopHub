import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../config/Firebase";
import products from "./products";

export async function seedProducts() {
  const productsRef = collection(db, "products");

  const existingProducts = await getDocs(productsRef);

  if (!existingProducts.empty) {
    console.log("Products already exist in Firestore.");
    return;
  }

  for (const product of products) {
    await addDoc(productsRef, {
      title: product.title,
      category: product.category,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  }

  console.log("24 products successfully added to Firestore.");
}