import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CallPreview.module.scss';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { DomainCall } from 'product-types/dist/call/DomainCall';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCall } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import {
    CallFullscreen,
} from '@/entities/call/CallFullscreen/ui/CallFullscreen.tsx';
import { finishCallEffect } from '@/app/model/call/call.model.ts';


export type CallPreviewProps =
    {
        userId: string;
        call: DomainCall;
        acceptCall: () => Promise<void>;
        cancelCall: () => Promise<void>;
        active: boolean;
        localStream: MediaStream;
        remoteStream: MediaStream;
    }
    & ComponentPropsWithoutRef<'div'>;

export const CallPreview: FC<CallPreviewProps> = memo(function CallPreview (props) {
    const {
              localStream,
              remoteStream,
              active,
              userId,
              acceptCall,
              cancelCall,
              call,
              className,
              ...other
          } = props;

    const setStream = useCallback((stream: MediaStream) => {
        return (video: HTMLVideoElement) => {
            if (video) {
                video.srcObject = stream;

                /*                if (!video.getAttribute('data-stream-add')) {
                 video.setAttribute('data-stream-add', 'true');
                 video.addEventListener('click', () => {
                 if (document.pictureInPictureEnabled && !document.pictureInPictureElement) {
                 video.requestPictureInPicture();
                 }
                 });
                 }*/
            }
        };
    }, []);

    const fullscreenModal = useModalController();

    return (
        <Col
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Modal className={ css.fullscreen } controller={ fullscreenModal }>
                <CallFullscreen
                    callId={ call.id }
                    changeVolume={ async () => {
                    } }
                    enableMicrophone={ async () => {
                    } }
                    enableScreenSharing={ async () => {
                    } }
                    enableVideoCam={ async () => {
                    } }
                    finishCall={ finishCallEffect }
                    localStream={ localStream }
                    microphone={ !!localStream?.getAudioTracks().length }
                    remoteStream={ remoteStream }
                    screenSharing={ !!localStream?.getVideoTracks().length }
                    videoCam={ !!localStream?.getVideoTracks().length }
                    volume={ 100 }
                />
            </Modal>
            {
                !fullscreenModal.opened
                ? <video
                    autoPlay
                    className={ classNames(css.video, { [css.visible]: localStream || remoteStream }) }
                    key="video"
                    onClick={ () => fullscreenModal.setOpened(true) }
                    ref={ setStream(remoteStream ?? localStream) }
                />
                : null
            }
            <Row
                className={ css.preview }
                fullWidth
                key="preview"
                spaceBetween
            >
                <div
                    className={ classNames(css.background, { [css.active]: active }) }
                />
                <Row className={ css.item }>
                    <UserAvatar
                        avatar={ call.user.avatar }
                        className={ css.avatar }
                        login={ call.user.login }
                    />
                    <span className={ css.login }>{ call.user.login }</span>
                </Row>
                <Row className={ css.item }>
                    {
                        call.initiatorId !== userId && !active
                        ? <ButtonWithLoading
                            onClick={ acceptCall }
                            styleType={ ButtonStyleType.SECOND }
                        >
                            <IoCall/>
                        </ButtonWithLoading>
                        : null
                    }
                    <ButtonWithLoading
                        onClick={ cancelCall }
                        styleType={ ButtonStyleType.DANGER }
                    >
                        <IoCall/>
                    </ButtonWithLoading>
                </Row>
            </Row>
        </Col>
    );
});