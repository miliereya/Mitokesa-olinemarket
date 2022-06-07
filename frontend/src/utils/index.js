export const convertISODate = (date, type) => {
    const convertedDate = new Date(date)
    const year = convertedDate.getFullYear()
    const month = type === 'post'
        ? convertedDate.toLocaleString('default', { month: '2-digit' })
        : convertedDate.toLocaleString('default', { month: 'long' })
    const day = convertedDate.getDate()
    return type === 'post' ? `${day}/${month}/${year}` : `${month} ${day}, ${year}`
}
