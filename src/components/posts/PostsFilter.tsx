import { ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslations } from 'next-intl';
import Accordion from '@/components/base/Accordion';
import OutlinedButton from '@/components/base/OutlinedButton';
import { Languages } from '@/i18n/config';
import classNames from '@/utils/classNames';
import { usePostsContext } from '@/components/providers/PostsProvider';
import useLocale from '@/utils/hooks/useLocale';

export interface SelectableButtonsFilterProps {
    title: ReactNode;
    items: {
        id: string;
        name: Record<Languages, string>;
    }[];
    selected: string[];
    onChange: (id: string) => void;
    onRemove: (id: string) => void;
}

export function SelectableButtonsFilter(props: SelectableButtonsFilterProps) {
    const { items, title, selected, onChange, onRemove } = props;
    const locale = useLocale();

    return <Accordion title={ title }>
        <div className="flex flex-wrap lg:gap-4 gap-3 mb-4">
            { items.map(item => {
                const isSelected = selected.includes(item.id);

                return <OutlinedButton
                    key={ item.id }
                    className={ classNames(
                        'uppercase lg:text-4xl text-2xl pr-3 pl-3 pt-1 pb-1',
                        isSelected
                            ? 'bg-(--main-color) text-(--bg-color) border-(--main-color)'
                            : ''
                        ,
                    ) }
                    onClick={ () => isSelected
                        ? onRemove(item.id)
                        : onChange(item.id)
                    }
                >
                    { item.name[locale] }
                </OutlinedButton>;
            }) }
        </div>
    </Accordion>;
}

type Filers = 'categories' | 'types';

const SELECTABLE_FILTERS = ['categories', 'types'] as const;

function getElementOrNull<T>(array?: T[] | null, index: number = 0): T | null {
    return (array || [])[index] || null;
}

export default function PostsFilter() {
    const { filter, ...rest } = usePostsContext();
    const locale = useLocale();
    const t = useTranslations('PostsFilter');
    const startDate = getElementOrNull(filter.options.dates);
    const endDate = getElementOrNull(filter.options.dates, 1);

    const onDatesChange = (dates: [Date | null, Date | null]) => {
        const shouldRemove = filter.options.dates[0] && dates[0] && !dates[1]
            && dates[0]?.getTime() === filter.options.dates[0]?.getTime()
            && (filter.options.dates[0]?.getTime() ===
            filter.options.dates[1]?.getTime());

        if (shouldRemove) {
            filter.set(prev => ({ ...prev, dates: [null, null] }));

            return;
        }

        filter.set(prev => ({ ...prev, dates }));
    };

    const handleSelectableFilterChange = (name: Filers) => {
        return (id: string) => filter.set(
            prev => ({ ...prev, [name]: [...(prev[name] || []), id] }),
        );
    };

    const handleSelectableFilterRemove = (name: Filers) => {
        return (id: string) => filter.set(
            prev => ({
                ...prev,
                [name]: prev[name]?.filter(item => item !== id),
            }),
        );
    };

    return <div className="flex flex-col gap-3">
        { SELECTABLE_FILTERS.map(name => <SelectableButtonsFilter
            key={ name }
            title={ t(name) }
            items={ rest[name] }
            selected={ filter.options[name] || [] }
            onChange={ handleSelectableFilterChange(name) }
            onRemove={ handleSelectableFilterRemove(name) }
        />) }
        <div className="pb-4">
            <Accordion title={ t('dates') }>
                <DatePicker
                    selected={ startDate }
                    onChange={ onDatesChange }
                    startDate={ startDate }
                    endDate={ endDate }
                    selectsRange
                    inline
                    locale={ locale }
                    showWeekNumbers
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={ 50 }
                    scrollableYearDropdown
                    popperContainer={({children}) => (
                        <div style={{ position: 'relative', zIndex: 9999 }}>
                            {children}
                        </div>
                    )}
                />
            </Accordion>
        </div>
    </div>;
}
