import {
    createBrowserRouter,
   
  } from "react-router-dom";

import Home from "./Pages/Home"
// import AddProductPage from "./Pages/addProduct";
// import Authentication from './Pages/login-signup'
// import Products from "./Pages/Products";
// import Cart from "./Pages/Cart";
// import Contact from "./Pages/Contact";
import Singleproduct from "./Pages/Singleproduct";

import {App} from "./App";
import Checkout from "./Pages/Checkout";
// import About from "./Pages/About";
// import Error from "./Pages/error";


 const router = createBrowserRouter([
    {
      element: <App/>,
      children: [
        {
          path: "/",
          element: <Home />,
          
        },
  
        {
          path: "/product/:ProductId" ,
          element: <Singleproduct/>,
         },

         {
          path: "/checkout/:ProductId" ,
          element: <Checkout/>,
         },
      ],
    },
  ]);



  export default  router