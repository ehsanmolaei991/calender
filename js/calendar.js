// Define Date for each locale
var currentDate = moment().locale("en");
var jalaliDate = moment().locale("fa");
var hijriDate = moment().locale("ar");

// Console.log full Data details for each locale
console.log("en : ", currentDate);
console.log("fa : ", jalaliDate);
console.log("ar : ", hijriDate);
// define Func
const whichMonthJalali = (date) => {
  switch (date) {
    case 0:
      return "فرودین";
    case 1:
      return "اردیبهشت";
    case 2:
      return "خرداد";
    case 3:
      return "تیر";
    case 4:
      return "مرداد";
    case 5:
      return "شهریور";
    case 6:
      return "مهر";
    case 7:
      return "آبان";
    case 8:
      return "آذر";
    case 9:
      return "دی";
    case 10:
      return "بهمن";
    case 11:
      return "اسفند";
  }
};
const whichMonthHijri = (date) => {
  switch (date) {
    case 0:
      return "محرم";
    case 1:
      return "صفر";
    case 2:
      return "ربیع‌ الاول";
    case 3:
      return "ربیع‌ الثانی";
    case 4:
      return "جمادی‌ الاول";
    case 5:
      return "جمادی‌ الثانی";
    case 6:
      return "رجب";
    case 7:
      return "شعبان";
    case 8:
      return "رمضان";
    case 9:
      return "شوال";
    case 10:
      return "ذیقعده";
    case 11:
      return "ذیحجه";
  }
};
const renderCalender = (locale) => {
  switch (locale) {
    case "fa":
      return renderJalaliCalender();
    case "ar":
      return renderHijriCalender();
    case "en":
      return renderGregorianCalender();
  }
};
const setMonth = (locale) => {
  switch (locale) {
    case "fa":
      return whichMonthJalali(jalaliDate.jMonth());
    case "ar":
      return whichMonthHijri(hijriDate.iMonth());
    case "en":
      return currentDate.format("MMMM");
  }
};
const setYear = (locale) => {
  switch (locale) {
    case "fa":
      $("#YearDetails").addClass("ISansBold");
      return jalaliDate.format("jYYYY");
    case "ar":
      $("#YearDetails").addClass("ISansBold");
      return hijriDate.format("iYYYY");
    case "en":
      $("#YearDetails").addClass("Arial");
      return currentDate.format("YYYY");
  }
};

const setAllDateForHeaderCalender = (locale) => {
  $(".SubCalDate").each((index, item) => {
    switch (locale) {
      case "fa":
        index == 0 &&
          $(item).html(
            moment()
              .locale("ar")
              .format(
                `iYYYY / ${whichMonthHijri(
                  moment().locale("ar").iMonth()
                )} / iD`
              )
          );
        index == 1 &&
          $(item)
            .attr("dir", "ltr")
            .html(moment().locale("en").format("YYYY / MMMM / D"));
        break;
      case "ar":
        index == 0 &&
          $(item).html(
            moment()
              .locale("fa")
              .format(
                `jYYYY / ${whichMonthJalali(
                  moment().locale("fa").jMonth()
                )} / jD`
              )
          );
        index == 1 &&
          $(item)
            .attr("dir", "ltr")
            .html(moment().locale("en").format("YYYY / MMMM / D"));
        break;
      case "en":
        index == 0 &&
          $(item).html(
            moment()
              .locale("ar")
              .format(
                `iD / ${whichMonthHijri(
                  moment().locale("ar").iMonth()
                )} / iYYYY`
              )
          );
        index == 1 &&
          $(item).html(
            moment()
              .locale("fa")
              .format(
                `${whichMonthJalali(
                  moment().locale("fa").jMonth()
                )} / jD / jYYYY`
              )
          );
        break;
    }
  });
};
const renderWeeksDay = (arrayOfWeekDaysName) => {
  $("#weekDays").empty();
  arrayOfWeekDaysName.map((item, index) => {
    $("#weekDays").append(`<div class="ISansBold">${item}</div>`);
  });
};

