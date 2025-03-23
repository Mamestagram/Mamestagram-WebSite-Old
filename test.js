const time = new Date(Date.now());
const out = time.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Australia/Hugh_Henry",
    timeZoneName: "short",
    language: "en"
});
console.log(out);