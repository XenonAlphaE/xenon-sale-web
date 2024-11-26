import langOptions from './langOptions.json'
import backlinks from './backlinks.json'


export function getMainDomain(){
    return process.env.MAIN_DOMAIN || "https://flockez.com"
}

export function getLocale(lang){
    return langOptions[lang]?.locale || 'en_US';
}

export function getLangDomain(lang){
    return `${getMainDomain()}/${lang}`
}

export function getLangKeys(){
    return Object.keys(langOptions)
}

export function getBacklinkUrls(){
    return backlinks.filter((item) => item.url !== getMainDomain())
}