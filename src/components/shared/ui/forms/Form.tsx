import React from 'react';
import { IUseForm } from '@/components/shared/ui/forms/hooks/useForm.ts';


export type FormProps =
    {
        controller: IUseForm;
    }
    & React.ComponentPropsWithoutRef<'form'>;

const Form: React.FC<FormProps> = (props) => {
    const { controller, ...other } = props;

    return (
        <form { ...other } onSubmit={ controller.onSubmitHandler }/>
    );
};

export default React.memo(Form);