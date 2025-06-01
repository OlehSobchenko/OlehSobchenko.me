import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import { useLocale } from 'use-intl';

registerLocale('uk', uk);

export default function PostsFilterContainer() {
    const locale = useLocale();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);
    };

    return <div className="lg:pb-16 pb-8">
        <DatePicker
            selected={ startDate }
            onChange={ onChange }
            startDate={ startDate }
            endDate={ endDate }
            selectsRange
            inline
            locale={ locale }
            className="rounded-none"
            showWeekNumbers
            // showYearDropdown
            // showMonthDropdown
            // yearDropdownItemNumber={ 100 }
            // scrollableYearDropdown
        />
    </div>;
}
