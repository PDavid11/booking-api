export const toNormalizedISO = (dateInput: Date | string): string => {
    const date = new Date(dateInput)

    if (isNaN(date.getTime())) {
        return ''
    }

    const pad = (num: number) => num.toString().padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}