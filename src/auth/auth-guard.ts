import { Context, Commands, RedirectResult } from '@vaadin/router';

import { AuthorizationService } from './authorization-service';
import Store from '../utils/store';

export async function authGuard(context: Context, commands: Commands): Promise<RedirectResult | undefined> {
  const isAuthorized = AuthorizationService.isAuthorized();

  if (!isAuthorized) {
    console.warn('User not authorized', context.pathname);
    return commands.redirect('/login');
  }

  Store.dispatch({ type: 'HANDLE_LOGIN', payload: isAuthorized });

  return undefined;
}
