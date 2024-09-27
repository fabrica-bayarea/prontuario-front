import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import styles from "./calendar.module.css";

const Teguetegozoios = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [hasSelectedDates, setHasSelectedDates] = useState(false);

  const [date, setDate] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;

    if (selection) {
      setDate([selection]);
      setHasSelectedDates(true);
      setOpenDate(false);
    }
  };

  const handleClick = () => {
    setOpenDate(prev => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <span onClick={handleClick} className={styles.calender}>
        {hasSelectedDates && date[0].startDate && date[0].endDate
          ? `${format(date[0].startDate, "dd/MMM/yyyy", {
              locale: ptBR,
            })} até ${format(date[0].endDate, "dd/MMM/yyyy", { locale: ptBR })}`
          : "Período do evento"}
      </span>
      {openDate && (
        <DateRange
          editableDateInputs={true}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={new Date()}
        />
      )}
    </div>
  );
};

export default Teguetegozoios;
