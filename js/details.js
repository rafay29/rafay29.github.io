function loadData() {
    $.getJSON("data/details.json", function (data) {
        var projects = data.projects;
        $('#current-project-name').text(projects[0].name);
        $('#current-project-client').text(projects[0].client);
        var age = calage();
        $('#age').text(age.yearOld);
    });
}

var dat = new Date();
var curday = dat.getDate();
var curmon = dat.getMonth() + 1;
var curyear = dat.getFullYear();
function checkleapyear(datea) {
    if (datea.getYear() % 4 == 0) {
        if (datea.getYear() % 10 != 0) {
            return true;
        }
        else {
            if (datea.getYear() % 400 == 0)
                return true;
            else
                return false;
        }
    }
    return false;
}

function DaysInMonth(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}

function datediff(date1, date2) {
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
        y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();
    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}

function calage() {
    var result = {};
    var calday = "29";
    var calmon = "01";
    var calyear = "1991";
    if (curday == "" || curmon == "" || curyear == "" || calday == "" || calmon == "" || calyear == "") {
        alert("please fill all the values and click go -");
    }
    else {
        var curd = new Date(curyear, curmon - 1, curday);
        var cald = new Date(calyear, calmon - 1, calday);
        var diff =
            Date.UTC(curyear, curmon, curday, 0, 0, 0) - Date.UTC(calyear, calmon, calday, 0, 0, 0);
        var dife = datediff(curd, cald);
        result["age"] = result["yearOld"] = dife[0];
        result["monthOld"] = dife[1];
        result["daysOld"] = dife[1];
        result["yearMessage"] = dife[0] + " years, " + dife[1] + " months, and " + dife[2] + " days";
        var monleft = (dife[0] * 12) + dife[1];
        var secleft = diff / 1000 / 60;
        var hrsleft = secleft / 60;
        var daysleft = hrsleft / 24;
        result["monthMessage"] = monleft + " Month since your birth";
        result["daysMessage"] = daysleft + " days since your birth";
        result["hrsMessage"] = hrsleft + " hours since your birth";
        result["minsMessage"] = secleft + " minutes since your birth";
        var as = parseInt(calyear) + dife[0] + 1;
        var diff =
            Date.UTC(as, calmon, calday, 0, 0, 0) - Date.UTC(curyear, curmon, curday, 0, 0, 0);
        var datee = diff / 1000 / 60 / 60 / 24;
        result["nextBdayMessage"] = datee + " days left for your next birthday";

        return result;
    }
}