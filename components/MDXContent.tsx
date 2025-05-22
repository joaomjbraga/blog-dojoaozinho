import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React from 'react';

interface MDXContentProps {
  source: string;
}

function CustomPre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4">
      {children}
    </pre>
  );
}

function CustomCode({ children, className }: { children: string; className?: string }) {
  const language = className?.replace(/language-/, '');
  
  if (!language) {
    return <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded">{children}</code>;
  }
  
  const highlightedCode = highlight(children);
  
  return (
    <code
      className={`language-${language}`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}

function CustomTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
        {children}
      </table>
    </div>
  );
}

function CustomTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  );
}

function CustomTd({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-gray-300 px-4 py-2">
      {children}
    </td>
  );
}

const components = {
  pre: CustomPre,
  code: CustomCode,
  table: CustomTable,
  th: CustomTh,
  td: CustomTd,
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}