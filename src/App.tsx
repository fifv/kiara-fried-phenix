import clsx from 'clsx'
import { LazyExoticComponent, Suspense, lazy, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

// import App from './test-devtool'
// import App from './components/Slider'
// import App from './try-trpc/try-trpc-client'
// import App from './try-css-absoluteincss'
// import App from './try-vanilla/try02-css-3dtransform'

// import App from './try01-material'
// import App from './try02-fuckingmodules'
// import App from './try03-virtualize'
// import App from './try04-mediaapi'
// import App from './try05-customhook'
// import App from './try06-scrollsnap'
// import App from './try07-dotenv'
// import App from './try08-canvas'
// import App from './try09-colorconsole'
// import App from './try10-svg'
// import App from './try11-historylib'
// import App from './try12-spinner'
// import App from './try13-virtualize-tanstack-example'
// import App from './try14-gesturearea'
// import App from './try15-markdown'
// import App from './try16-audio'
// import App from './try17-virtualize-tanstack'
// import App from './try18-echarts'
/**
 * see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 * I must use specific filename pattern
 */
const appTitlesAndComponents: [string, LazyExoticComponent<() => JSX.Element>][] = [
    ['01-material', lazy(() => import('./try01-material')),],
    ['02-fuckingmodules', lazy(() => import('./try02-fuckingmodules')),],
    ['03-virtualize', lazy(() => import('./try03-virtualize')),],
    ['04-mediaapi', lazy(() => import('./try04-mediaapi')),],
    ['05-customhook', lazy(() => import('./try05-customhook')),],
    ['06-scrollsnap', lazy(() => import('./try06-scrollsnap')),],
    ['07-dotenv', lazy(() => import('./try07-dotenv')),],
    ['08-canvas', lazy(() => import('./try08-canvas')),],
    ['09-colorconsole', lazy(() => import('./try09-colorconsole')),],
    ['10-svg', lazy(() => import('./try10-svg')),],
    ['11-historylib', lazy(() => import('./try11-historylib')),],
    ['12-spinner', lazy(() => import('./try12-spinner')),],
    ['13-virtualize-tanstack-example', lazy(() => import('./try13-virtualize-tanstack-example')),],
    ['14-gesturearea', lazy(() => import('./try14-gesturearea')),],
    ['15-markdown', lazy(() => import('./try15-markdown')),],
    ['16-audio', lazy(() => import('./try16-audio')),],
    ['17-virtualize-tanstack', lazy(() => import('./try17-virtualize-tanstack')),],
    ['18-echarts', lazy(() => import('./try18-echarts')),],
    ['19-animate-menu', lazy(() => import('./try19-animate-menu')),],
    ['Slider', lazy(() => import('./components/Slider')),],
    ['vanilla-01-css-absoluteincss', lazy(() => import('./try-vanilla/try01-css-absoluteincss')),],
    ['vanilla-02-css-3dtransform', lazy(() => import('./try-vanilla/try02-css-3dtransform')),],
]
// const Apps = appTitlesAndComponents.map((appPath) =>
//     lazy(() => import(`./try${appPath}.tsx`))
// )
export default function App() {
    const [currentAppIndex, setCurrentAppIndex] = useLocalStorage('currentAppIndex', 0)
    const [isShowPanel, setIsShowPanel] = useLocalStorage('isShowPanel', true)

    const CurrentApp = appTitlesAndComponents[currentAppIndex][1]

    return (
        <>
            <div
                onClick={ () => {
                    setIsShowPanel((x) => (!x))
                } }
                className={ clsx(
                    '',
                    'z-[99999] m-1 fixed right-0 h-8 w-8 flex justify-center items-center',
                    'rounded',
                    'hover:bg-white/10 active:bg-white/5',
                    'select-none font-bold font-mono',
                ) }
            >{ isShowPanel ? '>' : '<' }</div>
            {
                isShowPanel &&
                <div className={ clsx(
                    'navigationPanel',
                    'z-[99999] m-1 p-1  fixed right-0 top-10 max-h-[calc(100vh_-_52px)] overflow-y-auto',
                    'outline outline-white/30 outline-1 bg-black/30 rounded',
                    'select-none font-bold font-mono',
                ) }>
                    {
                        appTitlesAndComponents.map((appTitleAndComponent, i) =>
                            <div
                                key={ i }
                                className={ clsx(
                                    'rounded p-1',
                                    'hover:bg-white/10 active:bg-white/5',
                                    currentAppIndex === i && 'outline outline-lime-300 text-lime-300'
                                ) }
                                onPointerDown={ () => {
                                    setCurrentAppIndex(i)
                                } }
                                onPointerEnter={ (e) => {
                                    if (e.buttons === 1) {
                                        setCurrentAppIndex(i)
                                    }
                                } }
                            >{ appTitleAndComponent[0] }</div>
                        )
                    }
                </div>
            }

            {/* <Suspense fallback={ <div>loading...</div> }> */ }
            <CurrentApp></CurrentApp>
            {/* </Suspense> */ }
        </>
    )
}
