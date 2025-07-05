import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PostsProvider } from '@/components/providers/PostsProvider';
import {
    AudioPlayerProvider,
} from '@/components/providers/AudioPlayerProvider';

export default function ProvidersWrapper({ children }) {
    return <ThemeProvider>
        <PostsProvider>
            <AudioPlayerProvider>
                { children }
            </AudioPlayerProvider>
        </PostsProvider>
    </ThemeProvider>;
}