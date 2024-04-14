jest.mock('react-i18next', () => ({
    useTranslation  : jest.fn(),
    initReactI18next: {
        type: '3rdParty',
        init: (i18next: any) => i18next,
    },
}));