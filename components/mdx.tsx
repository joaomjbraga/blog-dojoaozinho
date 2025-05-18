import { MDXRemote } from 'next-mdx-remote/rsc'

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  return <MDXRemote source={code} />
}
