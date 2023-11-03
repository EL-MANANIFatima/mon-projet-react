
import Type from './Pages/type';
import Produit from './Pages/hh';
import{createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Type />,
  },
  {
    path: "/P",
    element: <Produit />,
  }
  
])
  
      
  
function App() {
  return (

<div>
<div>
        <RouterProvider router={router} />
      </div>
</div>
      
      
  
  );
}

export default App;

