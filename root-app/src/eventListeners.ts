export interface EventObject {
  name: string;
  func: (e: CustomEvent) => void;
}

export type EventsArray = Array<EventObject>;

export const listenEvents = () => {
  events.forEach((e: EventObject) => window.addEventListener(e.name, e.func));
};

const events: EventsArray = [
  {
    name: "single-spa:before-routing-event",
    func: (e) => {
      console.log("single-spa:before-routing-event :>> ", e.detail);
    },
  },
];
