import PostModal from '@/components/posts/PostModal';
import {
    AudioPlayerProvider,
} from '@/components/providers/AudioPlayerProvider';
import AudioControl from '@/components/specific/AudioControl';

export default function PostPage(props: { id: string }) {
    return <AudioPlayerProvider>
        <PostModal id={ props.id }/>
        <AudioControl showButton={ false }/>
    </AudioPlayerProvider>;
}
