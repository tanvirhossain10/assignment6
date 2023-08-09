const getInput = document.getElementById('input-feild');
const resultContainer = document.getElementById('show-result');//clearing the ui after entering with new phone name for search
const searchBtn = () => {
    //clearing the textcontent of all phone click each time
    resultContainer.textContent = "";
    //clearing the textcontent of a single phone-details for new phone search;
    document.getElementById('phone-detail').textContent = '';

    const searchText = getInput.value;//taking the input value from site
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.toLowerCase()}`)
        .then(res => res.json())
        .then(data => showDetails(data));
    getInput.value = '';//clearing the input feild
}

const showDetails = details => {
    const detailContainer = { details }
    // console.log(details);

    const notFound = document.getElementById('item-not-found');
    notFound.textContent = '';
    if (details.status === false) {
        notFound.innerHTML = `<h4 class="text-center text-danger">No phone found</h4>
        `
        return;
    }
    let phoneCount = 0;
    const maxPhoneShow = 20;
    (details.data).forEach((detail) => {
        console.log(detail)
        // const stringify = JSON.stringify(detail);
        // console.log('dsjk', stringify);
        if (phoneCount >= maxPhoneShow) {

            return;
        }
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${detail.image}" class="card-img-top  alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${detail.phone_name}</h5>
                        <h5>Brand: ${detail.brand}</h5>
                        <a  class="btn btn-primary"  onclick="getPhoneId('${detail.slug}')">Show details</a>
                    </div>
                    </div> `
        //appending div to the body
        resultContainer.appendChild(div);
        phoneCount++;
    },);
};

const getPhoneId = id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFullDetals(data))
};

//taking function for display single phone full details
const displayFullDetals = data => {
    console.log(data)
    const div = document.getElementById('phone-detail');
    div.innerHTML = `
    <div class="card">
    <img src="${data.data.image}" class="card-img-top w-75 mx-auto" alt="...">
    <div class="card-body">
        <h5 class="text-center">${data.data.name}</h5>
        <h5>${data.data.releaseDate ? data.data.releaseDate : 'Relase not found'}</h5>
        <p class="card-text">Main features: storage: ${data.data.mainFeatures.storage}</br>
        display size:: ${data.data.mainFeatures.displaySize}</br>
        memory: ${data.data.mainFeatures.memory}
        </p>
    </div>
</div>
    `
}