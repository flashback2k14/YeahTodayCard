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

export const router = new Router(document.getElementById('outlet'));
router.setRoutes(routes);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
