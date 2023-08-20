import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader, action as rootAction } from './routes/root.tsx'
import ErrorPage from './pages/error-page.tsx'
import Contact, {loader as contactLoader , action as contactAction } from './routes/contact.tsx'
import EditContact, {action as editAction } from './routes/edit.tsx'
import {action as deleteAction } from './routes/delete.tsx';
import Index from './routes/index.tsx'



const router = createBrowserRouter([{
  path:'/',
  element: <Root/>,
  errorElement: <ErrorPage/>,
  loader: rootLoader,
  action: rootAction,
  children: [
    {
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
          action: contactAction,
        },
      ],
    },
    {
      path: "contacts/:contactId/edit",
      element: <EditContact />,
      loader: contactLoader,
      action: editAction
    },
    {
      path: "contacts/:contactId/destroy",
      action: deleteAction
    }
  ]
},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
