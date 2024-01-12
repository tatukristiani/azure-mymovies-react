/**
 * Converts movies minutes to a string.
 * @param runtimeMinutes Minutes given to the function.
 * @returns {string} Example: "Total time watched: 12 h 10 min"
 */
export default function convertMinutesToString(runtimeMinutes) {
    let string = "Time Spent: ";
    if (runtimeMinutes && runtimeMinutes !== 0) {
        const timeInHours = runtimeMinutes / 60;
        let timeInDays;
        let hours;
        let mins;
        if (timeInHours >= 24) {
            timeInDays = Math.floor(timeInHours / 24);
            const remainingTime = timeInHours - (timeInDays * 24);
            hours = Math.floor(remainingTime);
            mins = Math.floor(60 * (remainingTime - hours));

            return `${string} ${timeInDays} d ${hours} h ${mins} min`;
        } else {
            hours = Math.floor(timeInHours);
            mins = Math.floor(runtimeMinutes % 60);
            return `${string} ${hours} h ${mins} min`;
        }
    } else {
        return string + 0;
    }
}