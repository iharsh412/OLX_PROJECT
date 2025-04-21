import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import RootRouter from './Routes/RootRouter';
import './App.css';
import { ToastContainer } from 'react-toastify';
import ChatWrapper from './Components/CustomComponents/ChatWrapper/ChatWrapper';

const baseName = import.meta.env.VITE_BASE_NAME;

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<RootRouter />} />),
  { basename: baseName }
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <HelmetProvider>
          <ChatWrapper>
            <RouterProvider router={router} />
          </ChatWrapper>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
