import { PostsProvider } from '@/components/providers/PostsProvider';
import {
    AudioPlayerProvider,
} from '@/components/providers/AudioPlayerProvider';
import {
    OpenedPostProvider,
} from '@/components/providers/OpenedPostProvider';

export default function ProvidersWrapper({ children }) {
    return <PostsProvider>
        <AudioPlayerProvider>
            <OpenedPostProvider>
                { children }
            </OpenedPostProvider>
        </AudioPlayerProvider>
    </PostsProvider>;
}
