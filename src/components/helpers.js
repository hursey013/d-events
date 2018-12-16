export function formatDate(date, tz) {
  return new Date(date).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    timeZone: tz,
    timeZoneName: "short"
  });
}
