import { jwtDecode } from 'jwt-decode';

class AuthService {
  hasToken(): string | false {
    const token = localStorage.getItem('ID_TOKEN');
    console.log('token returned is  ', token);
    return token ? token : false;
  }

  clearToken(): void {
    localStorage.removeItem('ID_TOKEN');
    console.log('token removed');
    return;
  }

  isLoggedIn(): boolean | string {
    const token = this.hasToken();
    if (!token) {
      console.log('no token found');
      return false;
    }

    try {
      const decoded: { exp: number } = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      // we want to return true if the decoded expiration time
      // is not greater than the current time
      const expiryDate = new Date(decoded.exp * 1000);
      const formattedExpiryDate = expiryDate.toLocaleString('en-US', {
        weekday: 'long',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const currentDate = new Date(currentTime * 1000);
      const formattedCurrentDate = currentDate.toLocaleString('en-US', {
        weekday: 'long',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      console.log('Token expiry date and time:', formattedExpiryDate);
      console.log('Current date and time:', formattedCurrentDate);
      console.log(
        'is the token expired? the answer is ',
        !(decoded.exp > currentTime)
      );
      return decoded.exp > currentTime;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return String(error);
    }
  }

  async login(username: string, password: string): Promise<void> {
    let token = this.hasToken();
    console.log('token', token);

    // Implement login logic here
    if (token === false) {
      console.log('there was no token, so we are logging in to fetch one');
      const loginResponse = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const loginData = await loginResponse.json();

      token = loginData.token;

      if (token) {
        localStorage.setItem('ID_TOKEN', token);
      }
      console.log('token created and stored');
    } else {
      console.log('token exists, so we are going to use the existing token');
    }
  }
}

export default new AuthService();
