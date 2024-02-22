import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import Root from './routes/root.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import DashboardPage from './routes/DashboardPage.jsx'

import './index.css'
import AdminContainer from './components/dashboard/AdminContainer.jsx'
import EmployeeContainer from './components/dashboard/EmployeeContainer.jsx'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

const router = createBrowserRouter([
  {path:"/", element: <Root />, errorElement: <ErrorComponent />},
  {path:"/login", element: <LoginPage />},
  {path:"/logout", element: <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>logging out...</div>},
  {path:"/register", element: <RegisterPage />},
  {path:"/dashboard", element: <DashboardPage />,
    children:[
      {path:"e", element: <EmployeeContainer />,
        children: [
          {path:":pageType"}
        ]
      },
      {path:"a", element: <AdminContainer />,
        children: [
          {path:":pageType"}
        ]
      },
      {path:":userType"}
    ]
  },
]);

function ErrorComponent(){
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100%"}}>
      <div>
      <div>
        <h1>Oops! :'\</h1> 
        <div>an unexpected error occurred.</div>
      </div>
      <b>Invalid Page</b>
      </div>
    </div>
  )
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#FFA500',
    },
    secondary: {
      main: '#FFA500',
    },
    overrides: {
      Button: {
        containedPrimary: {
          color: 'white',
          backgroundColor: '#FFA500', // Orange color
          '&:hover': {
            backgroundColor: '#FF8C00', // Darker shade of orange on hover
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
