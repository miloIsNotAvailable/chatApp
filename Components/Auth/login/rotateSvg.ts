
/**
 * @param RotateSvg
 * rotate triangle and za-esque thingy
 * on the login background depending on 
 * mouse's x value 
 */
const RotateSvg = () => {

    document.onmousemove = ( ev: MouseEvent ) => {
        const x = ev.clientX
        const y = ev.clientY
    
        document.body.style.cssText = `
            --rotate: ${ x * .006 }deg
        `
    }
}

export default RotateSvg