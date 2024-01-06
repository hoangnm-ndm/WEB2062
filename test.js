function getNextYear() {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  return year + 1;
}

getNextYear();
