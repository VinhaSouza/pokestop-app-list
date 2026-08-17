import { DataProduct } from '../@types/product';

export type ProductFilter = 'all' | 'nameAsc' | 'priceAsc' | 'priceDesc';

export function filterProducts(products: DataProduct[], search: string, filter: ProductFilter) {
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
    );

    const sortedProducts = [...filteredProducts];

    if (filter === 'nameAsc') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (filter === 'priceAsc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (filter === 'priceDesc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
}
