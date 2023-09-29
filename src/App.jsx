import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootLayout from './RootLayout';
import { signUpAction } from './Actions/signUpAction';
import { bookDetailLoader } from './Loaders/bookDetailLoader';
import { checkAuthLoader, tokenLoader } from './utils/auth';
import { signOut } from './Pages/SignOut';
import AuthRootLayout from './AuthLayout';
import ErrorPage from './ErrorPage';
import LoadingScreen from './LoadingScreen';
import './App.css';
import Table from './Components/Table/Table';

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
const Followers = lazy(() => import('./Pages/Followers'));
const RequestPending = lazy(() => import('./Pages/RequestPending'));
const AddFriend = lazy(() => import('./Pages/AddFriend'));
const SocialLayout = lazy(() => import('./Pages/SocialLayout'));

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
        path: '/user',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SocialLayout />
          </Suspense>
        ),
        children: [
          {
            path: 'friends/:profileId',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Friends />
              </Suspense>
            ),
          },
          {
            path: 'following/:profileId',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Following />
              </Suspense>
            ),
          },
          {
            path: 'followers/:profileId',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <Followers />
              </Suspense>
            ),
          },
        ],
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
        children: [
          {
            path: 'table/:shelfId?',
            element: <Table />,
          },
        ],
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
