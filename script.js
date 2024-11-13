async function getMarvelCharacterInfo(characterID) {
    // Get the current timestamp
    const ts = new Date().getTime();
    
    const publicKey = '82e8d6bb00374e14ef2afd27fea2547f';
    const privateKey = 'c71505f8696a928efc09356d84694af6045788b3';
    
    // Generate the MD5 hash
    const hash = md5(ts + privateKey + publicKey);
    
    // Construct the API URL 
    const url = `https://gateway.marvel.com/v1/public/characters/${characterID}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    // Fetch character data
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
        throw new Error('Failed to fetch character data');
    }

    const marvelCharacterData = await response.json();
    return marvelCharacterData;
}

document.addEventListener('DOMContentLoaded', async () => {
    // ID for Hulk
    const characterID = '1009351';

    // Uses the delay function that returns a promise which will show after 5 secs
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        const characterData = await getMarvelCharacterInfo(characterID);
        
        await delay(5000);

        // Log the data to the console
        console.log(characterData);
        
        const characterInfoElement = document.getElementById('container');
        
        if (characterData && characterData.data && characterData.data.results.length > 0) {
            const character = characterData.data.results[0];
            
            // Display character's name and description
            characterInfoElement.innerHTML = `
                <h2>${character.name}</h2>
                <p>${character.description || 'No description available.'}</p>
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" style="width:400px; height:300px;" alt="${character.name}">
            `;
        } else {
            characterInfoElement.innerHTML = '<p>Character data not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching Marvel character:', error);
        const characterInfoElement = document.getElementById('container');
        characterInfoElement.innerHTML = '<p>Error fetching character data.</p>';
    }
});



