module.exports = {
    postedTime: (timestamp) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        timestamp = new Date(timestamp)
        const timeDiff = (Date.now()-timestamp.getTime())/1000
        
        const days = Math.floor(timeDiff/60/60/24)
        const hours = Math.floor((timeDiff - days*60*60*24)/3600)
        const minutes = Math.floor((timeDiff-days*60*60*24-hours*3600)/60)
        const seconds = Math.floor((timeDiff-days*3600*24-hours*3600-minutes*60))
        
        if (days >= 3) {
            return `Posted ${months[timestamp.getMonth()]} ${timestamp.getDate()} ${timestamp.getFullYear()}`
        } else if (days >= 1) {
            return `Posted ${days} day${days > 1 ? "s" : ""} ago`
        } else if (hours >= 1) {
            return `Posted ${hours} hour${hours > 1 ? "s" : ""} ago`
        } else if (minutes >= 1) {
            return `Posted ${minutes} minute${minutes > 1 ? "s" : ""} ago`
        } else if (seconds >= 1) {
            return `Posted ${seconds} second${seconds > 1 ? "s" : ""} ago`
        } else {
            return `Just Now`
        }
    }
}