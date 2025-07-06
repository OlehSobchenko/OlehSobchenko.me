import OutlinedButton from '@/components/base/OutlinedButton';

export default function CmsLoginForm(props: {
    onAuthorize: (token: string) => void;
    onCmsLogin?: () => void;
}) {
    return <div
        style={ { padding: '2rem' } }
        className="flex flex-col items-end"
    >
        <input
            id="cms-auth-token"
            className="border-4! text-xl rounded-none outline-0 focus:outline-0 focus:rounded-none"
            type="password"
            placeholder="ВВЕДІТЬ ТОКЕН"
            style={ {
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
            } }
        />
        <div className="flex justify-between w-full flex-wrap-reverse gap-y-2 gap-x-4">
            <OutlinedButton
                className="border-4! outline-0 focus:outline-0 focus:rounded-none uppercase text-xl"
                onClick={ props.onCmsLogin }
            >
                Вхід через GitHub
            </OutlinedButton>
            <OutlinedButton
                className="border-4! outline-0 focus:outline-0 focus:rounded-none uppercase text-xl"
                onClick={ e => {
                    const token = (
                        e.currentTarget.parentElement
                            ?.children[0] as HTMLInputElement
                    )?.value;

                    if (!token) {
                        return;
                    }

                    props.onAuthorize(token);
                } }
            >
                Вхід
            </OutlinedButton>
        </div>
    </div>;
}
