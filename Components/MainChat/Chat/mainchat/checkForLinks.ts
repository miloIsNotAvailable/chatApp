export const checkForLinks: (str: string) => {
    link: string | undefined;
    image: string | undefined;
} = ( str: string ) => {
  
    // check for links
    const e = str.match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/)
    if( !e ) return { link: undefined, image: undefined }

    // check if link is an image (has .png jpeg etc. in its name)
    const s = e && e[0].match(/\.(jpeg|jpg|gif|png)/) 
    if( !s ) return { link: e[0], image: undefined }

    return { 
        link: e[0], 
        image: e[0] 
    }
}