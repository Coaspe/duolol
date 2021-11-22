import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from "./context/firebase";
import { firestore, Firebase, FieldValue } from "./lib/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={{ Firebase, firestore, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
); 