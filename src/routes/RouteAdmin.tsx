import { Route, Router, Routes } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Category from "../pages/admin/category/Category";
import Forecast from "../pages/admin/forecast/Forecast";
import User from "../pages/admin/user/User";
import Report from "../pages/admin/report/Report";
import App from "../pages/admin/category/CateTest";
import Message from "../pages/admin/message/Message";
import Login from "../pages/admin/user/login/LoginAdmin";

export default
    <>

        <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="forecast" element={<Forecast />} />
            <Route path="user" element={<User />} />
            <Route path="message" element={<Message />} />
            <Route path="report" element={<Report />} />

        </Route>

    </>





