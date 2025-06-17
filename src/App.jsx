import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/home-page/Blog.jsx";
import SingUp from "./components/sign-up/SignUp.jsx";
import SingIn from "./components/login/SignIn.jsx";
import PasswordReset from "./components/password-reset/PasswordReset.jsx";
import UserProfile from "./components/user-profile-page/UserProfile.jsx";
import RemovePet from "./components/remove-pet/RemovePet.jsx";

// @9105
import RegisterPet from "./components/register-pet/RegisterPet.jsx";

import ProfilePet from "./components/pet-profile/PetProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/sing-in" element={<SingIn />} />
        <Route path="/recover-password" element={<PasswordReset />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/remove-pet" element={<RemovePet />} />
        <Route path="/register-pet" element={<RegisterPet />} />
        <Route path="/pet-profile/:id" element={<ProfilePet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;