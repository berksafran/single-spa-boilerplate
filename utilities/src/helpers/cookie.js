export function setCookie(
  name,
  value,
  { days = 365, domain = null, path = "/" }
) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
    if (domain) {
      domain = `domain=${domain};path=${path}`;
    } else {
      domain = `path=${path}`;
    }
  }
  document.cookie = name + "=" + (value || "") + expires + "; " + domain;
}

export function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
