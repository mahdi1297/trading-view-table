import { fetchDataAction } from "../slices/actions";
import { AppDispatch } from "../store";

type HandlerFilterEvent = {
  filterEvents: any;
  filterName: string;
  amoung: string;
  dispatch: AppDispatch;
  value: string | number;
};

export function handlerFilterEvent({
  filterEvents,
  filterName,
  amoung,
  dispatch,
  value,
}: HandlerFilterEvent) {
  // if (value === "Value" || value === "") {
  //   dispatch(fetchDataAction());
  // }
  if (typeof value === "number") {
    filterEvents[filterName](amoung || "Below", value);
  }
}
