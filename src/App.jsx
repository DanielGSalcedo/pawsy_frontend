import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/home-page/Blog.jsx";
//User
import SingUp from "./components/sign-up/SignUp.jsx";
import SingIn from "./components/login/SignIn.jsx";
import PasswordReset from "./components/password-reset/PasswordReset.jsx";
import UserProfile from "./components/user-profile-page/UserProfile.jsx";
import EditProfile from "./components/user-profile-page/EditProfile.jsx";
import BecomeCaretaker from "./components/user-profile-page/BecomeCaretaker.jsx";
//Pets
import RemovePet from "./components/remove-pet/RemovePet.jsx";
import RegisterPet from "./components/register-pet/RegisterPet.jsx";
import ProfilePet from "./components/pet-profile/PetProfile.jsx";
import UserPetList from "./components/user-pet-list/UserPetList.jsx";
import PetEdit from "./components/pet-edit/PetEdit.jsx";
//Properties
import PropertiesMenu from "./components/property-menu/PropertiesMenu.jsx";
import UserProperties from "./components/user-profile-page/UserProperties.jsx";
import SeeProperty from "./components/see-property/SeeProperty.jsx";

import SeeActiveRents from "./components/active-rents/ActiveRents.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/sign-in" element={<SingIn />} />
        <Route path="/recover-password" element={<PasswordReset />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/remove-pet" element={<RemovePet />} />
        <Route path="/register-pet" element={<RegisterPet />} />
        <Route path="/pet-profile/:id" element={<ProfilePet />} />
        <Route path="/properties-menu" element={<PropertiesMenu />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/become-caretaker" element={<BecomeCaretaker />} />
        <Route path="/pet-list" element={<UserPetList />} />
        <Route path="/pet-edit/:id" element={<PetEdit />} />
        <Route path="/user-properties" element={<UserProperties />} />
        <Route path="/property/:id" element={<SeeProperty />} />
        <Route path="/view-active-rents" element={<SeeActiveRents />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;