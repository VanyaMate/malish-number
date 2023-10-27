import React from 'react';


export type VideoProps = {
    webm?: string;
    mp4?: string;
} & React.HTMLAttributes<HTMLVideoElement>

const Video: React.FC<VideoProps> = (props) => {
    const { mp4, webm, ...other } = props;

    return (
        <video { ...other }>
            { mp4 && <source src={ mp4 }/> }
            { webm && <source src={ webm }/> }
        </video>
    );
};

export default Video;