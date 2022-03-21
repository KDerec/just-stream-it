export async function fetchDataFromUrl(url) {
    return (await fetch(url)).json();
}