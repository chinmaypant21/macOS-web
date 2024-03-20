import { FC, Fragment, HTMLAttributes, useState } from "preact/compat"

import LoadingScreen from "@components/Screen/LoadingScreen"

// Styles
import './Iframewrapper.css'

type IframeWrapperProps = {
    loadingTitle?: string,
    src: string
} & HTMLAttributes<HTMLIFrameElement>

const IframeWrapper: FC<IframeWrapperProps> = ({ loadingTitle, src, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <Fragment>
            {isLoading && <LoadingScreen title={loadingTitle} />}
            <iframe
                {...props}
                class='app-window-iframe'
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
                hidden={isLoading}
                src={src}
                onLoad={() => setIsLoading(false)}
            ></iframe>
        </Fragment>
    )
}

export default IframeWrapper