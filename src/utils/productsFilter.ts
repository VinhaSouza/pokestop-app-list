import { DataProduct } from '../@types/product';

export type ProductFilter = 'all' | 'nameAsc' | 'priceAsc' | 'priceDesc';
export const filterOptions = {
    filterAll: 'all' as const,
    filterName: 'nameAsc' as const,
    filtePriceAsc: 'priceAsc' as const,
    filterPriceDesc: 'priceDesc' as const,
};
// Padroniza o texto para facilitar a comparação
// trim() -> remove espaços do início e do final
// toLowerCase() -> transforma tudo em letras minúsculas
function normalizeText(text: string) {
    return text.trim().toLowerCase();
}

// Filtra os produtos de acordo com o texto pesquisado
function searchProducts(products: DataProduct[], search: string) {
    // Normaliza a pesquisa apenas uma vez
    const normalizedSearch = normalizeText(search);

    // Percorre os produtos e mantém apenas os que possuem o texto pesquisado no nome
    return products.filter((product) => normalizeText(product.name).includes(normalizedSearch)); // filter() -> cria um novo array e não altera o original
}

export function filterProducts(products: DataProduct[], search: string, filter: ProductFilter) {
    // Primeiro filtra os produtos pela pesquisa
    const filteredProducts = searchProducts(products, search);

    // Cria uma cópia para ordenar sem modificar o array principal
    const sortedProducts = [...filteredProducts];

    //Define qual ordenação será aplicada de acordo com o filtro selecionado
    switch (filter) {
        case filterOptions.filterName:
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // sort() -> altera o próprio rray, por isso o [...filteredProducts] antes de ordenar
            break;

        case filterOptions.filtePriceAsc:
            sortedProducts.sort((a, b) => a.price - b.price);
            break;

        case filterOptions.filterPriceDesc:
            sortedProducts.sort((a, b) => b.price - a.price);
            break;

        case filterOptions.filterAll:
        default:
            break;
    }
    return sortedProducts;
}
