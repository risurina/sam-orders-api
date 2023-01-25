import { getCatalogs, getCatalogById } from './catalog-services';
import { getItems, getItem, createItem } from './dynamo/catalogs';

jest.mock('./dynamo/catalogs', () => ({
  getItems: () => [{ id: 1 }],
  getItem: (id: string) => id,
  createItem: (item: any) => item,
}));

describe('Catalog Services', () => {
  it('should return catalogs', async () => {
    const result = await getCatalogs();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should return catalog by id', async () => {
    const result = await getCatalogById('1');
    expect(result).toEqual({ id: '1' });
  });
});
