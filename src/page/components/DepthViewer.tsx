import * as React from 'react';
// import * as THREE from 'three';

declare type Thresholds =  {
    x: number;
    y: number;
};

export interface DepthViewerProps extends React.HTMLAttributes<HTMLCanvasElement> {
    depthTexture: string|unknown;
    texture: string|unknown;
    trehsholds?: Thresholds;
};

const DepthViewer = ({ depthTexture, texture, ...props }: DepthViewerProps): JSX.Element => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    // const renderer = React.useRef<THREE.WebGLRenderer>();
    // const scene = React.useRef<THREE.Scene>();
    // const camera = React.useRef<THREE.PerspectiveCamera>();
    // const mesh = React.useRef<THREE.Mesh>();
    // const depthMaterial = React.useRef<THREE.ShaderMaterial>();
    // const depthTextureRef = React.useRef<THREE.Texture>();
    // const textureRef = React.useRef<THREE.Texture>();
    // const tresholdCoords = React.useMemo(() => {
    //     if (tresholds) {
    //         return thresholds;
    //     }

    //     return { 
    //         x: 35, 
    //         y: 20,
    //     } as Thresholds;
    // }, [tresholds]);

    // React.useEffect(() => {
    //     if (canvasRef.current) {
    //         const canvas = canvasRef.current;
    //         renderer.current = new THREE.WebGLRenderer({ canvas });
    //         scene.current = new THREE.Scene();
    //         camera.current = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    //         camera.current.position.z = 2;

    //         depthTextureRef.current = new THREE.TextureLoader().load(depthTexture as string);
    //         textureRef.current = new THREE.TextureLoader().load(texture as string);

    //         depthMaterial.current = new THREE.ShaderMaterial({
    //             uniforms: {
    //                 depthTexture: { value: depthTextureRef.current },
    //                 texture: { value: textureRef.current },
    //             },
    //             vertexShader: `
    //                 varying vec2 vUv;
    //                 void main() {
    //                     vUv = uv;
    //                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //                 }
    //             `,
    //             fragmentShader: `
    //                 uniform sampler2D depthTexture;
    //                 uniform sampler2D texture;
    //                 varying vec2 vUv;
    //                 void main() {
    //                     float depth = texture2D(depthTexture, vUv).r;
    //                     gl_FragColor = vec4(vec3(depth), 1.0);
    //                 }
    //             `,
    //         });

    //         mesh.current = new THREE.Mesh(
    //             new THREE.PlaneGeometry(1, 1),
    //             depthMaterial.current,
    //         );
    //         scene.current.add(mesh.current);

    //         const animate = () => {
    //             renderer.current.render(scene.current, camera.current);
    //             requestAnimationFrame(animate);
    //         };
    //         animate();
    //     }
    // }, [depthTexture, texture]);

    return <canvas ref={canvasRef} {...props} />;
}

export default DepthViewer;