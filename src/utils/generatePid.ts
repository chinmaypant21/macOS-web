export const generateUniquePID = (() => {
    let processID = 1000;
    return () => ++processID;
})();