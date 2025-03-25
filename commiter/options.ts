import { resolve } from 'path';
import { fileURLToPath } from 'url';
import type { CommiterOptions } from '@vanyamate/commiter';


const __filename = fileURLToPath(import.meta.url);
const __dirname  = resolve(__filename, '..');
const gitFolder  = resolve(__dirname, '..');


export default {
    types                  : [ '❤️ Update', '🙏 Fix', '🔥 New feature' ],
    entities               : [
        'App',
        'UI Kit',
        'Authorization',
        'Call',
        'Comment',
        'Connection',
        'Files',
        'Friends',
        'Language',
        'Message',
        'Notification',
        'Post',
        'Dialogues',
        'User',
    ],
    postfixes              : {
        'Unit tests'       : 'unit',
        'Build test'       : 'build',
        'Playwright test'  : 'pw_test',
        'Playwright update': 'pw_update',
        'Cypress test'     : 'cy_test',
        'Cypress update'   : 'cy_update',
        'TG notify'        : 'tg_notify',
    },
    postfixesSeparator     : '%',
    pattern                : `{{type}} : {{entities}} - {{message}} {{%postfixes%}}`,
    gitFolder              : gitFolder,
    gitRemoteRepositoryName: 'origin',
    gitPushDefault         : true,
} as CommiterOptions;