export function getGreetMessage(time: Date) {
    let timeNow = time.getHours();
    return (
        timeNow >= 5 && timeNow < 12
        ? "Good Morning"
        : (
            timeNow >= 12 && timeNow < 18 
                ? "Good Afternoon"
                : "Good Evening"
        )
    )
}