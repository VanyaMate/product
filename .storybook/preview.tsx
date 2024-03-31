import themeSwitcher from './tools/theme-switcher';
import { themeDecorator } from './decorators/theme-decorator';


export const globalTypes = {
    ...themeSwitcher,
};
export const decorators  = [ themeDecorator ];