<script>
    import { T } from '@threlte/core'
    import { TextureLoader } from 'three'
    import { useLoader } from '@threlte/core'
    import { Float } from '@threlte/extras'

    const textures = useLoader(TextureLoader).load({
        map: 'src/lib/textures/star.jpg',
        emissiveMap: 'src/lib/textures/star.jpg',
        alphaMap: 'src/lib/textures/star_alpha.jpg'
    })
</script>
  
<Float
floatIntensity={1}
floatingRange={[0, 1]}
>
<T.Mesh
    position.y={1.2}
    position.z={-0.75}
>
    <T.PlaneGeometry />
    {#await textures then values}
    <T.MeshStandardMaterial {...values} />
    {/await}
</T.Mesh>
</Float>
  