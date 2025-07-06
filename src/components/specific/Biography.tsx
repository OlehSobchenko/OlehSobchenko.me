import OutlinedButton from '@/components/base/OutlinedButton';
import { useTranslations } from 'next-intl';
import Modal from '@/components/base/Modal';
import useOpen from '@/utils/hooks/useOpen';
import Markdown from 'react-markdown';
import { useEffect, useState } from 'react';
import config from '@/config';
import { Localized } from '@/i18n/config';
import LabeledIconContent from '@/components/base/LabeledIconContent';
import fetchJSON from '@/utils/data/fetchJSON';
import useLocale from '@/utils/hooks/useLocale';

const biographyUrl = config.contentUrl + 'biography.json';

export default function Biography() {
    const { open, close, opened } = useOpen();
    const locale = useLocale();
    const t = useTranslations('Biography');
    const [biography, setBiography] = useState<Partial<Localized>>({});

    useEffect(() => {
        fetchJSON(biographyUrl).then(setBiography);
    }, []);

    return <>
        <OutlinedButton
            className="lg:text-[40px] text-2xl mt-5 mb-5 pt-0.5"
            onClick={ open }
        >
            <LabeledIconContent
                iconContent={ <path
                    d="M647.19-435.93H144.17v-88.14h503.02L417.36-753.9 480-816.2 816.2-480 480-144.17l-62.64-61.93 229.83-229.83Z"
                /> }
            >
                { t('title') }
            </LabeledIconContent>
        </OutlinedButton>
        <Modal
            open={ opened }
            title={ t('title') }
            onClose={ close }
        >
            <div className="article pb-10">
                { biography[locale] && <Markdown>
                    { biography[locale] }
                </Markdown> }
            </div>
        </Modal>
    </>;
}
