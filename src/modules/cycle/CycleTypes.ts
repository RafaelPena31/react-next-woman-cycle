import { Dayjs } from "dayjs";

export interface CycleRange {
  start: Dayjs;
  end: Dayjs;
}

export interface WomanCycle {
  fertile: CycleRange;
  menstruation: CycleRange;
}
