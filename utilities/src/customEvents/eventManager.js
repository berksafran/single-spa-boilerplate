/* eslint-disable no-console */

// Creates custom event on body element
export const createCustomEvent = (eventName, initialData) => {
  const customEvent = new CustomEvent(eventName, {
    detail: { ...initialData },
  });
  window.dispatchEvent(customEvent);
};

// Listen to created custom event
// func example: (event) => {console.log(event.detail.name)}
export const listenCustomEvent = (eventName, func) => {
  window.addEventListener(eventName, func);
};

export const sendMessage = (to, message) => {
  createCustomEvent("appMessage", { to, message });
};

export const listenMessage = (func) => {
  listenCustomEvent("appMessage", func);
};

export const stopListenMessage = () => {
  window.removeEventListener("appMessage");
};

export const logAuth = (text) => {
  console.log(text);
};
