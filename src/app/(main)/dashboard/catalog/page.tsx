
import { Suspense } from 'react';
import Catalog from './catalog';

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Catalog />
    </Suspense>
  );
}
