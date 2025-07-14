interface NodeRequire {
    context(
        directory: string,
        useSubdirectories: boolean,
        regExp: RegExp
    ): {
        keys: () => string[];
        (id: string): any;
    };
}

const requireSvg = (<NodeRequire><unknown>require).context(
    '@/icons',
    false,
    /\.svg$/,
);

const svgs: { [key: string]: string } = {};

requireSvg.keys().forEach((fileName: string) => {
    const svgKey = fileName.replace('./', '').replace('.svg', '');

    svgs[svgKey] = requireSvg(fileName).default;
});

export default svgs;
