import { FC, memo } from 'react';
import {
    LanguagesContainer,
} from '@/widgets/language/container/LanguagesContainer/ui/LanguagesContainer.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';


export const LanguagesPage: FC = memo(function LanguagesPage () {
    const user = useStore($authUser);

    return (
        <LanguagesContainer userId={ user.id }/>
    );
});