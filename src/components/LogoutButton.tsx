import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../utils/Icons";

function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button onClick={handleLogout} className="logout-btn">
      <LogoutIcon />
    </button>
  );
}

export default LogoutButton;
