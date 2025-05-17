// public/js/app.js

// --- Globális DOM elemek ---
const linkListContainer = document.getElementById('link-list-container');
const linksLoadingPlaceholder = document.getElementById('links-loading'); 

// Kaszinó link adatok frissítve a megadottra
const links = [
  {
    id: 'NVCASINO', 
    title: 'NVCASINO', // A title mező megmarad, de nem jelenítjük meg a kártyán
    description: `<ul>
                    <li>VAN KÁRTYÁS ÉS CRYPTO DEPO IS</li>
                    <li>KELL KYC KIFIZETÉSHEZ</li>
                  </ul>`,
    url: 'https://nvpartnerspromo.com/l/6821e380536b159318087d2f', 
    logo: 'img/nvfeher.png', 
    badgeText: '', 
    badgeType: '' 
  }
  // Ha több kaszinót szeretnél, itt folytasd a sort a kommentelt rész mintájára:
  /*
  {
    id: 'kovetkezo_kaszinó_id', 
    title: 'Következő Kaszinó Címe',
    description: `<ul>
                    <li>Jellemző 1</li>
                    <li>Jellemző 2</li>
                  </ul>`,
    url: 'https://link_a_kovetkezo_kaszinohoz.com', 
    logo: 'img/kovetkezo_logo.png', 
    badgeText: 'Opcionális Címke', 
    badgeType: 'default' // vagy 'new'
  }
  */
];

// --- Funkciók ---

/**
 * Megjeleníti a linkeket kártyaként a rácsban.
 */
function renderLinks() {
  // Ellenőrzi, hogy a linkListContainer létezik-e a DOM-ban
  if (!linkListContainer) {
    console.error("A 'link-list-container' elem nem található.");
    if (linksLoadingPlaceholder) linksLoadingPlaceholder.textContent = "Hiba a linkek betöltésekor.";
    return;
  }
  // Törli a konténer korábbi tartalmát (a betöltés jelzőt is)
  linkListContainer.innerHTML = '';

  // Ellenőrzi, hogy vannak-e linkek
  if (!links || links.length === 0) {
      const noLinksMessage = document.createElement('div');
      noLinksMessage.className = 'loading-placeholder'; // Ugyanazt a stílust használjuk
      noLinksMessage.textContent = 'Nincsenek megjeleníthető linkek.';
      linkListContainer.appendChild(noLinksMessage);
      return;
  }

  // Ha van betöltés jelző, eltávolítja
  if (linksLoadingPlaceholder) linksLoadingPlaceholder.remove();


  // Végigmegy a linkeken és létrehozza a HTML elemeket
  links.forEach(link => {
    // Kártya link elem létrehozása (<a> tag)
    const cardLink = document.createElement('a');
    cardLink.href = link.url; // Közvetlen navigáció a kaszinó oldalára
    cardLink.classList.add('link-card');
    cardLink.target = '_blank'; // Megnyitás új lapon
    cardLink.rel = 'noopener noreferrer'; // Biztonsági okokból

    // Címke (badge) hozzáadása, ha van
    if (link.badgeText) {
        const badge = document.createElement('div');
        badge.className = 'card-badge';
        if (link.badgeType === 'new') {
            badge.classList.add('new');
        }
        badge.textContent = link.badgeText;
        cardLink.appendChild(badge);
    }
    
    // Logó konténer (a címke miatt, hogy a logó ne takarja)
    const logoContainer = document.createElement('div');
    logoContainer.className = 'link-card-logo-container';

    // Logó kép
    const logoImg = document.createElement('img');
    logoImg.src = link.logo;
    logoImg.alt = `${link.title} logo`; // Az alt text továbbra is használja a címet
    logoImg.className = 'link-card-logo';
    // Hiba esetén elrejti a képet, hogy ne jelenjen meg törött kép ikon
    logoImg.onerror = () => { 
        console.warn(`Nem sikerült betölteni a logót: ${link.logo} (${link.title})`);
        logoImg.alt = `${link.title} logó nem elérhető`; 
        // logoImg.src = 'img/default_casino_logo.png'; // Ha van alapértelmezett logód
    };
    logoContainer.appendChild(logoImg);
    cardLink.appendChild(logoContainer);

    // --- Kaszinó nevének (címének) megjelenítése eltávolítva/kikommentelve ---
    /*
    const titleElement = document.createElement('h3');
    titleElement.className = 'link-card-title';
    titleElement.textContent = link.title;
    cardLink.appendChild(titleElement);
    */

    // Leírás (HTML tartalommal)
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'link-card-description';
    descriptionElement.innerHTML = link.description; // HTML tartalom beillesztése
    cardLink.appendChild(descriptionElement);

    // Kártya hozzáadása a konténerhez
    linkListContainer.appendChild(cardLink);
  });
}


// --- Inicializálás ---
// A DOM betöltődése után fut le
document.addEventListener('DOMContentLoaded', () => {
    // Ellenőrzi, hogy a szükséges DOM elemek léteznek-e
    if (linkListContainer) {
        renderLinks(); // Megjeleníti a linkeket
    } else {
        console.error("A 'link-list-container' elem nem található a DOM-ban. Az inicializálás leáll.");
        // A betöltés jelzőt csak akkor próbáljuk módosítani, ha létezik
        if(linksLoadingPlaceholder) linksLoadingPlaceholder.textContent = "Hiba: Az oldal struktúrája nem megfelelő.";
    }
});
