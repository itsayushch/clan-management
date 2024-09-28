export const rules = [
    {
        uid: 1,
        value: 1,
        reason: 'Ignoring mails and messages pinned by leaders'
    },
    {
        uid: 2,
        value: 1,
        reason: 'Missing 3 war attacks consecutively'
    },
    {
        uid: 3,
        value: 1,
        reason: 'Missing FWA war search (e.g. Due to lingering in CWL clan, visiting other clan etc)'
    },
    {
        uid: 4,
        value: 1,
        reason: 'Leaving the clan without informing the Leader or Co-Leaders'
    },
    // //////////////////////////
    {
        uid: 5,
        value: 2,
        reason: 'Not fixing errors in the active FWA base after being notified (e.g. Air X-Bows, range overlaps etc).'
    },
    {
        uid: 6,
        value: 2,
        reason: 'Attacking the wrong target in war before the cleanup time'
    },
    {
        uid: 7,
        value: 2,
        reason: '2 staring #1 in Lose War or  3 staring #1 in Win War'
    },
    {
        uid: 8,
        value: 2,
        reason: 'Doing cleanup attacks before cleanup time (Last 12 hours) starts at the end of war day '
    },

    // //////////////////////////////////////////////////////////
    {
        uid: 9,
        value: 3,
        reason: 'Having a real war base active when war day starts.'
    },
    {
        uid: 10,
        value: 3,
        reason: '3-starring in a lose war.'
    },

    {
        uid: 11,
        value: 3,
        reason: 'Causing drama, spamming etc. in chat, really bad behavior in short.'
    }
];


export const compareArrays = (a: Array<any>, b: Array<any>) => {
    if (a.length !== b.length) return false;
    else {
        // Comparing each element of your array
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
};

export const strikeColorScheme: { [key: number]: string } = {
    0: 'gray',
    1: 'teal',
    2: 'yellow',
    3: 'orange',
    4: 'red'
}

export function getStrikeColor(strike: number | 1 | 2 | 3 | 4) {
    if (strike <= 4) {
        return strikeColorScheme[strike];
    }
    return 'red';
}

export function getReason(uid: number) {
    const rule = rules.find(rule => rule.uid === uid);
    return rule?.reason;
}

export function getStrikeValue(uid: number) {
    const rule = rules.find(rule => rule.uid === uid);
    return rule?.value ?? 0;
}