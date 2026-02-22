import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../config/firebase";

export async function assignAdminRole() {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    console.error("User not logged in");
    return;
  }

  try {
    const functions = getFunctions(app, "europe-west3"); // important!
    const makeAdmin = httpsCallable(functions, "makeAdmin");

    const result = await makeAdmin({
      uid: user.uid,
    });

    console.log(result.data);

    // 🔥 Refresh token so custom claim updates immediately
    await user.getIdToken(true);

    console.log("Admin claim refreshed. You are now admin.");
  } catch (error) {
    console.error("Error assigning admin:", error);
  }
}
