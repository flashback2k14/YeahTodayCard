import { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
import { Router } from '@vaadin/router';

import { AuthorizationService } from '../auth/authorization-service';
import EventBus, { EventNames } from '../utils/event-bus';

export class AuthStateController implements ReactiveController {
  private _host: ReactiveControllerHost;

  isAuthorized = AuthorizationService.isAuthorized();

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {
    EventBus.register(EventNames.LOGGED_IN, this._handleLoginCallback.bind(this));
  }

  hostDisconnected() {
    EventBus.remove(EventNames.LOGGED_IN, this._handleLoginCallback.bind(this));
  }

  logout(): void {
    AuthorizationService.resetToken();
    this.isAuthorized = AuthorizationService.isAuthorized();
    Router.go('/');
    this._host.requestUpdate();
  }

  private _handleLoginCallback(): void {
    this.isAuthorized = AuthorizationService.isAuthorized();
    this._host.requestUpdate();
  }
}
