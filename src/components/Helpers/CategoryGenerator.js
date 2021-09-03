function CategoryGenerator()
{
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        index = 0;
    return () => {
        return alphabet[index++ % 27]; 
    }
}

export { CategoryGenerator };