import OutlinedButton from '@/components/base/OutlinedButton';
import { useTranslations } from 'next-intl';
import Modal from '@/components/base/Modal';
import useOpen from '@/utils/hooks/useOpen';
import { useLocale } from 'use-intl';
import biography from '@/data/biography.json';

export default function Biography() {
    const { open, close, opened } = useOpen();
    const locale = useLocale();
    const t = useTranslations('Biography');

    return <>
        <OutlinedButton
            className="lg:text-[40px] text-2xl mt-5 mb-5 pt-0.5"
            onClick={ open }
        >
            <span className="uppercase sm:pl-1.5">
                { t('title') }
            </span>
            <svg
                className="sm:block hidden"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
            >
                <path d="M647.19-435.93H144.17v-88.14h503.02L417.36-753.9 480-816.2 816.2-480 480-144.17l-62.64-61.93 229.83-229.83Z"/>
            </svg>
        </OutlinedButton>
        <Modal
            open={ opened }
            title={ t('title') }
            onClose={ close }
        >
            <div
                className="article"
                dangerouslySetInnerHTML={{ __html: (biography as any)[locale] }}
            />
        </Modal>
    </>;
}
