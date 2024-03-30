import themeSwitcher from './tools/theme-switcher';
import { themeDecorator } from './decorators/theme-decorator';
import './decorators/slyles-decorator';


export const globalTypes = {
    ...themeSwitcher,
};
export const decorators  = [ themeDecorator ];