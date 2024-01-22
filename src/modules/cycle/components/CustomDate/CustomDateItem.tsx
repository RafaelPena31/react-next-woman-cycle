import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

dayjs.extend(isBetweenPlugin);

export interface CustomDateItemProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export const CustomDateItem = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" && prop !== "isFirst" && prop !== "isLast",
})<CustomDateItemProps>(
  ({ theme, isSelected, isFirst, isLast, outsideCurrentMonth }) => ({
    borderRadius: 0,
    ...(outsideCurrentMonth && {
      color: "#e7cfe6",
    }),
    ...(isSelected && {
      color: outsideCurrentMonth
        ? "#e7cfe6"
        : theme.palette.primary.contrastText,

      backgroundColor: "#df77dc",
      "&:hover, &:focus": {
        backgroundColor: "#df77dc",
      },
    }),
    ...(isFirst && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(isLast && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  })
) as React.ComponentType<CustomDateItemProps>;
