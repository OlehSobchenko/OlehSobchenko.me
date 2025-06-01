const hasOwn = Object.prototype.hasOwnProperty;

type ClassValue =
    | string
    | number
    | null
    | undefined
    | boolean
    | ClassDictionary
    | Array<ClassValue>;

interface ClassDictionary {
    [key: string]: any;
}

export default function classNames(...args: ClassValue[]): string {
    return args.reduce((accumulated: string, current: ClassValue) => {
        if (current) {
            return appendClass(accumulated, parseValue(current));
        }

        return accumulated;
    }, '');
}

function parseValue(arg: ClassValue): string {
    if (typeof arg === 'string' || typeof arg === 'number') {
        return String(arg);
    }

    if (!arg || typeof arg !== 'object') {
        return '';
    }

    if (Array.isArray(arg)) {
        return classNames(...arg);
    }

    if (
        arg.toString !== Object.prototype.toString &&
        !arg.toString.toString().includes('[native code]')
    ) {
        return arg.toString();
    }

    return Object.keys(arg).reduce((accumulated: string, current: string) => {
        if (hasOwn.call(arg, current) && arg[current]) {
            return  appendClass(accumulated, current);
        }

        return accumulated;
    }, '');
}

function appendClass(value: string, newClass: string): string {
    if (!newClass) {
        return value;
    }

    return value ? `${ value } ${ newClass }` : newClass;
}
