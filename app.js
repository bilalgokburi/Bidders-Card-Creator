const createBidderBtn = document.getElementById('create-bidder');
const doubleMoneyBtn = document.getElementById('double-money');
const showNiceBtn = document.getElementById('show-nice');
const sortBtn = document.getElementById('sort');
const calculateAllBtn = document.getElementById('calculate-all');

const totalAmountDOM = document.querySelector('.total-amount');
const cardContainerDOM = document.querySelector('.card-container');

let myData = [];


// double money
function doubleMoney() {
    myData = myData.map(item => {
        return {...item, money: item.money * 2};
    });

    updateDOM();
};

// filter and show only $5.000.00+
function showOnlyNice() {
    myData = myData.filter(item => item.money > 5000);

    updateDOM();
};

// sort by richest
function sortRichest() {
    myData.sort((a, b) => b.money - a.money);

    updateDOM();
};

// calculate the total money
function totalMoney() {
    // clear DOM
    totalAmountDOM.innerHTML = "";

    const total = myData.reduce((acc, bidder) => (acc += bidder.money), 0);

    const totalElement = document.createElement('h3');
    totalElement.innerHTML = commaFormat(total);
    totalAmountDOM.append(totalElement);
};

async function getRandomBidder () {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();

    const bidder = data.results[0]

    const newBidder = {
        name: `${bidder.name.first} ${bidder.name.last}`,
        money: Math.floor(Math.random() * 10000),
        country: bidder.location.country,
        picture: bidder.picture.large 
    };
    // console.log(newBidder);

    myData.push(newBidder);

    updateDOM();
};



// update DOM
function updateDOM(providedData = myData) {
    //clear DOM
    cardContainerDOM.innerHTML = "";

    providedData.forEach(bidder => {
        const element = document.createElement('div');
        element.classList.add('card');
        element.innerHTML = `
            <img src=" ${bidder.picture} " alt="bidder">
            <div class="content">
                <h3> ${bidder.name}  </h3>
                <p> ${bidder.country} </p>
                <p>Offer: ${commaFormat(bidder.money)} </p>
            </div>
        `;
        cardContainerDOM.append(element);
    });
};

// comma format for money
function commaFormat(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // $12,345.67
}


// EVENT LİSTENERS
createBidderBtn.addEventListener('click', getRandomBidder);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showNiceBtn.addEventListener('click', showOnlyNice);
sortBtn.addEventListener('click', sortRichest);
calculateAllBtn.addEventListener('click', totalMoney);