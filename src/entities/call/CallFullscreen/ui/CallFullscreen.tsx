import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useLayoutEffect,
    useRef,
} from 'react';
import classNames from 'classnames';
import css from './CallFullscreen.module.scss';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle.ts';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    IoCall,
    IoDesktop,
    IoDesktopSharp,
    IoMic,
    IoMicOff,
    IoVideocam,
    IoVideocamOff,
} from 'react-icons/io5';


export type CallFullscreenProps =
    {
        callId: string;
        localStream: MediaStream;
        remoteStream: MediaStream;
        finishCall: (callId: string) => Promise<any>;
        microphone: boolean;
        videoCam: boolean;
        screenSharing: boolean;
        enableMicrophone: (callId: string) => Promise<any>;
        enableVideoCam: (callId: string) => Promise<any>;
        enableScreenSharing: (callId: string) => Promise<any>;
        volume: number;
        changeVolume: (volume: number) => Promise<any>;
    }
    & ComponentPropsWithoutRef<'div'>;

const DELAY_BEFORE_HIDE_CONTROL_PANEL: number = 1000;

export const CallFullscreen: FC<CallFullscreenProps> = memo(function CallFullscreen (props) {
    const {
              microphone,
              videoCam,
              screenSharing,
              enableMicrophone,
              enableScreenSharing,
              enableVideoCam,
              finishCall,
              callId,
              remoteStream,
              localStream,
              className,
              ...other
          } = props;

    const setStream = useCallback((stream: MediaStream) => {
        return (video: HTMLVideoElement) => {
            if (video) {
                video.srcObject = stream;
            }
        };
    }, []);

    const throttle = useThrottle(100);

    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const ref = containerRef.current;
        if (ref) {
            let hidePanelTimer: ReturnType<typeof setTimeout>;

            const onMouseMove = function () {
                throttle(() => {
                    clearTimeout(hidePanelTimer);
                    ref.classList.remove(css.noControl);
                    hidePanelTimer = setTimeout(() => {
                        ref.classList.add(css.noControl);
                    }, DELAY_BEFORE_HIDE_CONTROL_PANEL);
                });
            };

            ref.addEventListener('mousemove', onMouseMove);

            return () => {
                ref.removeEventListener('mousemove', onMouseMove);
            };
        }
    }, [ throttle ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ containerRef }
        >
            <video
                autoPlay
                className={ css.remoteStream }
                ref={ setStream(remoteStream) }
            />
            <video
                autoPlay
                className={ css.localStream }
                ref={ setStream(localStream) }
            />
            <div className={ css.controlPanel }>
                <ButtonWithLoading
                    onClick={ () => enableMicrophone(callId) }
                    quad
                    size={ ButtonSizeType.LARGE }
                    styleType={ microphone ? ButtonStyleType.PRIMARY
                                           : ButtonStyleType.GHOST }
                >
                    {
                        microphone ? <IoMic/> : <IoMicOff/>
                    }
                </ButtonWithLoading>
                <ButtonWithLoading
                    onClick={ () => enableVideoCam(callId) }
                    quad
                    size={ ButtonSizeType.LARGE }
                    styleType={ videoCam ? ButtonStyleType.PRIMARY
                                         : ButtonStyleType.GHOST }
                >
                    {
                        videoCam ? <IoVideocam/> : <IoVideocamOff/>
                    }
                </ButtonWithLoading>
                <ButtonWithLoading
                    onClick={ () => enableScreenSharing(callId) }
                    quad
                    size={ ButtonSizeType.LARGE }
                    styleType={ screenSharing ? ButtonStyleType.PRIMARY
                                              : ButtonStyleType.GHOST }
                >
                    {
                        screenSharing ? <IoDesktop/> : <IoDesktopSharp/>
                    }
                </ButtonWithLoading>
                <ButtonWithLoading
                    onClick={ () => finishCall(callId) }
                    quad
                    size={ ButtonSizeType.LARGE }
                    styleType={ ButtonStyleType.DANGER }
                >
                    <IoCall/>
                </ButtonWithLoading>
            </div>
        </div>
    );
});