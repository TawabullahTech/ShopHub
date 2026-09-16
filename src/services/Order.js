import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/Firebase";

export async function createOrder(userId, orderData) {
  const order = {
    userId,
    customer: orderData.customer,
    items: orderData.items,
    total: orderData.total,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const orderRef = await addDoc(
    collection(db, "orders"),
    order
  );

  return orderRef.id;
}