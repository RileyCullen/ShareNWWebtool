function GenerateWafflePreset(icon, color, offset, font)
{
    return {
        'icon': icon,
        'color': color,
        'offset': offset,
        'font': font,
    };
}

function GenerateIconDataArray({icon, color, offset, font})
{
    return {
        'icon': icon,
        'color': color,
        'offset': offset,
        'font': font,
    };
}

export { GenerateIconDataArray, GenerateWafflePreset };