export async function fetchDataFromUrl(url) {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            let message = 'Le code de statut de réponse HTTP est ' + response.status;
            throw new Error(message);
        }    
    }
    catch(error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    }
}