export class AuthorizationService {
  private static readonly key = 'YTC:IS:AUTHORIZED';

  public static isAuthorized(): boolean {
    const token = AuthorizationService._getToken();
    return token !== null;
  }

  public static setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  public static resetToken(): void {
    localStorage.removeItem(this.key);
  }
  
  private static _getToken(): string | null {
    return localStorage.getItem(this.key);
  }
}
