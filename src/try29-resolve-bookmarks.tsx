
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import clsx from 'clsx'
import { Fragment } from 'react/jsx-runtime'
import { useLocalStorage } from 'usehooks-ts'
// interface BookmarkNode {
//     children?: BookmarkNode[]
//     date_added: string
//     date_last_used: string
//     date_modified: string
//     guid: string
//     id: string
//     name: string
//     type: "folder" | "url"
// }
interface BookmarkFolderNode {
    children: BookmarkNodeType[]
    date_added: string
    date_last_used: string
    date_modified: string
    guid: string
    id: string
    name: string
    type: "folder"
}
interface BookmarkUrlNode {
    date_added: string
    date_last_used: string
    date_modified: string
    guid: string
    id: string
    name: string
    type: "url"
    url: string
}
type BookmarkNodeType = BookmarkFolderNode | BookmarkUrlNode

function countUrlRecursive(node: BookmarkNodeType): number {
    if (node.type === 'url') {
        return 1
    } else if (node.type === 'folder') {
        return node.children.reduce((prev, curr) => {
            return prev + countUrlRecursive(curr)
        }, 0)
    }
    throw "?"

    // node.children.reduce((prev, curr) => {
    //                 if (curr.type === 'url') {
    //                     return prev + 1
    //                 } else if (curr.type === 'folder') {
    //                     return 1
    //                 }
    //                 return 0
    //             }, 0)
}

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={ queryClient }>
            <Example />
        </QueryClientProvider>
    )
}


function BookmarkNode({ node }: {
    node: BookmarkNodeType
}): React.ReactNode {
    const [isExpanded, setIsExpanded] = useLocalStorage(node.guid, false)
    return <Fragment key={ node.guid }>
        <div className={ clsx(
            node.type === 'folder' && 'font-bold text-blue-500 cursor-pointer hover:bg-white/10 active:bg-white/5',
            'px-2 rounded'
        ) } onClick={ () => {
            setIsExpanded((x) => (!x))
        } }>
            { node.name }
            {
                node.type === 'folder' &&
                // <span className='text-yellow-200 mx-2'>{node.children.length}</span>
                <span className='text-yellow-200 mx-2'>{ countUrlRecursive(node) }</span>
            }
            {
                node.type === 'url' &&
                <a href={ node.url } target='_blank'> &gt;</a>
            }
        </div>

        {
            node.type === 'folder' && isExpanded &&
            <div className={ clsx(
                'ml-8 outline rounded-sm outline-dashed outline-white/20',
            ) }>
                { node.children.map((child) => <BookmarkNode node={ child } />) }
            </div>
        }
    </Fragment>
}

function Example() {
    const { isPending, error, data } = useQuery<BookmarkNodeType>({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('./Bookmarks').then((res) =>
                res.json(),
            ).then((res) => res.roots.bookmark_bar),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message



    return (
        <div className={ clsx(
            'mx-12 my-4',
        ) }>
            { <BookmarkNode node={ data } /> }
        </div>
    )
}