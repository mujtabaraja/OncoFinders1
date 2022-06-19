const oncologistList = document.getElementById('oncologistList');
const searchBar = document.getElementById('searchBar');
let njOncologists = [];


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredOncologists = njOncologists.filter((oncologist) => {
        return (
            oncologist.City.toLowerCase().includes(searchString) ||
            oncologist.ZIP.toLowerCase().includes(searchString)
        );
    });
    displayOncologists(filteredOncologists);
});

const loadOncologists = async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/mujtabaraja/blah/main/oncodatabase.json');
        njOncologists = await res.json();
        displayOncologists(njOncologists);
    } catch (err) {
        console.error(err);

        
    }
};

const displayOncologists = (oncologist) => {
    const htmlString = oncologist
        .map((oncologist) => {
            return `
            <li class="oncologist">
                <h2>${oncologist.Name}</h2>
                <p>Speciality: ${oncologist.Speciality}</p>
                <p1>Number: ${oncologist.Number}</p1>
                <p2>Address: ${oncologist.Address}</p2>
                <p3>ZIP: ${oncologist.ZIP}</p3>
                <p4>City: ${oncologist.City}</p4>
                <p5>State: ${oncologist.State}</p5>
                <img src="${oncologist.image}"></img>

            </li>
        `;
        })
        .join('');
        oncologistList.innerHTML = htmlString;
};

loadOncologists();