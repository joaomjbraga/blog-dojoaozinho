import Link from 'next/link';
import SearchBar from './SearchBar';
import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';

export default function Header() {
  const posts = getAllPosts();

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-40">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/LGO.png"
              width={40}
              height={40}
              unoptimized
              alt="Logo do Blog do Joãozin"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold tracking-tight group-hover:text-gray-600 transition-colors">
              Blog do Joãozin
            </h1>
          </Link>

          <SearchBar posts={posts} />
        </div>
      </div>
    </header>
  );
}