const setValueOfWeek = (locale, option) => {
  // option have two value 'short' or 'long'
  let WeeksDays = [];
  let temp = [];
  switch (locale) {
    case "fa":
      WeeksDays = [];
      temp =
        option === "short"
          ? jalaliDate._locale._weekdaysMin
          : jalaliDate._locale._weekdays;
      temp.map((item, index) => {
        if (index == 0) {
          WeeksDays.push(null);
        } else if (index == 6) {
          WeeksDays[0] = option === "short" ? "ش" : "شنبه";
        }
        WeeksDays.push(item);
        if (index == 6) {
          WeeksDays.pop();
        }
      });
      console.log(WeeksDays);
      return renderWeeksDay(WeeksDays);
    case "ar":
      WeeksDays = [];
      temp =
        option === "short"
          ? hijriDate._locale._weekdaysMin
          : hijriDate._locale._weekdays;
      temp.map((item, index) => {
        if (index == 0) {
          WeeksDays.push(null);
        } else if (index == 6) {
          WeeksDays[0] = option === "short" ? "س" : "السبت";
        }
        WeeksDays.push(item);
        if (index == 6) {
          WeeksDays.pop();
        }
      });
      // console.log(WeeksDays);
      return renderWeeksDay(WeeksDays);
    case "en":
      WeeksDays = [];
      temp =
        option === "short"
          ? currentDate._locale._weekdaysMin
          : currentDate._locale._weekdays;
      WeeksDays = temp;
      console.log(WeeksDays);
      return renderWeeksDay(WeeksDays);
  }
};

