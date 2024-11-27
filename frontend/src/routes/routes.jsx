import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import GetStarted from "../pages/GetStarted";

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