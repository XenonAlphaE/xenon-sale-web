import langOptions from './langOptions.json'
import backlinks from './backlinks.json'


export function getMainDomain(){
    return process.env.MAIN_DOMAIN || "https://flockez.com"
}

export function getGTAG(){
    return process.env.MAIN_GTAG || "00"
}

export function getGTAG(){
    return process.env.MAIN_GTAG || "00"
}

export function getSiteName(){
    return process.env.MAIN_SITENAME || ""
}

export function getTwiter(){
    return process.env.MAIN_TWITTER || ""
}

export function getOG(){
    const mainDomain = getMainDomain();

    const ogPath =  process.env.OG_PATH || ""
    // Normalize the logo path
    const normalizedPath = ogPath
    .replace(/\/+/g, '/') // Replace multiple slashes with a single slash
    .replace(/(^\/|\/$)/g, ''); // Remove leading and trailing slashes

    // Combine main domain with the normalized logo path
    return `${mainDomain.replace(/\/+$/, '')}/${normalizedPath}`;
}

export function getLogoPath(){
    const mainDomain = getMainDomain();

    const logoPath =  process.env.LOGO_PATH || ""
    // Normalize the logo path
    const normalizedPath = logoPath
    .replace(/\/+/g, '/') // Replace multiple slashes with a single slash
    .replace(/(^\/|\/$)/g, ''); // Remove leading and trailing slashes

    // Combine main domain with the normalized logo path
    return `${mainDomain.replace(/\/+$/, '')}/${normalizedPath}`;
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