const whenMonthStartTheWeekJalali = (day) => {
  switch (day) {
    case "شنبه":
      return 0;
    case "یک‌شنبه":
      return 1;
    case "دوشنبه":
      return 2;
    case "سه‌شنبه":
      return 3;
    case "چهارشنبه":
      return 4;
    case "پنج‌شنبه":
      return 5;
    case "جمعه":
      return 6;
  }
};
// const whenMonthStartTheWeekHijri = (day) => {
//   switch (day) {
//     case "السبت":
//       return 0;
//     case "الأحد":
//       return 1;
//     case "الإثنين":
//       return 2;
//     case "الثلاثاء":
//       return 3;
//     case "الأربعاء":
//       return 4;
//     case "الخميس":
//       return 5;
//     case "الجمعة":
//       return 6;
//   }
// };
const whenMonthStartTheWeekHijri = (day) => {
  switch (day) {
    case "السبت":
      return 0 + diffHijri == -3
        ? 4
        : 0 + diffHijri == -2
        ? 5
        : 0 + diffHijri == -1
        ? 6
        : 0 + diffHijri;
    case "الأحد":
      return 1 + diffHijri == 0
        ? "0"
        : 1 + diffHijri == -1
        ? "6"
        : 1 + diffHijri == -2
        ? "5"
        : 1 + diffHijri;
    case "الإثنين":
      return 2 + diffHijri == -1
        ? "6"
        : 2 + diffHijri == 0
        ? "0"
        : 2 + diffHijri == 1
        ? "1"
        : 2 + diffHijri;
    case "الثلاثاء":
      return 3 + diffHijri;
    case "الأربعاء":
      return 4 + diffHijri == 7
        ? "0"
        : 4 + diffHijri == 6
        ? "6"
        : 4 + diffHijri == 5
        ? "5"
        : 4 + diffHijri;
    case "الخميس":
      return 5 + diffHijri == 8
        ? "1"
        : 5 + diffHijri == 7
        ? 0
        : 5 + diffHijri == 6
        ? "6"
        : 5 + diffHijri;
    case "الجمعة":
      return 6 + diffHijri == 9
        ? "2"
        : 6 + diffHijri == 8
        ? "1"
        : 6 + diffHijri == 7
        ? "0"
        : 6 + diffHijri;
  }
};
const whenMonthStartTheWeekGregorian = (day) => {
  switch (day) {
    case "Sunday":
      return 0;
    case "Monday":
      return 1;
    case "Tuesday":
      return 2;
    case "Wednesday":
      return 3;
    case "Thursday":
      return 4;
    case "Friday":
      return 5;
    case "Saturday":
      return 6;
  }
};
const renderJalaliCalender = () => {
  $(`#Main`).empty();
  var temp = jalaliDate;
  let dataOfDate = jalaliDate;
  temp.startOf("jMonth");
  dataOfDate.startOf("jMonth");
  // console.log(moment.jDaysInMonth(temp.jYear(),temp.jMonth()))
  // console.log(temp.format('dddd'))
  // console.log(whenMonthStartTheWeekJalali(temp.format('dddd')))
  if (
    (moment.jDaysInMonth(temp.jYear(), temp.jMonth()) == 31 &&
      whenMonthStartTheWeekJalali(temp.format("dddd")) <= 4) ||
    (moment.jDaysInMonth(temp.jYear(), temp.jMonth()) <= 30 &&
      whenMonthStartTheWeekJalali(temp.format("dddd")) <= 5)
  ) {
    for (let j = 0; j < 35; j++) {
      $(`#Main`).append(
        `<div class="colOfCalender ISansBold animated zoomIn JalaliDate" id='${j}'>${j}</div>`
      );
    }
  } else {
    for (let j = 0; j < 42; j++) {
      $(`#Main`).append(
        `<div class="colOfCalender ISansBold animated zoomIn JalaliDate" id='${j}'>${j}</div>`
      );
    }
  }
  var counter = 1;
  $(".colOfCalender").each((index, item) => {
    if (
      parseInt($(item).attr("id")) >=
        whenMonthStartTheWeekJalali(temp.format("dddd")) &&
      parseInt($(item).attr("id")) <=
        moment.jDaysInMonth(temp.jYear(), temp.jMonth()) +
          whenMonthStartTheWeekJalali(temp.format("dddd")) -
          1
    ) {
      $(item).attr(
        "data-target",
        `${dataOfDate.format(`jYYYY/jM/${counter}`)}`
      );
      $(item).html(counter++);
      if (
        $(item).attr("data-target") ==
        moment().locale("fa").format("jYYYY/jM/jD")
      ) {
        $(item).addClass("Today");
      }
      // console.log(moment(`${$(item).attr('data-target')}`,'jYYYY/jM/jD'))
      // console.log(dataOfDate.format(`${$(item).attr('data-target')} [is] iYYYY/iM/iD`))
      $(item).append(
        `<span id='Gregorian'>${persianJs(
          dataOfDate.format("D")
        ).toEnglishNumber()}</span>`
      );
      $(item).append(`<span id='Hijri'>${dataOfDate.format("iD")}</span>`);
      dataOfDate.add(1, "day");
    } else {
      $(item).html("");
    }
  });
};
const renderHijriCalender = () => {
  $(`#Main`).empty();
  var temp = hijriDate;
  var dataOfDate = moment().locale("ar");
  temp.startOf("iMonth");
  dataOfDate.startOf("iMonth");
  // console.log(moment.iDaysInMonth(temp.iYear(), temp.iMonth()));
  // console.log(temp.format('dddd'))
  // console.log(whenMonthStartTheWeekHijri(temp.format("dddd")));
  if (
    (moment.iDaysInMonth(temp.iYear(), temp.iMonth()) == 31 &&
      whenMonthStartTheWeekHijri(temp.format("dddd")) <= 4) ||
    (moment.iDaysInMonth(temp.iYear(), temp.iMonth()) <= 30 &&
      whenMonthStartTheWeekHijri(temp.format("dddd")) <= 5)
  ) {
    for (let j = 0; j < 35; j++) {
      $(`#Main`).append(
        `<div class="colOfCalender ISansBold animated zoomIn HijriDate" id='${j}'>${j}</div>`
      );
    }
  } else {
    for (let j = 0; j < 42; j++) {
      $(`#Main`).append(
        `<div class="colOfCalender ISansBold animated zoomIn HijriDate" id='${j}'>${j}</div>`
      );
    }
  }
  var counter = 1;
  $(".colOfCalender").each((index, item) => {
    if (
      parseInt($(item).attr("id")) >=
        whenMonthStartTheWeekHijri(temp.format("dddd")) &&
      parseInt($(item).attr("id")) <=
        moment.iDaysInMonth(temp.iYear(), temp.iMonth()) +
          whenMonthStartTheWeekHijri(temp.format("dddd")) -
          1
    ) {
      let tempNum = counter++;
      $(item).html(persianJs(tempNum).englishNumber()._str);
      $(item).attr("data-target", `${dataOfDate.format("iYYYY/iM/iD")}`);
      if ($(item).attr("data-target") == moment().locale("ar").add(-diffHijri, "day").format("iYYYY/iM/iD")) {
        $(item).addClass("Today");
      }
      // console.log(dataOfDate.format(`${$(item).attr('data-target')} [is] YYYY/M/D`))
      // console.log(dataOfDate.format(`${$(item).attr('data-target')} [is] jYYYY/jM/jD`))
      $(item).append(
        `<span id='Gregorian'>${persianJs(
          dataOfDate.format("D")
        ).toEnglishNumber()}</span>`
      );
      $(item).append(`<span id='Jalali'>${dataOfDate.format("jD")}</span>`);
      dataOfDate.add(1, "day");
    } else {
      $(item).html("");
    }
  });
};
const renderGregorianCalender = () => {
  $(`#Main`).empty();
  var temp = currentDate;
  var dataOfDate = currentDate;
  temp.startOf("Month");
  dataOfDate.startOf("Month");
  // console.log(moment.jDaysInMonth(temp.year(),temp.month()))
  // console.log(temp.format('dddd'))
  // console.log(whenMonthStartTheWeekGregorian(temp.format('dddd')))
  if (
    (moment.jDaysInMonth(temp.year(), temp.month()) == 31 &&
      whenMonthStartTheWeekGregorian(temp.format("dddd")) <= 4) ||
    (moment.jDaysInMonth(temp.year(), temp.month()) <= 30 &&
      whenMonthStartTheWeekGregorian(temp.format("dddd")) <= 5)
  ) {
    for (let j = 0; j < 35; j++) {
      $(`#Main`).append(
        `<div class="colOfCalender ISansBold animated zoomIn GregorianDate" id='${j}'>${j}</div>`
      );
    }
  } else {
    for (let j = 0; j < 42; j++) {
      $(`#Main`).append(
        `<div class="colOfCalender ISansBold animated zoomIn GregorianDate" id='${j}'>${j}</div>`
      );
    }
  }
  var counter = 1;
  $(".colOfCalender").each((index, item) => {
    if (
      parseInt($(item).attr("id")) >=
        whenMonthStartTheWeekGregorian(temp.format("dddd")) &&
      parseInt($(item).attr("id")) <=
        moment.jDaysInMonth(temp.year(), temp.month()) +
          whenMonthStartTheWeekGregorian(temp.format("dddd")) -
          1
    ) {
      $(item).attr("data-target", `${dataOfDate.format(`YYYY/M/${counter}`)}`);
      $(item).html(counter++);
      // console.log(moment().locale('en')('YYYY/M/D'))
      if (
        $(item).attr("data-target") == moment().locale("en").format("YYYY/M/D")
      ) {
        $(item).addClass("Today");
      }
      // console.log(dataOfDate.format(`${$(item).attr('data-target')} [is] iYYYY/iM/iD`))
      // console.log(dataOfDate.format(`${$(item).attr('data-target')} [is] jYYYY/jM/jD`))
      $(item).append(
        `<span id='Hijri'>${persianJs(
          dataOfDate.format("iD")
        ).englishNumber()}</span>`
      );
      $(item).append(`<span id='Jalali'>${dataOfDate.format("jD")}</span>`);
      dataOfDate.add(1, "day");
    } else {
      $(item).html("");
    }
  });
};
const changeLanguageOfCalender = (locale) => {
  $("#MonthDetails").html(setMonth(locale));
  $("#YearDetails").html(setYear(locale));
  switch (locale) {
    case "fa":
      $("#NextMonth").html("ماه بعد");
      $("#PrevMonth").html("ماه قبل");
      $("#goToday").html("برو امروز");
      break;
    case "ar":
      $("#NextMonth").html("الشهر القادم");
      $("#PrevMonth").html("الشهر السابق");
      $("#goToday").html("اذهب إلى اليوم");
      break;
    case "en":
      $("#NextMonth").html("Next Month");
      $("#PrevMonth").html("Prev Month");
      $("#goToday").html("Go Today");
      break;
  }
};

