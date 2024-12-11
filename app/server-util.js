import langOptions from './langOptions.json'
import backlinks from './backlinks.json'


export function getMainDomain(){
    return process.env.MAIN_DOMAIN || "https://frenzwith.com"
}

export function getSiteName(){
    return process.env.MAIN_SITENAME || ""
}

export function getTwiter(){
    return process.env.MAIN_TWITTER || ""
}

export function getOG(){
    const ogPath =  process.env.OG_PATH || ""
    return `${getMainDomain()+ogPath}`
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