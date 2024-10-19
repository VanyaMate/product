import {
    SelectOption,
    SelectOptionValueType,
} from '@/shared/ui-kit/select/Select/ui/Select.tsx';


export const getOptionLabel = function (options: Array<SelectOption>, value: SelectOptionValueType): string {
    return options.find((option) => option.value === value)?.textLabel ?? `No selection`;
};