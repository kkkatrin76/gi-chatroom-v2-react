const ts = (content, timeout = 2000) => ({ type: 'ts', content, timeout });
const pause = (timeout = 2000) => ({ type: 'pause', timeout });
const notif = (content, showif = null, timeout = 2000) => ({ type: 'notif', content, timeout, showif });

const text = (content, showif = null, timeout = 2000) => ({ type: 'text', dir: 'in', content, timeout, showif });
const emote = (content, showif = null, timeout = 2000) => ({ type: 'emote', dir: 'in', content, timeout, showif });
const pic = (content, showif = null, timeout = 2000) => ({ type: 'pic', dir: 'in', content, timeout, showif });

const choice = (showif, timeout, ...args) => {
    const content = [];
    const maxOptions = 4;

    for (let i = 0; i < Math.min(args.length, maxOptions * 3); i += 3) {
        const kind = args[i];
        const key = args[i + 1];
        const value = args[i + 2];
        // console.log({ kind, key, value });

        if (!kind || !key || value === undefined) {
            continue;
        }

        content.push({ key, [kind]: value });
    }

    var obj = {
        type: 'choice',
        timeout: timeout ? timeout : 2000,
        content
    };

    if (showif) obj.showif = showif;

    return obj;
};

// TODO: add call functions
const call = (content, showif = null, timeout = 4000) => ({ type: 'call', dir: 'in', content, timeout, showif });
// const callAudio = (content, showif = null, timeout = 2000) => ({ type: 'text', dir: 'in', content, timeout, showif });

export {
    ts,
    pause,
    notif,
    text,
    emote,
    pic,
    choice,
    call,
};
