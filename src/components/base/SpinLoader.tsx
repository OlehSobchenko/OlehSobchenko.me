import classNames from '@/utils/classNames';

export default function SpinLoader({ className }: { className?: string }) {
    return <div
        className={
            classNames(
                'border-6 border-(--bg-color) border-t-(--main-color) rounded-full animate-spin',
                className,
            )
        }
    />;
}