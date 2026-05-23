import { ts, pause, notif, text, emote, pic, choice } from '../helpers';

export const version = 'default-1.0';

export const chars = [{
    key: "",
    name: "",
    pfp: "/pfp/xxxxx.gif",
    chatpfp: "/pfp/xxxxx.png",
    chats: [{}]
}].sort((a, b) => a.key.localeCompare(b.key));
