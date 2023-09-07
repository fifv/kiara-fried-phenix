import { useState } from "react"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import 'github-markdown-css/github-markdown-dark.css'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
const queryClient = new QueryClient()
import ReactMarkdown from 'react-markdown'
import clsx from "clsx"
function Some() {
    const [count, setCount] = useState(0)
    const { isLoading, error, data: markdown, isSuccess } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('/test.md').then(
                (res) => res.text(),
            ),
    })

    if (isSuccess) {
        return (
            <div>
                {"<script>alert('xss')</script>"}
                <ReactMarkdown className={ clsx(
                    "#markdown-body prose max-w-none prose-invert ",
                    // "prose-code:before:content-['`'] ",
                    // "pro1se-code:bg-purple-400/40 prose-code:rounded prose-code:p-0.5 prose-code:font-mono",
                ) } children={ markdown } remarkPlugins={ [remarkGfm] } components={ {
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match
                            ? (
                                <SyntaxHighlighter
                                    children={ String(children).replace(/\n$/, '') }
                                    style={ oneDark }
                                    showLineNumbers={ true }
                                    customStyle={ { fontFamily: 'monospace' } }
                                    language={ match[1] }
                                    PreTag="div"
                                    { ...props }
                                />
                            )
                            : (
                                <code className={ clsx(
                                    className,
                                    "prose-code:before:content-[''] ",
                                    "prose-code:bg-purple-400/40 prose-code:rounded prose-code:p-0.5 prose-code:font-mono"
                                ) } { ...props }>
                                    { children }
                                </code>
                            )
                    }
                } } />
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="bg-red-400 p-4 rounded inline-block">Loading...</div>
        )
    }
    return (
        <div>error</div>
    )
}
export default function App() {

    return (
        <QueryClientProvider client={ queryClient }>
            <Some></Some>
        </QueryClientProvider>
    )
}
