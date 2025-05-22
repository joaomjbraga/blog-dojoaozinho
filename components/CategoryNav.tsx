import Link from 'next/link';
import { getCategories } from '@/lib/mdx';

export default async function CategoryNav() {
  const categories = await getCategories();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Categorias</h2>
      
      {categories.length === 0 ? (
        <p className="text-gray-500">Nenhuma categoria encontrada</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link 
                href={`/categorias/${category.slug}`}
                className="flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-4 pt-3 border-t">
        <Link 
          href="/categorias"
          className="text-blue-600 hover:underline text-sm"
        >
          Ver todas as categorias
        </Link>
      </div>
    </div>
  );
}