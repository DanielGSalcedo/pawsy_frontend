import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/home-page/Blog.jsx";
//User
import SingUp from "./components/sign-up/SignUp.jsx";
import SingIn from "./components/login/SignIn.jsx";
import PasswordReset from "./components/password-reset/PasswordReset.jsx";
import UserProfile from "./components/user-profile-page/UserProfile.jsx";
//Pets
import RemovePet from "./components/remove-pet/RemovePet.jsx";
import RegisterPet from "./components/register-pet/RegisterPet.jsx";
import ProfilePet from "./components/pet-profile/PetProfile.jsx";
//Properties
import PropertiesMenu from "./components/property-menu/PropertiesMenu.jsx";

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
        <Route path="/properties-menu" element={<PropertiesMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;