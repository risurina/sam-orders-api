import { getCatalogs, getCatalogById } from './catalog-services';

describe('Catalog Services', () => {
  it('should return catalogs', async () => {
    const result = await getCatalogs();
    const catalogs = [
      {
        id: 1,
        name: 'node',
        description: 'Node',
      },
      {
        id: 2,
        name: 'typescript',
        description: 'Typescript',
      },
    ];
    expect(result).toEqual(catalogs);
  });

  it('should return catalog by id', async () => {
    const result = await getCatalogById(1);
    const catalog = {
      id: 1,
      name: 'node',
      description: 'Node',
    };
    expect(result).toEqual(catalog);
  });
});
