import { lazy } from "preact/compat"
import { useState } from "preact/hooks"

const VsCodeApp = () => {
    return (
        <iframe 
            src="https://codesandbox.io/embed/5298mq?view=editor+%2B+preview&module=%2Fsrc%2Fapp.tsx&hidenavigation=1"
            style="width:100%; height: 100%; border:0; border-radius: 4px; overflow:hidden;"
            title="macos-react"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
    )
}

const SafariBrowserApp = () => {
    return (
        <iframe 
            style="width: 100%; height: 100%; border: 4px;" 
            src="https://www.google.com/webhp?igu=1" 
            title="Google" 
            loading={'eager'}
        ></iframe>
    )
}

const SpotifyApp = () => {
    return (
        <iframe 
            style="width: 100%; height: 100%; border: 0;"
            src="https://open.spotify.com/embed/playlist/6X185BlQApNN7mjiFFhPdi?utm_source=oembed" 
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
            allowFullScreen 
        ></iframe>
    )
}

const OksoDrawApp = () => {
    return (
        <iframe 
        style="width: 100%; height: 100%; border: 0;"
        src={'https://okso.app/'}
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
        allowFullScreen 
    ></iframe>
    )
}


const DemoApp = lazy(() => import('./DemoApp/DemoApp'))
const GoogleMapsApp = lazy(() => import('./GoogleMapsApp/GoogleMapsApp'))

export const applicationMap : any = {
    'finder': DemoApp,
    'visual-studio-code': VsCodeApp,
    'safari-browser': SafariBrowserApp,
    'spotify-app': SpotifyApp,
    'okso-draw-app': OksoDrawApp,
    'google-maps-app': GoogleMapsApp,
    'photos': () => {
        const [x,xx] = useState(false)
        return <div>
            <div onClick={()=>xx(!x)}>
                Click
            </div>
            {x && <div>Visible</div>}
        </div>
    }
}