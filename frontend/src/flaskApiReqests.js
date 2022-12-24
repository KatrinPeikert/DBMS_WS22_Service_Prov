import restProvider from 'ra-data-simple-rest';




export async function getServices(name, sector){
    const response= await fetch('/api/getServices',{
        method: 'POST',
        body: JSON.stringify({name: name, sector: sector})

    }
    );
    console.log(response)
    return await response.json();

}