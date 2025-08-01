'use client';

export default function ScrollDown() {
    const handleScrollDownScreenHeight = () => {
        const mainPart = document?.getElementById('main-background');
        const clientHeight = mainPart?.getBoundingClientRect()?.height;
        const scrollTop = document?.documentElement?.scrollTop;

        if (
            typeof clientHeight !== 'undefined'
            && typeof scrollTop !== 'undefined'
        ) {
            window.scrollBy({
                top: scrollTop < clientHeight
                    ? clientHeight - scrollTop
                    : 0
                ,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    return <div
        className="absolute right-0 left-0 flex justify-center items-center"
        style={{
            top: 'calc(var(--with-address-bar-height) - 88px)',
            transition: 'top 400ms ease',
        }}
    >
        <div
            className="cursor-pointer w-48 max-w-screen flex justify-center"
            onClick={ handleScrollDownScreenHeight }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 20 20"
                width="48px"
                style={{
                    transform: 'rotate(90deg)',
                }}
            >
                <g>
                    <g>
                        <rect fill="none" height="20" width="20"/>
                    </g>
                </g>
                <g>
                    <polygon
                        style={{
                            filter: 'drop-shadow(var(--scroll-down-shadow))',
                        }}
                        points="4.59,16.59 6,18 14,10 6,2 4.59,3.41 11.17,10"
                    />
                </g>
            </svg>
        </div>
    </div>;
}
