import * as THREE from 'three';

export default {
    name: 'Basic Color',

    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;

    void main() 
    {
        vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
        vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader: `
    uniform vec3 glowColor;
    varying float intensity;

    uniform float b;
    uniform float p;
    uniform float s;
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    
    void main() 
    {
        float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
        gl_FragColor = vec4( glowColor, a );
    }`
};