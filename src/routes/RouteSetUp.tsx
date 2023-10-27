import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/homes/Home";
import Chart from "../pages/admin/Chart";
import Admin from "../pages/admin/Admin";
import Map from "../pages/homes/components/Map";
import Login from "../pages/homes/components/Login";

/* Route Setup */
import RouteAdmin from "./RouteAdmin";
import About from "../pages/about/About";
import Help from "../pages/help/Help";



export default function RouteSetUp() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="login_admin" element={<LoginAdmin />} />
                <Route path="/" element={<Home />}>
                    <Route path="/chart" element={<Chart />} />
                    <Route path="/" element={<Map />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<Help />} />


                </Route>
                {RouteAdmin}
                <Route path="/layer" element={<StormMap />} />
                <Route path="/test" element={<Test />} />


            </Routes>
        </BrowserRouter>
    )
}
