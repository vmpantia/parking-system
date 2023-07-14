import moment from "moment";

export function parseDate(date) {
    if(date === null)
        return "-";

    let momentDate = moment(date);
    return momentDate.format("YYYY-MM-DD");
}