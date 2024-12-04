import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import GetStarted from "../pages/GetStarted";
import Dashboard from "../pages/Dashboard";
import NewArticle from "../pages/NewArticle";
import Article from "../pages/Article";
import UserProfile from "../pages/UserProfile";
import EditArticle from "../pages/EditArticle";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="getstarted" element={<GetStarted />} />
                    <Route path="dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="new-article" element={
                        <ProtectedRoute>
                            <NewArticle />
                        </ProtectedRoute>
                    } />
                    <Route path="articles/:id" element={<Article />} />
                    <Route path="users/:id" element={<UserProfile />} />
                    <Route path="edit-article/:id" element={
                        <ProtectedRoute>
                            <EditArticle />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;