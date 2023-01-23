import { Catalog } from './../types/catalogs';

// dummy data
export const catalogs: Catalog[] = [
  {
    id: 1,
    name: 'node',
    description: 'Node',
    amount: 10,
  },
  {
    id: 2,
    name: 'typescript',
    description: 'Typescript',
    amount: 10,
  },
];

export async function getCatalogs(): Promise<Catalog[]> {
  return catalogs;
}

export async function getCatalogById(id: number): Promise<Catalog | null> {
  const catalog = catalogs.find((c) => c.id === id) || null;
  return catalog;
}
