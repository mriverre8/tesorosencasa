const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function getAllProducts() {
  try {
    const response = await fetch(`${baseUrl}/api/products`);
    if (!response.ok) {
      console.warn('[HTTP_ERROR] Failed to fetch products', {
        status: response.status,
        statusText: response.statusText,
        url: `${baseUrl}/api/products`,
        timestamp: new Date().toISOString(),
      });
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[CLIENT_ERROR] getAllProducts failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: `${baseUrl}/api/products`,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    });
    return { data: [], total: 0 };
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`${baseUrl}/api/products/${id}`);
    if (!response.ok) {
      console.warn('[HTTP_ERROR] Failed to fetch product', {
        status: response.status,
        statusText: response.statusText,
        url: `${baseUrl}/api/products/${id}`,
        timestamp: new Date().toISOString(),
      });
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[CLIENT_ERROR] getProductById failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: `${baseUrl}/api/products/${id}`,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    });
    return { data: {} };
  }
}

export async function getStream() {
  try {
    const response = await fetch(`${baseUrl}/api/stream`);
    if (!response.ok) {
      console.warn('[HTTP_ERROR] Failed to fetch stream', {
        status: response.status,
        statusText: response.statusText,
        url: `${baseUrl}/api/stream`,
        timestamp: new Date().toISOString(),
      });
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('[CLIENT_ERROR] getStream failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: `${baseUrl}/api/stream`,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    });
    return { data: null };
  }
}
