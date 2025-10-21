import { tesoros, stream } from '@prisma/client';
import { getCacheConfig } from './cache';

interface ProductsResponse {
  data: tesoros[];
  total: number;
  page: number;
  totalPages: number;
}

interface SearchProductsParams {
  filters?: Record<string, (string | number)[]>;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export const api = {
  async getProducts(page = 1, pageSize = 10): Promise<ProductsResponse> {
    const response = await fetch(
      `/api/products?page=${page}&pageSize=${pageSize}`,
      {
        ...getCacheConfig('PRODUCTS'),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  async searchProducts(
    params: SearchProductsParams
  ): Promise<ProductsResponse> {
    const response = await fetch('/api/products/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      ...getCacheConfig('SEARCH'),
    });

    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    return response.json();
  },

  async getFilters(): Promise<Record<string, (string | number)[]>> {
    const response = await fetch('/api/filters', {
      ...getCacheConfig('FILTERS'),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch filters');
    }

    return response.json();
  },

  async getStream(): Promise<stream | null> {
    const response = await fetch('/api/stream', {
      ...getCacheConfig('STREAM'),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stream');
    }

    return response.json();
  },

  async getProductById(id: string): Promise<tesoros> {
    const response = await fetch(`/api/products/${id}`, {
      ...getCacheConfig('PRODUCTS'),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },
};

export const serverApi = {
  async getProducts(page = 1, pageSize = 10): Promise<ProductsResponse> {
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL ||
      'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/products?page=${page}&pageSize=${pageSize}`,
      {
        ...getCacheConfig('PRODUCTS'),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  async searchProducts(
    params: SearchProductsParams
  ): Promise<ProductsResponse> {
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL ||
      'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      ...getCacheConfig('SEARCH'),
    });

    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    return response.json();
  },

  async getFilters(): Promise<Record<string, (string | number)[]>> {
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL ||
      'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/filters`, {
      ...getCacheConfig('FILTERS'),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch filters');
    }

    return response.json();
  },

  async getStream(): Promise<stream | null> {
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL ||
      'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/stream`, {
      ...getCacheConfig('STREAM'),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stream');
    }

    return response.json();
  },
};
