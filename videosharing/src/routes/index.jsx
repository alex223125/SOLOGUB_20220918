import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import UploadPage from "../components/UploadPage";

export default (
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/upload' element={<UploadPage />} />
        </Routes>
    </Router>
);

// // This is a React Router v6 app
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Link
// } from "react-router-dom";
//
// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="users/*" element={<Users />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }