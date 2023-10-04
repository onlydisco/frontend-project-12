import Layout from './Components/Layout.jsx';
import ChatPage from './Pages/ChatPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import NotFoundPage from './Pages/NotFoundPage.jsx';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
