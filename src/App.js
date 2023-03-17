import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Cart from './Components/Cart';
import Error from './Components/Error/Error';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/Main';
import Order from './Components/Order';
import Shop from './Components/Shop/Shop';
import { productAndCartLoader } from './Loader/Loader';
import Signup from './Components/Signup/Signup';
import ShippingOrder from './Components/ShippingOrder';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
          path: '/',
          loader: () => fetch('http://localhost:5000/products'),
          element: <Shop></Shop>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path: 'about',
          element: <About></About>
        },
        {
          path: 'order',
          loader: productAndCartLoader,
          element: <Order></Order>
        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: '/shipping',
          element: <PrivateRoute><ShippingOrder></ShippingOrder></PrivateRoute>
        },
        {
          path: 'signup',
          element: <Signup></Signup>
        },

      ]
    },
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
