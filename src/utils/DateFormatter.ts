
const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];
const monthsForms = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const DateFormatter = {
    getCurrentMonthYear() {
        const date = new Date();
        const month = months[date.getMonth()];
        const year = date.getFullYear();     
        
        return `${month}, ${year}`;
    },

    getDateMonthsTime(dateString: string) {        
        const date = new Date(dateString);
        const number = date.getUTCDate();
        const month = monthsForms[date.getUTCMonth()];
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        
        return `${number} ${month} ${hours}:${minutes}`;
    }
} 
