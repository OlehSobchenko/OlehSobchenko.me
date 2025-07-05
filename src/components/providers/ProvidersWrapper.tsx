import { PostsProvider } from '@/components/providers/PostsProvider';
import {
    AudioPlayerProvider,
} from '@/components/providers/AudioPlayerProvider';

export default function ProvidersWrapper({ children }) {
    return <PostsProvider>
        <AudioPlayerProvider>
            { children }
        </AudioPlayerProvider>
    </PostsProvider>;
}
