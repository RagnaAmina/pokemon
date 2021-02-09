const move_max = 4

let FetchData = async function (search) {
    let source = await fetch('https://pokeapi.co/api/v2/pokemon/' + search.toString());
    return await source.json();

}
let FetchMoves = function (pokemon) {
    try {
        let move_set = [];
        for (let i = 0; i < move_max; i++) {
            let random = Math.floor(Math.random() * pokemon['moves'].length);
            let random_move = pokemon['moves'][random]['move'].name;
            move_set.push(random_move);
        }

        if ([...new Set(move_set)].length === 1) console.log([...new Set(move_set)]);
        else console.log(move_set);
        return move_set;
    } catch {console.log('Error: no moves listed')}
    

}
let FetchSprite = function (pokemon) {
    document.getElementById("pokemon_picture").src = pokemon['sprites']['other']['official-artwork']['front_default'];
}
let FetchPrevolution = async function (pokemon) {
    let source = await fetch(pokemon['species']['url']);
    let data = await source.json();

    if (data['evolves_from_species'] !== null) {

        console.log('evolved!');
        let prevolution = await FetchData(data['evolves_from_species']['name']);
        console.log(prevolution['name'])
        document.getElementById('prevolution_picture').src = prevolution['sprites']['other']['official-artwork']['front_default'];

    } else document.getElementById('prevolution_picture').src = ""
};

document.getElementById('run').addEventListener('click', async function () {

    let input = document.getElementById('find').value;
    let pokemon = await FetchData(input)


    document.getElementById('location').innerText = pokemon['id'];
    

   let move_set =   FetchMoves(pokemon);
    FetchSprite(pokemon);
    await FetchPrevolution(pokemon)
    document.getElementById('moves').innerText = move_set;
    document.getElementById ('name').innerText = pokemon ['name'];

})

