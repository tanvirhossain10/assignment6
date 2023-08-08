/* URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone

Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}

Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089 */

const searchBtn = () => {
    const getInput = document.getElementById('input-feild');
    const searchText = getInput.value;//taking the input value from site
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => showDetails(data));
    getInput.value = '';//clearing the input feild
}

const showDetails = detail => {
    console.log(detail);
    const resultContainer = document.getElementById('show-result');
    const notFound = document.getElementById('item-not-found');
    notFound.textContent = '';
    if (detail.status === false) {
        notFound.innerHTML = `<h4 class="text-center text-danger">No phone found</h4>
        `
        return;
    }

    (detail.data).forEach((detail) => {
        console.log(detail)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${detail.image}" class="card-img-top  alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${detail.phone_name}</h5>
                        <h5>Brand: ${detail.brand}</h5>
                        <a href="${''}" class="btn btn-primary">Show details</a>
                    </div>
                    </div>

        `
        //appending div to the body
        resultContainer.appendChild(div)
    })


}