// API utility functions to replace server actions

export async function getAllProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/all`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch all products');
    }
    return await response.json();
  } catch (error) {
    console.error('[API] getAllProducts error:', error);
    return { data: [], total: 0 };
  }
}

export async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('[API] getProducts error:', error);
    return { data: [], total: 0 };
  }
}

export async function getFilters() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/filters`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch filters');
    }
    return await response.json();
  } catch (error) {
    console.error('[API] getFilters error:', error);
    return {};
  }
}

export async function getProductById(productId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('[API] getProductById error:', error);
    return null;
  }
}

type Filters = {
  condition?: string[];
  origin?: string[];
  brand?: string[];
  material?: string[];
  category?: string[];
  price?: number[];
};

export async function getProductsByFilters(
  page: number,
  filters: Filters,
  searchTerm: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          filters,
          searchTerm,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products by filters');
    }

    return await response.json();
  } catch (error) {
    console.error('[API] getProductsByFilters error:', error);
    return { data: [], total: 0 };
  }
}

export async function getStream() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stream`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch stream');
    }
    return await response.json();
  } catch (error) {
    console.error('[API] getStream error:', error);
    return null;
  }
}
