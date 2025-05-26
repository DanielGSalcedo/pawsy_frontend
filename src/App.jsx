import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './components/home-page/Blog.jsx';
import SingUp from './components/sign-up/SignUp.jsx';
import SingIn from './components/login/SignIn.jsx';
import PasswordReset from './components/password-reset/PasswordReset.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Blog />} />
                <Route path="/sing-up" element={<SingUp/>} />
                <Route path="/sing-in" element={<SingIn />} />
                <Route path="/user-profile" element={<UserProfile/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
