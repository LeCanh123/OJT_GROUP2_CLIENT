import RouteSetUp from "./routes/RouteSetUp";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouteSetUp />
      </GoogleOAuthProvider>
    </div>
  );
}
