import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
    interface Window {
        Echo: any;
    }
}

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'a7e5c089812bf6ab72af',
    cluster: 'us2',
    encrypted: true,
});
