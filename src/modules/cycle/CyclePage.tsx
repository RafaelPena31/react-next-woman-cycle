import {
  DateCalendar,
  DatePicker,
  DayCalendarSkeleton,
} from "@mui/x-date-pickers";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { CustomDate } from "./components/CustomDate/CustomDate";
import { CycleRange } from "./CycleTypes";
import styles from "./CyclePage.module.scss";
import { cloneDeep } from "lodash";
import { calcCycle, calcPreviousCycle } from "./CyclePageDomain";

export function CyclePage() {
  const [selectedDates, setSelectedDates] = useState<CycleRange[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<CycleRange[]>([]);
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(null);

  const onChangeDatePicker = (date: Dayjs | null) => {
    if (date) {
      setDatePickerValue(date);

      var newSelectedDates = cloneDeep(selectedDates);
      var newHighlightedDates = cloneDeep(highlightedDates);

      const { fertile: currFertile, menstruation: currMenstruation } =
        calcCycle(28, 5, date);

      newHighlightedDates.push(currFertile);
      newSelectedDates.push(currMenstruation);

      while (date.startOf("month").isBefore(newSelectedDates[0].start)) {
        const { fertile, menstruation } = calcPreviousCycle(
          28,
          5,
          newSelectedDates[0].start
        );

        newHighlightedDates = [fertile, ...cloneDeep(newHighlightedDates)];
        newSelectedDates = [menstruation, ...cloneDeep(newSelectedDates)];
      }

      setHighlightedDates(newHighlightedDates);
      setSelectedDates(newSelectedDates);
    }
  };

  const onChangeDateCalendarPicker = (date: Dayjs) => {
    var newHighlightedDates = cloneDeep(highlightedDates);
    var newSelectedDates = cloneDeep(selectedDates);

    const previousCycleValidation = date.isBefore(newSelectedDates[0].start);
    const nextCycleValidation = date
      .add(1, "month")
      .isAfter(newSelectedDates[newSelectedDates.length - 1].end);

    if (previousCycleValidation) {
      while (date.isBefore(newSelectedDates[0].start)) {
        const { fertile, menstruation } = calcPreviousCycle(
          28,
          5,
          newSelectedDates[0].start
        );

        newHighlightedDates = [fertile, ...cloneDeep(newHighlightedDates)];
        newSelectedDates = [menstruation, ...cloneDeep(newSelectedDates)];
      }
    } else if (nextCycleValidation) {
      while (
        date
          .add(1, "month")
          .isAfter(newSelectedDates[newSelectedDates.length - 1].end)
      ) {
        const { fertile, menstruation } = calcCycle(
          28,
          5,
          newSelectedDates[newSelectedDates.length - 1].end
        );

        newHighlightedDates.push(fertile);
        newSelectedDates.push(menstruation);
      }
    }

    setSelectedDates(newSelectedDates);
    setHighlightedDates(newHighlightedDates);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Calendário de Ciclo</h1>
        <p>Conheça o seu ciclo de ponta-a-ponta:</p>
      </header>

      <section>
        <h3>Legenda:</h3>

        <p className={styles.selectedItem}>Dias do período menstrual</p>
        <p className={styles.fertileItem}>Dias do período de fertilidade</p>
      </section>

      <div>
        {!datePickerValue && (
          <DatePicker
            className={styles.formInput}
            label="selecione o último dia (ciclo anterior)"
            value={datePickerValue}
            onChange={onChangeDatePicker}
          />
        )}
      </div>

      {!!selectedDates.length && (
        <DateCalendar
          timezone="system"
          showDaysOutsideCurrentMonth
          fixedWeekNumber={5}
          renderLoading={() => <DayCalendarSkeleton />}
          onMonthChange={onChangeDateCalendarPicker}
          onYearChange={onChangeDateCalendarPicker}
          slots={{ day: CustomDate }}
          slotProps={{
            day: () => ({
              selectedDates,
              highlightedDates,
              disabled: false,
            }),
          }}
        />
      )}

      <footer className={styles.footer}>
        Made with <span>❤️</span> by <strong>Rafael Pena</strong>
      </footer>
    </div>
  );
}
