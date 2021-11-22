import { createContext } from "react";
import { Firebase, firestore, FieldValue  } from "../lib/firebase";

const FirebaseContext = createContext({Firebase,firestore, FieldValue});
export default FirebaseContext;
