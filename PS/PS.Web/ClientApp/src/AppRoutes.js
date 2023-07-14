import CustomerList from "./pages/Customer/CustomerList";

const AppRoutes = [
  {
    index: true,
    element: <CustomerList />
  },
  {
    path: '/counter',
    element: <CustomerList />
  },
  {
    path: '/fetch-data',
    element: <CustomerList />
  }
];

export default AppRoutes;
