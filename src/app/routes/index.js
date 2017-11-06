import Home from 'app/pages/Home';
import Order from 'app/pages/Order';


export default [
  {
    name: '홈',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    name: '주문하기',
    path: '/order',
    component: Order,
    exact: true,
  },
];
