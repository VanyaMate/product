import { Theme } from '@/app';


export default {
    theme: {
        name        : 'Theme',
        description : 'Global theme for components',
        defaultValue: 'light',
        toolbar     : {
            icon: 'circlehollow',
            items: [
                { value: Theme.LIGHT, icon: 'circlehollow', title: 'light' },
                { value: Theme.DARK, icon: 'circle', title: 'dark' },
            ],
            showName: true,
        },
    },
};