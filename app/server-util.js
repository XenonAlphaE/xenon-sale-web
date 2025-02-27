import langOptions from './langOptions.json'
import fetch from 'node-fetch'; // If using Node.js <18, install with: npm install node-fetch


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

async function loadJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
}

export async function getBacklinkUrls(){
    const normalizeUrl = (url) => url.replace(/\/+$/, ''); // Remove trailing slashes
    const mainDomain = normalizeUrl(getMainDomain()); // Normalize the main domain
    const uriList = await loadJson(process.env.BACKLINKS_URL || 'https://flockez.netlify.app/js/backlinks.json')

    return uriList.filter((item) => normalizeUrl(item.url) !== mainDomain);
}