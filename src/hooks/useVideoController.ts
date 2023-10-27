import React, { useCallback, useMemo, useRef } from 'react';


export type UseVideoControllerProps = {}

export type VideoController = {
    play: () => void;
    pause: () => void;
    ref: React.MutableRefObject<HTMLVideoElement | undefined>;
}

export const useVideoController = function (): VideoController {
    const ref   = useRef<HTMLVideoElement>();
    const play  = useCallback(() => {
        ref.current?.play();
    }, [ ref.current ]);
    const pause = useCallback(() => {
        ref.current?.pause();
    }, [ ref.current ]);

    return useMemo(() => ({ ref, play, pause }), [ ref, play, pause ]);
};