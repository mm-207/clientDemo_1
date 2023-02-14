const languages = [{ no: "Norsk" }, { en: "English" }];
const Dictionary = (await import("./languages.json", {assert:{type:"json"}}))["default"];


// Dette definerer hvilke språk som brukes
// kan byttes med funkjsonen setLanguage.
let language = "no";

// Dette er alle elementen vi har oversatt så langt sortert på attribut
// Bruker set for å ungå duplikater.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
let elementsAndAttr = new Set();

// Funksjonen som faktisk oversetter. 
function translate(translateElements, attributeToSet) {
    // Vi lagrer det som skal oversettes i tilfellet språket endrer seg senere
    elementsAndAttr.push({attr:attributeToSet, elements:translateElements})
    // iterer over alle elementen og oversetter dem en etter en.
    for (const element of translateElements) {
        /// TODO: need to remove getAttribute call
        // Her bruker vi det at man kan slå opp i et JS objekt på dot notasjon eller
        // via navn.
        element[attributeToSet] = Dictionary[language][element.getAttribute("data-language-key")]
    }
}

// Endre språket
function setLanguage(lan){
    language = lan

    // Sender oversettelse beskjed til alle elementen vi allerede har oversatt.
    for ( let pair of elementsAndAttr){
        translateElements(pair.elements, pair.attr);
    }

}

export {translate as default, setLanguage};
