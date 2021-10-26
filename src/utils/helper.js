const isEmpty = (obj) => {
  const objType = Object.prototype.toString.call(obj);

  if (objType === "[object Array]") return obj.length === 0;
  else if (objType === "[object Object]") return Object.keys(obj).length === 0;
  else if (objType === "[object String]") return objType.length === 0;
  else if (objType === "[object Number]") return objType === 0;
  else if (objType === "undefined") return objType === 0;
  else return true;
};

const isNull = (obj) => {
  //eslint-disable-next-line eqeqeq
  return obj == undefined;
};

const formatTaskDate = (date) => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = new Date(tomorrow);

  const dbDate = new Date(date);
  const inTime = dbDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (today.toLocaleDateString() === dbDate.toLocaleDateString())
    return `Today, ${inTime}`;
  else if (tomorrow.toLocaleDateString() === dbDate.toLocaleDateString())
    return `Tomorrow, ${inTime}`;
  else {
    return `${dbDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    })}, ${inTime}`;
  }
};

const getMillsUntilTime = (dateObj) => {
  const now = new Date();

  return (
    new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      dateObj.getHours(),
      dateObj.getMinutes(),
      0,
      0
    ) - now
  );
};

const compareDateTimetoCurrent = (dateObj) => {
  return (
    dateObj.toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }) >
    new Date().toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

const convertLat = (coor) => {
  return `${parseFloat(coor).toFixed(4)}° ${coor < 0 ? "S" : "N"}`;
};

const convertLong = (coor) => {
  return `${parseFloat(coor).toFixed(4)}° ${coor < 0 ? "W" : "E"}`;
};

export default {
  isEmpty,
  isNull,
  formatTaskDate,
  getMillsUntilTime,
  compareDateTimetoCurrent,
  convertLat,
  convertLong,
};
