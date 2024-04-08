import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SignUp from './components/Auth/SignUp.jsx'
import Home from './components/Home/Home.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import SignIn from './components/Auth/SignIn.jsx'
import { SearchResult } from './components/SearchResult.jsx'
import RecipeDetail from './components/ItemDetail/RecipeDetail.jsx'
import Categories from './components/Categories/Categories.jsx'
import About from './components/About/About.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import UserProfile from './components/ProfilePage/UserProfile.jsx'
import AddRecipe from './components/AddRecipe/AddRecipe.jsx'
import EditRecipe from './components/EditRecipe/EditRecipe.jsx'
const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />,
    children:[
      {path:'signup',element:<SignUp/>},
      {path:'signin',element:<SignIn/>},
      {path: 'search',element: <SearchResult />},
    ]
  },
  {path:'profile',element:<UserProfile/>},
  {path:'add/:id',element:<AddRecipe/>},
  {path:'edit/:id',element:<EditRecipe/>},
  {path:'about',element:<About/>},
  {
    path: '/recipe/:id',
    element: <RecipeDetail/>,
  },
  {
    path: 'categories',
    element: <Categories />,
  },
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
)
