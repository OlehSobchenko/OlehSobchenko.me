import { ReactNode, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import { useLocale } from 'use-intl';
import Accordion from '@/components/base/Accordion';
import types from '@/data/types.json';
import categories from '@/data/categories.json';
import OutlinedButton from '@/components/base/OutlinedButton';
import { Languages } from '@/i18n/config';
import classNames from '@/utils/classNames';
import { useTranslations } from 'next-intl';

registerLocale('uk', uk);

export interface SelectableButtonsFilterProps {
    title: ReactNode;
    items: {
        id: string;
        name: Record<Languages, string>;
    }[];
}

export function SelectableButtonsFilter(props: SelectableButtonsFilterProps) {
    const { items, title } = props;
    const locale = useLocale() as Languages;
    const [selected, setSelected] = useState<string[]>([]);

    const handleClick = (id: string) => () => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(item => item !== id));

            return;
        }

        setSelected(prev => [...prev, id]);
    };

    return <Accordion title={ title }>
        <div className="flex flex-wrap gap-4 mb-4">
            { items.map(item => <OutlinedButton
                key={ item.id }
                className={ classNames(
                    'uppercase lg:text-4xl text-2xl pr-3 pl-3 pt-1 pb-1',
                    selected.includes(item.id)
                        ? 'bg-(--main-color) text-(--bg-color) border-(--main-color)'
                        : ''
                    ,
                ) }
                onClick={ handleClick(item.id) }
            >
                { item.name[locale] }
            </OutlinedButton>) }
        </div>
    </Accordion>;
}

export default function PostsFilterContainer() {
    const locale = useLocale() as Languages;
    const t = useTranslations('PostsFilterContainer');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);
    };

    return <div className="flex flex-col gap-4">
        <SelectableButtonsFilter
            title={ t('categories') }
            items={ categories }
        />
        <SelectableButtonsFilter
            title={ t('types') }
            items={ types }
        />
        <Accordion title={ t('dates') }>
            <DatePicker
                selected={ startDate }
                onChange={ onChange }
                startDate={ startDate }
                endDate={ endDate }
                selectsRange
                inline
                locale={ locale }
                showWeekNumbers
                // showYearDropdown
                // showMonthDropdown
                // yearDropdownItemNumber={ 100 }
                // scrollableYearDropdown
            />
        </Accordion>
    </div>;
}
