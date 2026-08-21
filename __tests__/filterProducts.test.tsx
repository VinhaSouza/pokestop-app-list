import { filterProducts, filterOptions } from '../src/utils/productsFilter';
import { DataProduct } from '../src/@types/product';

const products: DataProduct[] = [
    {
        name: 'poke-ball',
        price: 200,
        image: '',
    },
    {
        name: 'great-ball',
        price: 600,
        image: '',
    },
    {
        name: 'love-ball',
        price: 300,
        image: '',
    },
];

describe('filterProducts', () => {
    it('Deve retornar todos os produtos quando o filtro for all', () => {
        const result = filterProducts(products, '', filterOptions.filterAll);

        expect(result).toEqual(products);
    });

    it('Deve ordernar os produtos por nome crescente', () => {
        const result = filterProducts(products, '', filterOptions.filterName);

        expect(result.map((product) => product.name)).toEqual([
            'great-ball',
            'love-ball',
            'poke-ball',
        ]);
    });

    it('Deve ordenar os produtos por preço crescente', () => {
        const result = filterProducts(products, '', filterOptions.filtePriceAsc);

        expect(result.map((product) => product.price)).toEqual([200, 300, 600]);
    });

    it('Deve ordenar os produtos por preço decrescente', () => {
        const result = filterProducts(products, '', filterOptions.filterPriceDesc);

        expect(result.map((product) => product.price)).toEqual([600, 300, 200]);
    });

    it('Deve pesquisar produtos pelo nome', () => {
        const result = filterProducts(products, 'poke-ball', filterOptions.filterAll);

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('poke-ball');
    });

    it('Deve ignorar letras maiúsculas e minúsculas na pesquisa', () => {
        const result = filterProducts(products, 'LOVE-BALL', filterOptions.filterAll);

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('love-ball');
    });

    it('Deve ignorar espaços no começo e no final da pesquisa', () => {
        const result = filterProducts(products, ' great-ball ', filterOptions.filterAll);

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('great-ball');
    });
    it('Deve retornar uma lista vazia quando não encontrar produtos', () => {
        const result = filterProducts(products, 'MewTwo', filterOptions.filterAll);

        expect(result).toEqual([]);
    });
});
