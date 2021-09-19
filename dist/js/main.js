
const cl = (function () {
    const f = {};
    const g = {};
    return { f, g }
})();

// Index Page. Alternative to DOMContentLoaded event
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
    }
};
