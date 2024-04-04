import React, { useContext } from 'react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import {
    TestComponentContext
} from '@/components/entities/_temp_/TestComponent/TestComponentContext.ts';


export type UpdateTestComponentButtonProps = {};

const UpdateTestComponentButton: React.FC<UpdateTestComponentButtonProps> = (props) => {
    const {}              = props;
    const { val, setVal } = useContext(TestComponentContext);

    return (
        <Button onClick={ () => {
            setVal(val + 1);
            console.log('Click on set local val', val);
        } }
        >
            { val }
        </Button>
    );
};

export default React.memo(UpdateTestComponentButton);