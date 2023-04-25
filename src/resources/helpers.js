import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

export const getTime = (date) => {
    const daysAgo = differenceInDays(
        new Date(),
        new Date(date),
      )

    if(daysAgo > 0){
        return daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`
    }

    const hoursAgo = differenceInHours(
        new Date(),
        new Date(date),
      )

    if(hoursAgo > 0){
        return hoursAgo > 1 ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`
    }

    const minutesAgo = differenceInMinutes(
        new Date(),
        new Date(date),
      )

    return minutesAgo > 1 ? `${minutesAgo} minutes ago` : `${minutesAgo} minute ago`
}