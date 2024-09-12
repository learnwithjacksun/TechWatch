import { Route, Routes } from "react-router-dom";
import { Home, Register, Login, Projects, Upload, Profile, Leaderboard, Preview } from ".";
import ThemeProvider from "./Contexts/ThemeProvider";
import MenuProvider from "./Contexts/MenuProvider";
import AuthProvider from "./Contexts/AuthProvider";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster/>
      <AuthProvider>
        <MenuProvider>
          <ThemeProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/projects" element={<Projects />} />
                <Route path="projects/:id" element={<Preview/>} />
                <Route path="/upload" element={<Upload/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/leaderboard" element={<Leaderboard/>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </MenuProvider>
      </AuthProvider>
    </>
  );
};

export default App;
