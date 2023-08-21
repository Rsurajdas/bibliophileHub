import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './RootLayout';
import './App.css';
import { authAction } from './Actions/authAction';
const Genres = lazy(() => import('./Pages/Genres'));
const Home = lazy(() => import('./Pages/Home'));
const Genre = lazy(() => import('./Pages/Genre'));
const SignIn = lazy(() => import('./Pages/SignIn'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/genres',
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Genres />
              </Suspense>
            ),
          },
          {
            path: ':pathName',
            element: (
              <Suspense>
                <Genre />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/signin',
    element: (
      <Suspense>
        <SignIn />
      </Suspense>
    ),
    action: authAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