const NextMonth = (locale) => {
  switch (locale) {
    case "fa":
      jalaliDate.add(1, "jMonth");
      break;
    case "ar":
      hijriDate.add(1, "iMonth");
      break;
    case "en":
      currentDate.add(1, "Month");
      break;
  }
  changeLanguageOfCalender(locale);
  renderCalender(locale);
};

const PrevMonth = (locale) => {
  switch (locale) {
    case "fa":
      jalaliDate.subtract(1, "jMonth");
      break;
    case "ar":
      hijriDate.subtract(1, "iMonth");
      break;
    case "en":
      currentDate.subtract(1, "Month");
      break;
  }
  changeLanguageOfCalender(locale);
  renderCalender(locale);
};
const goToday = (locale) => {
  switch (locale) {
    case "fa":
      jalaliDate = moment().locale("fa");
      break;
    case "ar":
      hijriDate = moment().locale("ar");
      break;
    case "en":
      currentDate = moment().locale("en");
      break;
  }
  changeLanguageOfCalender(locale);
  renderCalender(locale);
};
// When Start Document
$(document).ready(() => {
  // First Start
  changeLanguageOfCalender(locale);
  setValueOfWeek(locale, optionForWeekDaysName);
  renderCalender(locale);
  setAllDateForHeaderCalender(locale);

  // Change Locale
  $(".ChangeLocale").each((index, item) => {
    $(item).click(() => {
      locale = $(item).html();
      changeLanguageOfCalender(locale);
      setValueOfWeek(locale, optionForWeekDaysName);
      renderCalender(locale);
      goToday(locale);
    });
  });

  // Clicks
  $("#NextMonth").click(() => {
    NextMonth(locale);
  });
  $("#PrevMonth").click(() => {
    PrevMonth(locale);
  });
  $("#goToday").click(() => {
    goToday(locale);
  });
});
