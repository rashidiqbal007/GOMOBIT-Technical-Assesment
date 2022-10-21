import React from "react";
import { Button } from 'antd'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js"
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import PublicRoute from "./Components/PublicRoute.js";
import Addmobuser from "./Components/Addmobuser.js";
import Viewusers from "./pages/Viewusers.js";


function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <div>
      <BrowserRouter>
        {loading && <div className="spinner-parent">
          <div class="spinner-grow text-info" role="status">
          </div>
        </div>}
        <Toaster reverseOrder={false} position="top-center" />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Addmobuser /></ProtectedRoute>}
           />
          
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/viewusers" element={<ProtectedRoute><Viewusers /></ProtectedRoute>} />

        





        </Routes>

      </BrowserRouter>

    </div>

  );
}

export default App;
