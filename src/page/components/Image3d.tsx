// import * as React from 'react';
// import { Stage, Sprite, Container } from 'react-pixi-fiber';
// import { Texture, DisplacementFilter }from 'pixi.js';
//
// export interface DisplacementEffectProps {
//     image: string;
//     displacementMap: string;
//
//     size: {
//         width: number;
//         height: number;
//     };
//
//     tresholds: {
//         x: number;
//         y: number;
//     };
// }
//
// /**
//  * Renders a 3D image effect with displacement mapping.
//  *
//  * @param {DisplacementEffectProps} props - The component props.
//  * @param {string} props.image - The image source.
//  * @param {string} props.displacementMap - The displacement map source.
//  * @param {Size} props.size - The size of the effect.
//  * @param {Thresholds} props.tresholds - The x and y thresholds for positioning the effect.
//  * @returns {JSX.Element} The rendered 3D image effect component.
//  */
// const DisplacementEffect = ({image, displacementMap: displacementMap, size, tresholds }:
//                                 DisplacementEffectProps): JSX.Element => {
//     const displacementSpriteRef = React.useRef<DisplacementFilter|null>(
//         null);
//     const imageSpriteRef = React.useRef<Sprite|null>(null);
//
//     React.useEffect(() => {
//         if (displacementSpriteRef.current) {
//             if (imageSpriteRef.current) {
//                 displacementSpriteRef.current = new DisplacementFilter(imageSpriteRef.current.Sprite);
//                 imageSpriteRef.current.filters = [displacementSpriteRef];
//                 imageSpriteRef
//             }
//         }
//     }, [displacementSpriteRef, imageSpriteRef]);
//
//     return (
//       <Stage width={size.width} height={size.height} options={{ backgroundColor: 0x1099bb }}>
//         <Container>
//           <Sprite
//             ref={imageSpriteRef}
//             texture={Texture.from(image)}
//             x={tresholds.x}
//             y={tresholds.y}
//             width={size.width}
//             height={size.height}
//           />
//           <Sprite
//             ref={displacementSpriteRef}
//             texture={Texture.from(displacementMap)}
//             x={tresholds.x}
//             y={tresholds.y}
//             width={size.width}
//             height={size.height}
//           />
//         </Container>
//       </Stage>
//     );
//   };
//
//   export default DisplacementEffect;