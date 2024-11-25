import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./HomePage.jsx";
import SignIn from "./SignIn.jsx";
import GetStarted from "./GetStarted.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="getstarted" element={<GetStarted />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;