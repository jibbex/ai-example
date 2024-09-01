import * as React from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import type { AosAttrs } from "@/../content.d";

/**
 * Represents the attributes for the AudioPlayer component.
 * Inherits from AosAttrs and React.HTMLAttributes<HTMLCanvasElement>.
 */
type AudioPlayerAttributes = AosAttrs & React.HTMLAttributes<HTMLCanvasElement>;

/**
 * Represents the props for the AudioPlayer component.
 */
export interface AudioPlayerProps extends AudioPlayerAttributes {
    src: string;
    childrem?: React.ReactNode;
}

/**
 * AudioPlayer component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.src - The source URL of the audio file.
 * @returns {JSX.Element} The rendered AudioPlayer component.
 */
export const AudioPlayer = ({ src, ...props }: AudioPlayerProps): JSX.Element => {
    const recorderControls = useVoiceVisualizer();
    const {
        audioRef,
        error,
    } = recorderControls;

    const [hasError , setHasError] = React.useState<typeof error|null>(null);
    
    React.useEffect(() => {
        if (window && audioRef.current) {
            audioRef.current.src = src;
        }    
    }, [src, audioRef]);

    React.useEffect(() => {
        if (error) {
            setHasError(error);
        }
    }, [error]);

    if (hasError) {
        return (
            <figure {...props}>
                <figcaption>{hasError.message}</figcaption>
            </figure>
        );
    }

    return (
        <figure {...props}>
            <VoiceVisualizer
                controls={recorderControls}
            />
        </figure>
    );
};