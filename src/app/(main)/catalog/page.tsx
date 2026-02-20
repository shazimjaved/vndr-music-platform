
import { Suspense } from 'react';
import CatalogClient from './catalog-client';

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogClient />
    </Suspense>
  );
}
