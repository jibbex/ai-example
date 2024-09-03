import * as React from 'react';
import { Sketch } from '../../lib/util.ts';

export interface Size {
    width: number;
    height: number;
}

declare type Thresholds =  {
    x: number;
    y: number;
};

export interface DepthViewerProps extends React.HTMLAttributes<HTMLCanvasElement> {
    size: Size;
    threshold: {
        x: number;
        y: number;
    };
    sources: {
        image: string;
        depthMap: string;
    };
};

export const DepthViewer = ({ sources, threshold, size}: DepthViewerProps): JSX.Element => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sketchRef = React.useRef<Sketch>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const sketch = new Sketch(canvas, sources, threshold);
            sketchRef.current = sketch;
            sketch.setup();
            sketch.draw();

            sketchRef.current = new Sketch(canvasRef.current, size, )
            
            return () => {
                sketchRef.current?.dispose();
            };
        }
    }, [canvasRef, size, sources, threshold]);

    return (
        <div className="bg-white/75 backdrop-blur-lg rounded-[2em] p-4 border-white/[0.4] border-2 ">
            <canvas ref={canvasRef} className="w-full h-auto"/>
        </div>
    );
}

export default DepthViewer;