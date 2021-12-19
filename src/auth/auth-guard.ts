import { Context, Commands, RedirectResult } from '@vaadin/router';

import { AuthorizationService } from './authorization-service';
import ConfigStore from '../store/config.store';
import DataStore from '../store/data.store';

export async function authGuard(context: Context, commands: Commands): Promise<RedirectResult | undefined> {
  const isAuthorized = AuthorizationService.isAuthorized();

  ConfigStore.dispatch({ type: 'HANDLE_LOGIN', payload: isAuthorized });

  if (!isAuthorized) {
    console.warn('User not authorized', context.pathname);
    return commands.redirect('/login');
  }

  DataStore.dispatch({ type: 'GET' });

  return undefined;
}
