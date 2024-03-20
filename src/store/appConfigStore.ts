//Icon
import FinderIcon from '@assets/images/app/finder.svg'
import SettingsIcon from '@assets/images/app/settings.svg'
import TerminalIcon from '@assets/images/app/terminal.png'
import SafariIcon from '@assets/images/app/safari.png'
import CodeIcon from '@assets/images/app/vscode.png'
import MapsIcon from '@assets/images/app/maps.png'
import CalculatorIcon from '@assets/images/app/calculator.svg'
import PhotosIcon from '@assets/images/app/photos.svg'
import SpotifyIcon from '@assets/images/app/spotify.svg'
import DrawIcon from '@assets/images/app/draw.png'
import WhatsappIcon from '@assets/images/app/whatsapp.png'

export const appConfigStore : Record<string, AppBaseConfig> = {
    'finder': {
        id: 'finder',
        title: 'Finder',
        isMinimized: false,
        icon: FinderIcon,
        dimensions: {
            width: 800,
            height: 600,
            minWidth: 200,
            minHeight: 300
        },
    },
    'settings': {
        id: 'settings',
        title: 'Settings',
        isMinimized: false,
        icon: SettingsIcon,
        dimensions: {
            width: 500,
            height: 500,
            minWidth: 50,
            minHeight: 50
        }
    },
    'terminal': {
        id: 'terminal',
        title: 'Terminal',
        isMinimized: false,
        icon: TerminalIcon,
        dimensions: {
            width: 650,
            height: 400,
            minWidth: 100,
            minHeight: 100
        }
    },
    'safari': {
        id: 'safari',
        title: 'Safari',
        isMinimized: false,
        icon: SafariIcon,
        dimensions: {
            width: 1000,
            height: 600,
            minWidth: 50,
            minHeight: 50
        },
    },
    'visual-studio-code': {
        id: 'visual-studio-code',
        title: 'VS Code',
        isMinimized: false,
        icon: CodeIcon,
        dimensions: {
            width: 800,
            height: 500,
            minWidth: 300,
            minHeight: 200
        }
    },
    'calculator': {
        id: 'calculator',
        title: 'Calculator',
        isMinimized: false,
        icon: CalculatorIcon,
        dimensions: {
            width: 500,
            height: 500,
            minWidth: 200,
            minHeight: 200
        }
    },
    'google-maps-app': {
        id: 'google-maps-app',
        title: 'Maps',
        isMinimized: false,
        icon: MapsIcon,
        dimensions: {
            width: 800,
            height: 600,
            minWidth: 300,
            minHeight: 300
        }
    },
    'photos': {
        id: 'photos',
        title: 'Photos',
        isMinimized: false,
        icon: PhotosIcon,
        dimensions: {
            width: 500,
            height: 500,
            minWidth: 50,
            minHeight: 50
        }
    },
    'spotify': {
        id: 'spotify',
        title: 'Spotify',
        isMinimized: false,
        icon: SpotifyIcon,
        dimensions: {
            width: 500,
            height: 500,
            minWidth: 50,
            minHeight: 50
        }
    },
    'okso-draw-app': {
        id: 'okso-draw-app',
        title: 'Okso',
        isMinimized: false,
        icon: DrawIcon,
        dimensions: {
            width: 800,
            height: 500,
            minWidth: 50,
            minHeight: 50
        }
    },
    'whatsapp': {
        id: 'whatsapp',
        title: 'WhatsApp',
        isMinimized: false,
        icon: WhatsappIcon,
        dimensions: {
            width: 500,
            height: 500,
            minWidth: 50,
            minHeight: 50
        }
    }
}