import { Catalog } from './../types/catalogs';
import { v4 as uuidv4 } from 'uuid';
import { getItems as _getCatalogs, getItem as getCatalog, createItem as _createCatalog } from './dynamo/catalogs';

export async function createCatalog(item: Omit<Catalog, 'id'>): Promise<Catalog> {
  const catalog = {
    id: uuidv4(),
    ...item,
  };

  return _createCatalog(catalog);
}

export async function getCatalogs(): Promise<Catalog[]> {
  return _getCatalogs();
}

export async function getCatalogById(id: string): Promise<Catalog | null> {
  return getCatalog({ id });
}
