import themeSwitcher from './tools/theme-switcher';
import { themeDecorator } from './decorators/theme-decorator';
import { reduxDecorator } from './decorators/redux-decorator';
import { routerDecorator } from './decorators/router-decorator';
import i18nSwitcher from './tools/i18n-switcher';


export const globalTypes = {
    ...themeSwitcher,
    ...i18nSwitcher,
};

export const decorators = [ themeDecorator, reduxDecorator, routerDecorator ];