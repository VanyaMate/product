import {
    IUseForm,
    IUseInputWithError,
    useForm,
    useInputWithError,
} from '@/shared/ui-kit';
import {
    AuthFormByUsernameWithError,
} from '../ui/AuthFormByUsernameWithError.tsx';
import { Meta, StoryObj } from '@storybook/react';


const meta = {
    title    : 'entities/auth/form/AuthFormByUsernameWithError',
    component: AuthFormByUsernameWithError,
} satisfies Meta<typeof AuthFormByUsernameWithError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args  : {
        loginController   : {} as IUseInputWithError,
        passwordController: {} as IUseInputWithError,
        formController    : {} as IUseForm,
    },
    render: () => {
        const loginController: IUseInputWithError = useInputWithError({
            name            : 'login',
            validationMethod: (login) => login.length <= 5 ? 'Error message' : '',
        });

        const passwordController: IUseInputWithError = useInputWithError({
            name: 'password',
        });

        const formController: IUseForm = useForm({
            inputs  : [ loginController, passwordController ],
            onSubmit: async (data) => {
                console.log(data);
                return new Promise((resolve) => setTimeout(() => resolve(), 1000));
            },
        });

        return (
            <AuthFormByUsernameWithError
                formController={ formController }
                loginController={ loginController }
                passwordController={ passwordController }
            />
        );
    },
};