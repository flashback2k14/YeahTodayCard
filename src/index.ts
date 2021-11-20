import { Route, Router } from '@vaadin/router';

import { authGuard } from './auth/auth-guard.js';

const routes: Route[] = [
  {
    path: '/',
    component: 'tc-app',
    action: async () => {
      await import('./components/tc-app');
    },
    children: [
      {
        path: '',
        redirect: '/cards',
      },
      {
        path: 'login',
        component: 'tc-login',
        children: [
          {
            path: '',
            component: 'tc-login',
            action: async () => {
              await import('./components/pages/login/tc-login');
            },
          },
        ],
      },
      {
        path: 'cards',
        component: 'tc-cards',
        action: authGuard,
        children: [
          {
            path: '',
            component: 'tc-cards',
            action: async () => {
              await import('./components/pages/cards/tc-cards');
            },
          },
        ],
      },
    ],
  },
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
