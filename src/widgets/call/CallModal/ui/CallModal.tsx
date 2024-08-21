/* eslint-disable */

import {
    ComponentPropsWithoutRef,
    FC,
    memo, useLayoutEffect,
    useMemo,
} from 'react';
import classNames from 'classnames';
import css from './CallModal.module.scss';
import { useStore } from '@vanyamate/sec-react';
import {
    $callPeerConnection, finishCallEffect,
    getMyNotFinishedCallsEffect,
} from '@/app/model/call/call.model.ts';
import { CallPreview } from '@/entities/call/CallPreview/ui/CallPreview.tsx';
import { $authUser } from '@/app/model/auth/auth.model.ts';


export type CallModalProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const CallModal: FC<CallModalProps> = memo(function CallModal (props) {
    const { className, ...other } = props;
    const callConnections         = useStore($callPeerConnection);
    const user                    = useStore($authUser);

    useLayoutEffect(() => {
        getMyNotFinishedCallsEffect();
    }, []);

    const callsExisted = useMemo(() =>
            Object
                .keys(callConnections)
                .filter((id) => !!callConnections[id].call && !callConnections[id].call.finished)
                .map((id) => callConnections[id])
        , [ callConnections ]);

    return (
        <div { ...other }
             className={ classNames(css.container, { [css.show]: !!callsExisted.length }, [ className ]) }>
            {
                callsExisted.map((call) => (
                    <CallPreview
                        cancelCall={ () => finishCallEffect(call.call.id).then() }
                        acceptCall={ async () => {
                        } }
                        userId={ user.id }
                        key={ call.call.id }
                        call={ call.call }
                    />
                ))
            }
        </div>
    );
});