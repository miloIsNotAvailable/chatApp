/**
 * @function parseColor
 * 
 * @returns array with content and color of input string
 * @example 
 * { content: string, color: string }
 * 
 * @description the basic idea behind this is
 * basically splitting the input string 
 * and looking for matches, 
 * if the match returns undefined return 
 * 'cause there is no color tags in the string, 
 * if truthy then for each in  the match change into 
 * :[color]:{content}: and then take the tag r or p, 
 * then assign it to the color r for red or p for pink, 
 * and push an object containing {content: ..., color: ...}
 * then find the elements in split string 
 * matching content and change and change it to this object, 
 * change the rest to { content: ..., color: white }
 */

export const parseColor = ( str: string ) => {
  
    const splitStr = str.split(/\:[r|p|o|b|g|y]:(.[^:]*)\:[r|p|o|b|g|y]:/gim);
    const s = str.match(/\:[r|p|o|b|g|y]:(.[^:]*)\:[r|p|o|b|g|y]:/gim);
    
    if(!s) return null
    
    let m: any[] = [];
    let arr: any[] = [];
    
    
    s.forEach( n => {
      // string to :[color]:....:
      const v = n.match( /\:[r|p|o|b|g|y]:(.[^:.:]*)\:/gim )
      // take the color ie. r for red or p for pink 
      const col = v && v[0].split(/(^:[r|p|o|b|g|y]:)/)[1].split( /:/ )[1]
      
      // assign color to the letter
      const c = () => {
        switch( col ) {
          case 'r':
            return 'var(--red)'
          case 'p':
            return 'var(--pink)'
          case 'o':
            return 'var(--orange)'
          case 'b':
            return 'var(--light-blue)'
          case 'g':
            return 'var(--green)'
          case 'y':
            return 'var(--yellow)'
        }
      }
      // get content of the string
      const text = n.replace( 
      /\:[r|p|o|b|g|y]:(.[^:p:]*)\:[r|p|o|b|g|y]:/gim, 
      `$1` 
      )
      m.push( { text, color: c() } )
    } )  
    
    splitStr.forEach(
      n => {
        const e = m.find( v => v.text == n ) || { text: n, color: 'white' }
        arr.push( e )
      }
    )
    return arr
}