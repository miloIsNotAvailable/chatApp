export const displayFriendName: (
    arr: string[], 
    currentUsername: string | undefined
) => string
= ( 
    arr, 
    currentUsername 
) => {
    const filtered = arr.filter( n => n !== currentUsername )
    return filtered[0]
}