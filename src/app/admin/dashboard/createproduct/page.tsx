import React from 'react';
import CreateProductForm from '@/views/Admin/CreateProductForm/CreateProductForm';

export default async function CreateProduct() {
  return (
    <div className="bg-background">
      <main>
        <CreateProductForm />
      </main>
    </div>
  );
}
