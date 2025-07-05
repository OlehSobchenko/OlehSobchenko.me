import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PostsProvider } from '@/components/providers/PostsProvider';
import {
    AudioPlayerProvider,
} from '@/components/providers/AudioPlayerProvider';
import PostModal from '@/components/posts/PostModal';

export default function PostPage(props: { id: string }) {
    return <ThemeProvider>
        <PostsProvider>
            <AudioPlayerProvider>
                <PostModal id={ props.id }/>
            </AudioPlayerProvider>
        </PostsProvider>
    </ThemeProvider>;
}
