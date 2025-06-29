import OutlinedButton from '@/components/base/OutlinedButton';

export default function CmsLoginForm(props: {
    authorize: (token: string) => void
}) {
    return <div
        style={ { padding: '2rem' } }
        className="flex flex-col items-end"
    >
        <input
            className="border-4!"
            type="password"
            placeholder="GitHub Personal Access Token"
            style={ {
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
            } }
        />
        <OutlinedButton
            className="border-4! outline-0 focus:outline-0 focus:rounded-none"
            onClick={ e => {
                const token = (
                    e.currentTarget.parentElement
                        ?.children[0] as HTMLInputElement
                )?.value;

                props.authorize(token);
            } }
        >
            Login
        </OutlinedButton>
    </div>;
}
