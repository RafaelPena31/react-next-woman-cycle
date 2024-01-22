import { Dayjs } from "dayjs";
import { WomanCycle } from "./CycleTypes";

export const calcCycle = (
  cycleRange: number,
  menstruationRange: number,
  lastCycleDate: Dayjs
): WomanCycle => {
  const menstruationRangeSubtract = menstruationRange - 1;
  const nextCycle = lastCycleDate.add(cycleRange, "day");

  const startCycle = nextCycle.subtract(menstruationRangeSubtract, "day");
  const endCycle = nextCycle;

  const endFertile = endCycle.add(5, "day");
  const startFertile = endFertile.add(6, "day");

  return {
    menstruation: { start: startCycle, end: endCycle },
    fertile: { start: startFertile, end: endFertile },
  };
};

export const calcPreviousCycle = (
  cycleRange: number,
  menstruationRange: number,
  firstCycleDate: Dayjs
): WomanCycle => {
  const menstruationRangeSubtract = menstruationRange - 1;
  const previousCycle = firstCycleDate.subtract(cycleRange, "day");

  const startCycle = previousCycle;
  const endCycle = previousCycle.add(menstruationRangeSubtract, "day");

  const startFertile = endCycle.add(5, "day");
  const endFertile = startFertile.add(6, "day");

  return {
    menstruation: { start: startCycle, end: endCycle },
    fertile: { start: startFertile, end: endFertile },
  };
};
