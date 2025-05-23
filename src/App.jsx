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
                <Route path="/SingUp" element={<SingUp/>} />
                <Route path="/SingIn" element={<SingIn />} />
                <Route path="/recover-password" element={<PasswordReset />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
