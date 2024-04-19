import React, { memo } from 'react';
import { IUseForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';


export type FormProps =
    {
        controller: IUseForm;
    }
    & React.ComponentPropsWithoutRef<'form'>;

export const Form: React.FC<FormProps> = memo(function Form (props) {
    const { controller, ...other } = props;

    return (
        <form { ...other } onSubmit={ controller.onSubmitHandler }/>
    );
});