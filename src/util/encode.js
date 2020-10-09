'use strict';
export function encode (object) {
  return window.encodeURIComponent(window.btoa(JSON.stringify(object)));
}

export function decode (string) {
  try {
    const decoded = JSON.parse(window.atob(window.decodeURIComponent(string)));
    return decoded;
  } catch (e) {
    console.error(e);
    return false;
  }
}
