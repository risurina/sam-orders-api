import { getCatalogs, getCatalogById, catalogs as dummyCatalogs } from './catalog-services';

describe('Catalog Services', () => {
  it('should return catalogs', async () => {
    const result = await getCatalogs();
    expect(result).toEqual(dummyCatalogs);
  });

  it('should return catalog by id', async () => {
    const result = await getCatalogById(1);
    const catalog = {
      id: 1,
      name: 'node',
      description: 'Node',
      amount: 10,
    };
    expect(result).toEqual(catalog);
  });
});
