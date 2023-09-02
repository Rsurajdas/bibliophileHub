import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './RootLayout';
import './App.css';
import { authAction } from './Actions/authAction';
import { signUpAction } from './Actions/signUpAction';
import { bookDetailLoader } from './Loaders/bookDetailLoader';
import { checkAuthLoader, tokenLoader } from './utils/auth';
import { signOut } from './Pages/SignOut';
import AuthRootLayout from './AuthLayout';
import { homeLoader } from './Loaders/homeLoader';
const Genres = lazy(() => import('./Pages/Genres'));
const Home = lazy(() => import('./Pages/Home'));
const Genre = lazy(() => import('./Pages/Genre'));
const SignIn = lazy(() => import('./Pages/SignIn'));
const MyBooks = lazy(() => import('./Pages/Mybooks'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const BookDetail = lazy(() => import('./Pages/BookDetail'));
const Profile = lazy(() => import('./Pages/Profile'));
const Friends = lazy(() => import('./Pages/Friends'));
const Following = lazy(() => import('./Pages/Following'));
const Follower = lazy(() => import('./Pages/Follower'));
const RequestPending = lazy(() => import('./Pages/RequestPending'));

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
        loader: homeLoader,
      },
      {
        path: '/profile/:profileId',
        element: (
          <Suspense>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: '/friends/:profileId',
        element: (
          <Suspense>
            <Friends />
          </Suspense>
        ),
      },
      {
        path: '/following/:profileId',
        element: (
          <Suspense>
            <Following />
          </Suspense>
        ),
      },
      {
        path: '/followers/:profileId',
        element: (
          <Suspense>
            <Follower />
          </Suspense>
        ),
      },
      {
        path: '/request-pending/:profileId',
        element: (
          <Suspense>
            <RequestPending />
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
    path: '/',
    element: <AuthRootLayout />,
    children: [
      {
        path: '/signin',
        element: (
          <Suspense>
            <SignIn />
          </Suspense>
        ),
        action: authAction,
      },
      {
        path: '/signup',
        element: (
          <Suspense>
            <SignUp />
          </Suspense>
        ),
        action: signUpAction,
      },
      {
        path: '/signout',
        action: signOut,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
