'use client';

import Modal from '@/components/base/Modal';
import { Languages, languages } from '@/i18n/config';
import { useTranslations } from 'next-intl';
import { useLocaleContext } from '@/components/providers/LocaleProvider';
import useLocatedOpen from '@/utils/hooks/useLocatedOpen';

export default function LanguageSwitcher() {
    const { open, close, opened } = useLocatedOpen({ pathname: '/language' });
    const { setLocale, locale } = useLocaleContext();
    const t = useTranslations('LanguageSwitcher');

    const handleChangeLanguage = (language: Languages) => setLocale(language);

    return <>
        <div className="cursor-pointer lg:p-2 p-1" onClick={ open }>
            <svg
                className="sm:w-8 sm:h-8 w-[29px] h-[29px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
            >
                <path
                    d="M480-65.87q-86.83 0-162.37-32.35-75.54-32.34-131.52-88.61-55.98-56.26-88.11-132.3Q65.87-395.17 65.87-482T98-644.15q32.13-75.33 88.11-131.02 55.98-55.7 131.52-87.61Q393.17-894.7 480-894.7t162.37 31.92q75.54 31.91 131.52 87.61 55.98 55.69 88.39 131.02Q894.7-568.83 894.7-482q0 86.83-32.42 162.87-32.41 76.04-88.39 132.3-55.98 56.27-131.52 88.61Q566.83-65.87 480-65.87Zm-.57-76.65q33.31-35.44 56.53-81.37 23.21-45.94 38.78-109.94H386.26q13.44 60 36.65 107.44 23.22 47.43 56.52 83.87Zm-83.3-12q-25.56-36.87-42.72-80.87-17.15-44-29.15-98.44H176.52q36.87 70.44 86.31 110.37 49.43 39.94 133.3 68.94Zm167.61-1q70.87-22.44 127.8-68.15 56.94-45.72 91.37-110.16H636.74q-13 53.44-30.22 97.44t-42.78 80.87ZM157.09-392.13h156.17q-3-27-3.5-48.22t-.5-41.65q0-25 1-43.93 1-18.94 4-42.94H157.09q-7 24-9.5 42.44-2.5 18.43-2.5 44.43 0 25.43 2.5 45.65t9.5 44.22Zm218.17 0h210.48q3.43-31 4.15-50.22.72-19.22.72-39.65 0-20-.72-37.93-.72-17.94-4.15-48.94H375.26q-4 31-5 48.94-1 17.93-1 37.93 0 20.43 1 39.65t5 50.22Zm270.48 0h156.61q6.43-24 9.21-44.22 2.79-20.22 2.79-45.65 0-26-2.79-44.43-2.78-18.44-9.21-42.44H646.74q1.87 35.57 2.87 53.22t1 33.65q0 21.43-1.5 40.65t-3.37 49.22Zm-10-235.61h147.17q-32.43-67.87-89.37-113.59-56.93-45.71-130.8-64.15 25.56 36.44 42.78 79.15 17.22 42.72 30.22 98.59Zm-249.48 0h189.48q-10.44-51.87-36.44-101.37-26-49.5-59.87-86.37-30.3 26.44-52.02 69.87-21.71 43.44-41.15 117.87Zm-209.74 0h148.74q11-52.87 27.15-95.09 16.16-42.21 42.72-81.65-74.43 18.44-129.59 62.87-55.15 44.44-89.02 113.87Z"
                />
            </svg>
        </div>
        <Modal
            open={ opened }
            title={ t('title') }
            onClose={ close }
        >
            <div className="flex flex-col gap-3">
                { Object.entries(languages).map(([langCode, langName]) => <div
                    key={ langCode }
                    className="flex items-center gap-x-2 cursor-pointer text-3xl"
                    onClick={
                        () => handleChangeLanguage(langCode as Languages)
                    }
                >
                    <div>{ langName }</div>
                    { locale === langCode && <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                    >
                        <path
                            d="M382-221.91 135.91-468l75.66-75.65L382-373.22l366.43-366.43L824.09-664 382-221.91Z"
                        />
                    </svg> }
                </div>) }
            </div>
        </Modal>
    </>;
}
