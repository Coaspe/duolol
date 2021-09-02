import { createContext } from "react";
import { valueProps, firebase, db  } from "../lib/firebase";

const FirebaseContext = createContext<valueProps>({firebase,db});
export default FirebaseContext;
