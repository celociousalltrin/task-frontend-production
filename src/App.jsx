import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { appRouter } from "./utils/common-data";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
}

const AppRoutes = () => {
  const navigate = useNavigate();
  appRouter.navigate = navigate;

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:page_id" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
