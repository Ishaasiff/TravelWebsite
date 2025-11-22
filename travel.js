function showdestinationdetails(event) {
    const searchinput = document.getElementById('searchinput').value;
    const apiKey = '4ebc8f2c26msh6c0013449b3769ap1494b8jsn148397c9e87f';
    const apiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix=${encodeURIComponent(searchinput)}`;
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    })
        .then(response => response.json())
        .then(data => {
            const country = data.data.find(c =>
                c.name.toLowerCase() === searchinput.toLowerCase()
            );
            const destinationinfo = document.getElementById('destinationinfo');
            if (country) {
                fetch(`https://restcountries.com/v3.1/alpha/${country.code}`)
                    .then(res => res.json())
                    .then(restData => {
                        const restCountry = restData[0];

                        destinationinfo.innerHTML = `
                        <h2>${country.name} </h2>
                        <img src="${restCountry.flags.svg}" alt="Flag of ${country.name}" width="150">
                        <p><strong>Capital:</strong> ${restCountry.capital ? restCountry.capital[0] : "N/A"}</p>
                        <p><strong>Population:</strong> ${restCountry.population.toLocaleString()}</p>
                        <p><strong>Currency:</strong> ${country.currencyCodes.join(', ')}</p>
                        <p><strong>Languages:</strong> ${restCountry.languages ? Object.values(restCountry.languages).join(', ') : "N/A"}</p>
                        <p><strong>Timezones:</strong> ${restCountry.timezones.join(', ')}</p>
                        `;
                        // ✅ make the card visible
                        destinationinfo.style.display = "block";
                    })
                    .catch(err => {
                        console.error("Error fetching from REST Countries:", err);
                        destinationinfo.innerHTML = `<p>Country found but extra details unavailable.</p>`;
                        // ✅ make the card visible
                        destinationinfo.style.display = "block";
                    });
            } else {
                destinationinfo.innerHTML = `<p>No country found for "${searchinput}"</p>`;
                // ✅ make the card visible
                destinationinfo.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Error fetching country:', error);
            const destinationinfo = document.getElementById('destinationinfo');
            destinationinfo.innerHTML = `<p>Failed to fetch country data. Please try again.</p>`
            // ✅ make the card visible
            destinationinfo.style.display = "block";
        })
}
document.getElementById('searchbtn').addEventListener('click', showdestinationdetails);




const btnSearch = document.getElementById('btnSearch');
function searchPlaces() {
    const input = document.getElementById('countries-name').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel.json')
        .then(response => response.json())
        .then(data => {
            const places = data.places.find(item => item.name.toLowerCase() === input);


            if (places) {
                const description = places.description;
                resultDiv.innerHTML += `<div class="polaroid"><img src="${places.imagesrc}" alt="${places.name}"> <h3>${places.name}</h3> </div> `;
                resultDiv.innerHTML += `<p>${description}</p>`;
            } else {
                resultDiv.innerHTML = 'Place not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchPlaces();
});

const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); 
        observer.unobserve(entry.target);     
      }
    });
  }, { threshold: 0.1 }); 
  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
  