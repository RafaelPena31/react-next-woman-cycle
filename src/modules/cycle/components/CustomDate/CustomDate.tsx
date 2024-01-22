import { PickersDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { CustomDateItem } from "./CustomDateItem";
import { Badge } from "@mui/material";
import { CycleRange } from "../../CycleTypes";

interface CustomDateProps extends PickersDayProps<Dayjs> {
  highlightedDates?: CycleRange[];
  selectedDates?: CycleRange[];
}

export function CustomDate(props: CustomDateProps) {
  const { day, highlightedDates, selectedDates, ...other } = props;

  const isFertile =
    !!highlightedDates &&
    !!highlightedDates.find((date) =>
      day.isBetween(date.start, date.end, null, "[]")
    );

  const isSelectedDate =
    !!selectedDates &&
    !!selectedDates.find((date) =>
      day.isBetween(date.start, date.end, null, "[]")
    );

  const isFirstDate =
    !!selectedDates && !!selectedDates.find((date) => day.isSame(date.start));
  const isLastDate =
    !!selectedDates && !!selectedDates.find((date) => day.isSame(date.end));

  return (
    <Badge
      overlap="circular"
      style={{ marginTop: "12px" }}
      badgeContent={isFertile ? "❤️" : undefined}
    >
      <CustomDateItem
        {...other}
        day={day}
        sx={{ px: 2.5 }}
        disableMargin
        disableHighlightToday
        selected={false}
        isSelected={isSelectedDate}
        isFirst={isFirstDate}
        isLast={isLastDate}
      />
    </Badge>
  );
}
