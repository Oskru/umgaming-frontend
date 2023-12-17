import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MainContainer from './components/MainContainer';
import Events from './pages/Events';
import Rewards from './pages/Rewards';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/nagrody',
    element: <Rewards />,
  },
  {
    path: '/eventy',
    element: <Events />,
  },
]);
function App() {
  return (
    <>
      <Navbar />
      <MainContainer>
        <RouterProvider router={router} />
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
