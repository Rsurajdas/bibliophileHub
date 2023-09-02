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
import ErrorPage from './ErrorPage';
import LoadingScreen from './LoadingScreen';
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
const Followers = lazy(() => import('./Pages/Follower'));
const RequestPending = lazy(() => import('./Pages/RequestPending'));
const AddFriend = lazy(() => import('./Pages/AddFriend'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'token',
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Home />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/profile/:profileId',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Profile />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/friends/:profileId',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Friends />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/following/:profileId',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Following />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/followers/:profileId',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Followers />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/request-pending/:profileId',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <RequestPending />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/add-friend',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AddFriend />
          </Suspense>
        ),
      },
      {
        path: '/mybooks',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyBooks />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: '/genres',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Genres />
              </Suspense>
            ),
            loader: checkAuthLoader,
          },
          {
            path: ':pathName/:genreName',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Genre />
              </Suspense>
            ),
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: '/book',
        loader: checkAuthLoader,
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<LoadingScreen />}>
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
          <Suspense fallback={<LoadingScreen />}>
            <SignIn />
          </Suspense>
        ),
        action: authAction,
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<LoadingScreen />}>
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
