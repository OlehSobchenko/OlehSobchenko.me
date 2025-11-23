import PostPage from '@/components/pages/PostPage';
import getIndexedEntries from '@/utils/data/getIndexedEntries';

export default async function ShortPostRoute(
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    return <PostPage id={ id }/>;
}

export async function generateStaticParams() {
    const index = await getIndexedEntries<Record<string, unknown>>(
        'posts',
        true,
    );

    const params = Object.keys(index || {}).map(id => ({ id }));

    console.log(params);

    return params;
}
