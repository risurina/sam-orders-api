import { Catalog } from './../types/catalogs';

// dummy data
const catalogs: Catalog[] = [
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

export async function getCatalogs(): Promise<Catalog[]> {
  return catalogs;
}

export async function getCatalogById(id: number): Promise<Catalog | null> {
  const catalog = catalogs.find((c) => c.id === id) || null;
  return catalog;
}
