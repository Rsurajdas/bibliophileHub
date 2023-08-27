import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './RootLayout';
import './App.css';
import { authAction } from './Actions/authAction';
import { signUpAction } from './Actions/signUpAction';
import { bookDetailLoader } from './Loaders/bookDetailLoader';
import { checkAuthLoader, tokenLoader } from './utils/auth';
const Genres = lazy(() => import('./Pages/Genres'));
const Home = lazy(() => import('./Pages/Home'));
const Genre = lazy(() => import('./Pages/Genre'));
const SignIn = lazy(() => import('./Pages/SignIn'));
const MyBooks = lazy(() => import('./Pages/Mybooks'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const BookDetail = lazy(() => import('./Pages/BookDetail'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'token',
    loader: tokenLoader,
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
        path: '/mybooks',
        element: (
          <Suspense>
            <MyBooks />
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
            path: ':pathName/:genreName',
            element: (
              <Suspense>
                <Genre />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/book',
        children: [
          {
            path: ':id',
            element: (
              <Suspense>
                <BookDetail />
              </Suspense>
            ),
            loader: bookDetailLoader,
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
    loader: checkAuthLoader,
  },
  {
    path: '/signup',
    element: (
      <Suspense>
        <SignUp />
      </Suspense>
    ),
    action: signUpAction,
    loader: checkAuthLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
