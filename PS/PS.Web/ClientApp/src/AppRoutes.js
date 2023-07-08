import Customer from "./pages/Customer";

const AppRoutes = [
  {
    index: true,
    element: <Customer />
  },
  {
    path: '/counter',
    element: <Customer />
  },
  {
    path: '/fetch-data',
    element: <Customer />
  }
];

export default AppRoutes;
