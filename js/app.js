// public/js/app.js

// --- Globális DOM elemek ---
const linkListContainer = document.getElementById('link-list-container');
const linksLoadingPlaceholder = document.getElementById('links-loading'); 

// Kaszinó link adatok frissítve a megadottra, új mezőkkel a logó méretéhez és felső margójához
const links = [
/*
  {
    id: 'TRUSTDICE', 
    title: 'TRUSTDICE',
    description: `<ul>
                    <li>INSTANT CO, NO KYC</li>
                    <li>VAN KÁRTYÁS ÉS CRYPTO DEPOSIT/WITHDRAW</li>
                    <li>VIP RENDSZER</li>
                    <li>500% BEFIZETÉSI BÓNUSZ ÉS 100 FS</li>
                  </ul>`,
    url: 'https://trustdice.win/bonus?ref=u_bureszgoat', 
    logo: 'img/trustdice-removebg-preview.png', 
    badgeText: '', 
    badgeType: '',
    logoWidth: '320', 
    logoMaxHeight: '150px',
    logoMarginTop: '10px' // Alapértelmezett felső margó, vagy amennyi szükséges
  }
  
  ,

*/

  {
    id: 'BETFURY', 
    title: 'BETFURY',
    description: `<ul>
                    <li>INSTANT CRYPTO CASHOUT</li>
                    <li>NO KYC</li>
                    <li>WEEKLY AND MONTHLY CASHBACK</li>
                    <li>100% DEPOSIT BONUS + 50 FREE SPINS</li>
                   </ul>`,
    url: 'https://betfury.tv/4kWGYXV', 
    logo: 'img/betfury.png', 
    badgeText: '', 
    badgeType: '',
    logoWidth: '200px', 
    logoMaxHeight: '93px',
    logoMarginTop: '35px'  // Példa érték az NVCASINO logó lejjebb tolásához, ezt finomhangolhatod
  }
  // Ha több kaszinót szeretnél, itt folytasd a sort, és add meg a logoWidth, logoMaxHeight és logoMarginTop értékeket:
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
    badgeType: 'default',
    logoWidth: '140px', 
    logoMaxHeight: '65px',
    logoMarginTop: '5px' // Egyedi felső margó
  }
  */
];

// --- Funkciók ---

/**
 * Megjeleníti a linkeket kártyaként a rácsban.
 */
function renderLinks() {
  if (!linkListContainer) {
    console.error("A 'link-list-container' elem nem található.");
    if (linksLoadingPlaceholder) linksLoadingPlaceholder.textContent = "Hiba a linkek betöltésekor.";
    return;
  }
  linkListContainer.innerHTML = '';

  if (!links || links.length === 0) {
      const noLinksMessage = document.createElement('div');
      noLinksMessage.className = 'loading-placeholder';
      noLinksMessage.textContent = 'Nincsenek megjeleníthető linkek.';
      linkListContainer.appendChild(noLinksMessage);
      return;
  }

  if (linksLoadingPlaceholder) linksLoadingPlaceholder.remove();

  links.forEach(link => {
    const cardLink = document.createElement('a');
    cardLink.href = link.url;
    cardLink.classList.add('link-card');
    cardLink.target = '_blank';
    cardLink.rel = 'noopener noreferrer';

    if (link.badgeText) {
        const badge = document.createElement('div');
        badge.className = 'card-badge';
        if (link.badgeType === 'new') {
            badge.classList.add('new');
        }
        badge.textContent = link.badgeText;
        cardLink.appendChild(badge);
    }
    
    const logoContainer = document.createElement('div');
    logoContainer.className = 'link-card-logo-container';

    const logoImg = document.createElement('img');
    logoImg.src = link.logo;
    logoImg.alt = `${link.title} logo`;
    logoImg.className = 'link-card-logo';

    // Inline stílusok alkalmazása a logó méretéhez és felső margójához
    if (link.logoWidth) {
        logoImg.style.width = link.logoWidth;
    }
    if (link.logoMaxHeight) {
        logoImg.style.maxHeight = link.logoMaxHeight;
    }
    if (link.logoMarginTop) { // ÚJ: Felső margó alkalmazása
        logoImg.style.marginTop = link.logoMarginTop;
    }

    logoImg.onerror = () => { 
        console.warn(`Nem sikerült betölteni a logót: ${link.logo} (${link.title})`);
        logoImg.alt = `${link.title} logó nem elérhető`; 
    };
    logoContainer.appendChild(logoImg);
    cardLink.appendChild(logoContainer);

    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'link-card-description';
    descriptionElement.innerHTML = link.description;
    cardLink.appendChild(descriptionElement);

    linkListContainer.appendChild(cardLink);
  });
}

// --- Inicializálás ---
document.addEventListener('DOMContentLoaded', () => {
    if (linkListContainer) {
        renderLinks(); 
    } else {
        console.error("A 'link-list-container' elem nem található a DOM-ban. Az inicializálás leáll.");
        if(linksLoadingPlaceholder) linksLoadingPlaceholder.textContent = "Hiba: Az oldal struktúrája nem megfelelő.";
    }
});
