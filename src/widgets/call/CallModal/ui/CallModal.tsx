/* eslint-disable */

import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useMemo,
} from 'react';
import classNames from 'classnames';
import css from './CallModal.module.scss';
import { useStore } from '@vanyamate/sec-react';
import { $callPeerConnection } from '@/app/model/call/call.model.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    CreateCallAnswerButton,
} from '@/features/call/button/CreateCallAnswerButton/ui/CreateCallAnswerButton.tsx';


export type CallModalProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const CallModal: FC<CallModalProps> = memo(function CallModal (props) {
    const { className, ...other } = props;
    const callConnections         = useStore($callPeerConnection);
    const callsExisted            = useMemo(() =>
            Object
                .keys(callConnections)
                .filter((id) => !!callConnections[id].user)
                .map((id) => callConnections[id])
        , [ callConnections ]);

    return (
        <div { ...other }
             className={ classNames(css.container, { [css.show]: !!callsExisted.length }, [ className ]) }>
            {
                callsExisted.map((call) => (
                    <div key={ call.user.id }>
                        <Row>
                            <span>{ call.user.login }</span>
                            <CreateCallAnswerButton
                                offer={ call.offer }
                                userId={ call.user.id }
                            />
                        </Row>
                        <div>active: { call.active.toString() }</div>
                        <div>offer: { (!!call.offer).toString() }</div>
                        <video
                            style={ { width: 300 } }
                            ref={ el => el ? el.srcObject = call.localStream
                                           : null }
                            autoPlay
                        />
                        <video
                            style={ { width: 300 } }
                            ref={ el => el ? el.srcObject = call.remoteStream
                                           : null }
                            autoPlay
                        />
                    </div>
                ))
            }
        </div>
    );
});