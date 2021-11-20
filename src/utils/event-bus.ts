class EventBus {
  private _bus: HTMLDivElement;

  constructor() {
    this._bus = document.createElement('div');
  }

  register(event: string, callback: () => void): void {
    this._bus.addEventListener(event, callback);
  }

  remove(event: string, callback: () => void): void {
    this._bus.removeEventListener(event, callback);
  }

  fire(event: string, detail = {}): void {
    this._bus.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

const bus = new EventBus();

export default bus;

export const EventNames = {
  LOGGED_IN: 'ytcLoggedIn',
};
