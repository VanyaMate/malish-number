import { cn } from '@/helpers/react/classname.helper.ts';
import React from 'react';
import ReactPlayer from 'react-player';
import css from './BackgroundYoutubeVideo.module.scss';


export type BackgroundYoutubeVideoProps = {
    playing: boolean;
    url: string;
}

const BackgroundYoutubeVideo: React.FC<BackgroundYoutubeVideoProps> = (props) => {
    const { playing, url } = props;

    return (
        <div className={ cn(css.container, !playing && css.paused) }>
            <div className={ css.content }>
                <ReactPlayer
                    playing={ playing }
                    loop
                    config={ {
                        youtube: {
                            playerVars: {
                                playing       : playing,
                                controls      : 0,
                                mute          : true,
                                subtitles     : false,
                                cc_load_policy: 0,
                                iv_load_policy: 3,
                                color         : 'white',
                                disablekb     : 1,
                                fs            : 0,
                                hl            : 0,
                                modestbranding: 1,
                                showinfo      : 0,
                            },
                        },
                    } }
                    url={ url }
                    width={ '100%' }
                    height={ '100%' }
                />
            </div>
            <div className={ css.overflow }/>
        </div>
    );
};

export default BackgroundYoutubeVideo;