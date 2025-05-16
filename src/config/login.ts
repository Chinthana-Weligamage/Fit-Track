import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgvYSk6uev5f_xbjdcSU26g4yddrwkbcw",
  authDomain: "fit-track-7da14.firebaseapp.com",
  projectId: "fit-track-7da14",
  storageBucket: "fit-track-7da14.firebasestorage.app",
  messagingSenderId: "150249589635",
  appId: "1:150249589635:web:2f2ee51fa4c50f217544b6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth(); // Initialize the auth instance
const provider = new GoogleAuthProvider(); // Initialize the Google Auth provider

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // Optional: Use if needed
    // const errorCredential = GoogleAuthProvider.credentialFromError(error); // Removed as 'error' is not defined here
    // The signed-in user info.
    const user = result.user;
    console.log("User signed in:", user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email; // Use optional chaining to handle potential undefined
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(
      "Error during sign-in:",
      errorCode,
      errorMessage,
      email,
      credential
    );
    // ...
  });
export async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log("User signed in:", user);
    return { user, credential };
  } catch (error: any) {
    // Explicitly typing error as any to bypass unknown type
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential_1 = GoogleAuthProvider.credentialFromError(error);
    console.error(
      "Error during sign-in:",
      errorCode,
      errorMessage,
      email,
      credential_1
    );
    throw error;
  }
}
