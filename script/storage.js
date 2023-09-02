"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

function saveBreedsToLocalStorage(breedsData) {
  saveToStorage("breeds", breedsData);
}

function getBreedsFromLocalStorage() {
  return getFromStorage("breeds", []);
}
