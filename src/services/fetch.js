export default async function fetch(url){
    const response = await fetch(url);
    const result = await response.json();
    return result;
}