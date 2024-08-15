import {
    ComponentPropsWithoutRef,
    FC,
    memo, useEffect,
    useLayoutEffect, useRef,
    useState,
} from 'react';
import css from './CallVideo.module.scss';


export type CallVideoProps =
    {
        call: RTCPeerConnection | null;
    }
    & ComponentPropsWithoutRef<'video'>;

export const CallVideo: FC<CallVideoProps> = memo(function CallVideo (props) {
    const { call, ...other } = props;

    const [ stream, setStream ] = useState<MediaStream>(null);
    const videoRef              = useRef<HTMLVideoElement>();

    useLayoutEffect(() => {
        if (call !== null) {
            const onTrack = function (e: RTCTrackEvent) {
                const [ realStream ] = e.streams;
                setStream(realStream);
            };

            call.addEventListener('track', onTrack);
            return () => call.removeEventListener('track', onTrack);
        }
    }, [ call ]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [ stream ]);

    return (
        <video
            { ...other }
            autoPlay
            className={ css.container }
            ref={ videoRef }
        />
    );
});