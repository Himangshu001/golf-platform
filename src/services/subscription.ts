export function isSubscribed() {
    return localStorage.getItem("subscribed") === "true";
}

export function subscribe() {
    localStorage.setItem("subscribed", "true");
}

export function unsubscribe() {
    localStorage.removeItem("subscribed");
}