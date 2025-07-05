import PostModal from '@/components/posts/PostModal';
import ProvidersWrapper from '@/components/providers/ProvidersWrapper';

export default function PostPage(props: { id: string }) {
    return <ProvidersWrapper>
        <PostModal id={ props.id }/>
    </ProvidersWrapper>;
}
