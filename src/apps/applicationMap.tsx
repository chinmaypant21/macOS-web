import { lazy } from "preact/compat"

import IframeWrapper from "./helper/IframeWrapper"

const VsCodeApp = () => {
    return (
        <IframeWrapper
            loadingTitle="Loading Code 👩‍💻"
            src={'https://codesandbox.io/embed/5298mq?view=editor+%2B+preview&module=%2Fsrc%2Fapp.tsx&hidenavigation=1'}
            style="border-radius: 4px; overflow:hidden;"
            title="macos-react"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
    )
}

const SafariBrowserApp = () => {
    return (
        <IframeWrapper
            loadingTitle="Loading Safari 🦁"
            src={'https://www.google.com/webhp?igu=1'}
            title="Google" 
            allowFullScreen
        />
    )
}

const SpotifyApp = () => {
    return (
        <IframeWrapper
            loadingTitle="Loading Spotify 🎵"
            src={'https://open.spotify.com/embed/playlist/6X185BlQApNN7mjiFFhPdi?utm_source=oembed'}
            allowFullScreen
        />
    )
}

const OksoDrawApp = () => {
    return (
        <IframeWrapper
            loadingTitle="Loading OkSo Draw 🖌️"
            src={'https://okso.app/'}
            allowFullScreen
        />
    )
}


const GoogleMapsApp = lazy(() => import('./GoogleMapsApp/GoogleMapsApp'))
const TerminalApp = lazy(() => import('./TerminalApp/TerminalApp'))

export const applicationMap : any = {
    'visual-studio-code': VsCodeApp,
    'safari': SafariBrowserApp,
    'spotify': SpotifyApp,
    'okso-draw-app': OksoDrawApp,
    'terminal': TerminalApp,
    'google-maps-app': GoogleMapsApp,
    // 'photos':
}