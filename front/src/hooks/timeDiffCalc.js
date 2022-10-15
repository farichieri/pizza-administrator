export const timeDiffCalc = (dateFuture, dateNow) => {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  const seconds = Math.floor(diffInMilliSeconds) % 60;
  diffInMilliSeconds -= seconds * 60;

  let difference = '';
  if (days > 0) {
    difference += days === 1 ? `${days} d, ` : `${days} d, `;
  }

  if (hours > 0) {
    difference +=
      hours === 0 || (hours > 0 && hours < 10) ? `0${hours}:` : `${hours}:`;
  } else if (hours === 0) {
    difference += '00:';
  }

  if (minutes >= 0 && minutes < 10) {
    difference += '0' + minutes + ':';
  } else if (minutes > 0) {
    difference += minutes === 0 || hours === 1 ? `${minutes}:` : `${minutes}:`;
  } else if (minutes === 0) {
    difference += '00:';
  }

  if (seconds >= 0 && seconds < 10) {
    difference += '0' + seconds;
  } else {
    difference += seconds === 0 || seconds === 1 ? `0${seconds}` : `${seconds}`;
  }

  return difference;
};
