import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ChatHome from "./ChatHome";
import ChatCon from "./ChatCon";
import ChatReg from "./ChatReg";
const isAut = () => {
  return localStorage.getItem('token') !== null;
}
isAut();
setInterval(isAut,5000);
const router = createBrowserRouter([
    {
        path: "/",
        element: isAut() ? <ChatHome/>: <Navigate to='/connexion'/>,
      },
      {
        path: "/connexion",
        element: isAut() ?<Navigate to='/' replace/>: <ChatCon/>,
      },
      {
        path: '/register',
        element: <ChatReg/>
      }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
