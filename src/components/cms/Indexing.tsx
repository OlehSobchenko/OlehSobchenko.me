import OutlinedButton from '@/components/base/OutlinedButton';

export default function Indexing(props: {
    indexing: boolean,
    onClick: () => void
}) {
    return <div
        className={
            'flex justify-between items-center gap-8 w-screen p-6 min-h-20'
        }
    >
        <div>
            Натисніть <strong>Індексувати</strong>, наприклад, якщо
            допис не відображається у стрічці головної сторінки
        </div>
        <div className="flex justify-end flex-1">
            { !props.indexing && <OutlinedButton
                className="border-4!"
                onClick={ props.onClick }
            >
                <div className="font-black">ІНДЕКСУВАТИ</div>
            </OutlinedButton> }
            { props.indexing && <div>Ідексування...</div> }
        </div>
    </div>;
}
