// Client-side auth utilities (safe for client components)

// Helper to check if we're in browser environment
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// Safe localStorage access
export function getLocalStorageItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setLocalStorageItem(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore errors
  }
}

export function removeLocalStorageItem(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const newAccessToken = data.accessToken;

      // Store the new access token
      if (newAccessToken) {
        setLocalStorageItem('accessToken', newAccessToken);
        return newAccessToken;
      }
    }

    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

export async function apiRequest(url: string, options: RequestInit = {}): Promise<Response> {
  // Get current access token
  const accessToken = getLocalStorageItem('accessToken');

  // Add authorization header if token exists
  if (accessToken) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  let response = await fetch(url, options);

  // If unauthorized (401), try to refresh token
  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      // Retry the request with new token
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${newToken}`,
      };
      response = await fetch(url, options);
    } else {
      // Refresh failed, redirect to login
      removeLocalStorageItem('accessToken');
      if (isBrowser()) {
        window.location.href = '/sign-in';
      }
    }
  }

  return response;
}

export function logout(): void {
  removeLocalStorageItem('accessToken');
  if (isBrowser()) {
    window.location.href = '/sign-in';
  }
}

// Utility to check if current user is admin
export function isUserAdmin(): boolean {
  try {
    const accessToken = getLocalStorageItem('accessToken');
    if (!accessToken) return false;

    // Decode JWT token (without verification for client-side check)
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    return payload.isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Utility to get current user info from token
export function getCurrentUser(): { userId: string; email: string; userName?: string; isAdmin: boolean } | null {
  try {
    const accessToken = getLocalStorageItem('accessToken');
    if (!accessToken) return null;

    // Decode JWT token (without verification for client-side check)
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    return {
      userId: payload.userId,
      email: payload.email,
      userName: payload.userName,
      isAdmin: payload.isAdmin || false,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Utility to check if user is authenticated
export function isAuthenticated(): boolean {
  const accessToken = getLocalStorageItem('accessToken');
  if (!accessToken) return false;

  try {
    // Check if token is expired
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    console.error("Error while checking if user is Authenticated:", error)
    return false;
  }
}
