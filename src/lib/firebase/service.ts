import { DocumentData, Query, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

async function fetchData(query: Query<unknown, DocumentData>) {
  const snapshot = await getDocs(query);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return typeof data === "object" && data !== null ? { id: doc.id, ...data } : { id: doc.id };
  });
}

export async function retrieveData(collectionName: string) {
  const colRef = collection(firestore, collectionName);
  return await fetchData(colRef);
}

export async function retrieveDataById(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();
  return data ? { id: snapshot.id, ...data } : null;
}

export async function retrieveDataByField(collectionName: string, field: string, value: string) {
  const q = query(collection(firestore, collectionName), where(field, "==", value));
  return await fetchData(q);
}

export async function checkIfUserExists(email: string) {
  const data = await retrieveDataByField("users", "email", email);
  return data.length > 0;
}

export async function signUp(
  userData: {
    email: string;
    role: string;
    password: string | Buffer;
    created_at: Date;
    update_at: Date;
  },
  callback: Function
) {
  try {
    if (await checkIfUserExists(userData.email)) {
      return callback(false);
    }
    userData.role = userData.role || "member";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.update_at = new Date();
    await addDoc(collection(firestore, "users"), userData);
    callback(true);
  } catch (error) {
    console.error("Error in signUp:", error);
    callback(false);
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);
  return data.length > 0 ? data[0] : null;
}

export async function loginWithGoogle(data: { fullname?: string; email: string; type?: string; role?: string }, callback: Function) {
  try {
    const existingUser = await retrieveDataByField("users", "email", data.email);
    if (existingUser.length > 0) {
      return callback(existingUser[0]);
    } else {
      data.role = data.role || "member";
      const newUserRef = await addDoc(collection(firestore, "users"), data);
      callback({ id: newUserRef.id, ...data });
    }
  } catch (error) {
    console.error("Error in loginWithGoogle:", error);
    callback(null);
  }
}

// import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
// import app from "./init";
// import bcrypt from "bcrypt";

// const firestore = getFirestore(app);

// export async function retrieveData(collectionName: string) {
//   const snapshot = await getDocs(collection(firestore, collectionName));
//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return data;
// }
// export async function retrieveDataById(collectionName: string, id: string) {
//   const snapshot = await getDoc(doc(firestore, collectionName, id));
//   const data = snapshot.data();
//   return data;
// }
// export async function retrieveDataByField(collectionName: string, field: string, value: string) {
//   const q = query(collection(firestore, collectionName), where(field, "==", value));
//   const snapshot = await getDocs(q);
//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return data;
// }

// export async function signUp(
//   userData: {
//     email: string;
//     fullname: string;
//     phone: string;
//     password: string;
//     role?: string;
//   },
//   callback: Function
// ) {
//   const data = await retrieveDataByField("users", "email", userData.email);

//   if (data.length > 0) {
//     callback(false);
//   } else {
//     if (!userData.role) {
//       userData.role = "member";
//     }
//     userData.password = await bcrypt.hash(userData.password, 10);
//     await addDoc(collection(firestore, "users"), userData)
//       .then(() => {
//         callback(true);
//       })
//       .catch((error) => {
//         callback(false);
//         console.log(error);
//       });
//   }
// }

// export async function signIn(email: string) {
//   const data = await retrieveDataByField("users", "email", email);
//   if (data) {
//     return data[0];
//   } else {
//     return null;
//   }
// }
// export async function loginWithGoogle(data: { email: string; role?: string }, callback: Function) {
//   try {
//     const q = query(collection(firestore, "users"), where("email", "==", data.email));
//     const snapshot = await getDocs(q);
//     if (!snapshot.empty) {
//       const doc = snapshot.docs[0];
//       callback({ id: doc.id, ...doc.data() });
//     } else {
//       data.role = "member";
//       const newUserRef = await addDoc(collection(firestore, "users"), data);
//       callback({ id: newUserRef.id, ...data });
//     }
//   } catch (error) {
//     console.error("Error in loginWithGoogle:", error);
//     // Handle error here, maybe notify the user or log it
//   }
// }
// batas di sini
// export async function loginWithGoogle(data: any, callback: Function) {
//   const q = query(collection(firestore, "users"), where("email", "==", data.email));
//   const snapshot = await getDocs(q);
//   const user = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   if (user.length > 0) {
//     callback(user[0]);
//   } else {
//     data.role = "member";
//     await addDoc(collection(firestore, "user"), data).then(() => {
//       callback(data);
//     });
//   }
// }
