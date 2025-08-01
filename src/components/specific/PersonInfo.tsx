'use client';

import { useTranslations } from 'next-intl';
import PersonName from '@/components/specific/PersonName';
import Biography from '@/components/specific/Biography';

export default function PersonInfo() {
    const t = useTranslations('PersonInfo');

    return <div className="items-start pl-0">
        <div className="max-w-min">
            <div className="flex items-baseline justify-between">
                <PersonName>{ t('firstName') }</PersonName>
                <div className="person-dates">
                    1973 – 2023
                </div>
            </div>
            <PersonName>{ t('lastName') }</PersonName>
        </div>
        <Biography/>
        <div className="person-quote mt-20 mb-32 lg:flex hidden">
            <svg
                className="mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="150 -960 960 960"
                width="36px"
            >
                <path d="m225.96-227 98.52-168.78q-5 1-11 1.5t-11 .5q-67.13-3.39-112.72-51.81Q144.17-494 144.17-560q0-70.15 49.17-119.03 49.16-48.88 119.31-48.88 69.39 0 118.37 48.88Q480-630.15 480-560q0 21.21-5.36 41.57T459.13-480L313.78-227h-87.82Zm375.82 0 97.96-168.78q-5 1-11 1.5t-11 .5q-67.13-3.39-112.44-51.81Q520-494 520-560q0-70.15 48.88-119.03 48.88-48.88 119.03-48.88 69.39 0 118.66 48.88 49.26 48.88 49.26 119.03 0 21.21-5.36 41.57T834.96-480L689.04-227h-87.26ZM312.13-485.09q31.26 0 53.07-21.75 21.8-21.75 21.8-52.82 0-31.08-21.62-53.17-21.61-22.08-52.49-22.08-31.54 0-53.35 21.75-21.8 21.75-21.8 52.82 0 31.08 21.57 53.17 21.57 22.08 52.82 22.08Zm375.28 0q31.24 0 53.33-21.75t22.09-52.82q0-31.08-21.78-53.17-21.79-22.08-52.9-22.08-31.35 0-53.25 21.75T613-560.34q0 31.08 21.7 53.17 21.71 22.08 52.71 22.08Zm.5-74.91Zm-375.26 0Z"/>
            </svg>
            <div
                className="uppercase ml-1.5 text-4xl pt-1.5 pl-4 pb-1.5 whitespace-pre-line"
                style={{
                    textShadow: '0px 0px 4px var(--bg-color)',
                    borderLeft: '4px solid var(--main-color)',
                }}
            >
                { t('quote') }
            </div>
        </div>
    </div>;
}
