import AppsIcon from '@assets/images/icons/menu/apps_folder.png';
import BooksIcon from '@assets/images/icons/menu/book_folder.png';
import CloudIcon from '@assets/images/icons/menu/cloud_folder.png';
import DownloadsIcon from '@assets/images/icons/menu/downloads_folder.png';
import MusicIcon from '@assets/images/icons/menu/music.png';
import PagesIcon from '@assets/images/icons/menu/pages.png';

export const commonPathMenu: ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'App', icon: AppsIcon },
            { text: 'Book', icon: BooksIcon },
            { text: 'Cloud', icon: CloudIcon },
            { text: 'Downloads', icon: DownloadsIcon },
            { text: 'Music', icon: MusicIcon },
            { text: 'Pages', icon: PagesIcon },
        ]
    },
]