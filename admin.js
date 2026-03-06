console.log("js verze 28.0");
/* procentuální sleva u akční ceny */
if (location.href.includes("/admin/ceny/")) {
    document.querySelectorAll('input[name^="actionPrice["]').forEach((actionInput) => {
        const row = actionInput.closest("tr");
        if (!row) return;
        const match = actionInput.name.match(/\[(\d+)\]/);
        if (!match) return;
        const id = match[1];
        const standardInput = row.querySelector(`input[name="standardPrice[${id}]"]`);
        if (!standardInput) return;

        // --- Vytvoření inputu pro SLEVU ---
        const percentInput = document.createElement("input");
        percentInput.type = "text";
        percentInput.className = "numberField xs";
        percentInput.style.marginLeft = "6px";
        percentInput.style.background = "#fff3a3"; // žluté pozadí
        percentInput.placeholder = "% sleva";

        // --- Funkce: spočítat SLEVU podle ceny ---
        const updatePercent = () => {
            const actionPrice = parseFloat(actionInput.value);
            const standardPrice = parseFloat(standardInput.value);

            if (!standardPrice || isNaN(actionPrice)) {
                percentInput.value = "";
                return;
            }

            const discount = 100 - (actionPrice / standardPrice) * 100;
            percentInput.value = Math.floor(discount) + "%";
        };

        // --- Funkce: spočítat ACTION PRICE podle zadané slevy ---
        const updateActionPrice = () => {
            let raw = percentInput.value.replace("%", "").trim();
            const discount = parseFloat(raw);

            const standardPrice = parseFloat(standardInput.value);
            if (isNaN(discount) || !standardPrice) return;

            const newActionPrice = Math.floor(standardPrice * (1 - discount / 100));
            actionInput.value = newActionPrice;

            updatePercent();
        };

        // První výpočet
        updatePercent();

        // Live přepočty
        actionInput.addEventListener("blur", updatePercent);
        standardInput.addEventListener("blur", updatePercent);
        percentInput.addEventListener("blur", updateActionPrice);

        // Umístíme do stránky
        actionInput.parentElement.appendChild(percentInput);
    });
}

/* END procentuální sleva u akční ceny END */
/* vždy zobrazit přehled u objednávek a produktů */

const anchors = ["a.navigation__link.navigation__link--123", "a.navigation__link.navigation__link--155"];

anchors.forEach((anchorSelector) => {
    const anchor = document.querySelector(anchorSelector);

    if (anchor) {
        // Najdi rodičovský <li> prvek
        const liElement = anchor.closest("li");

        if (liElement) {
            // Zkopíruj <li> prvek
            const liClone = liElement.cloneNode(true);

            // Vytvoř nový <ul> prvek
            const newUl = document.createElement("ul");

            // Nastav styl display: block !important
            newUl.style.setProperty("display", "block", "important");

            // Vlož zkopírovaný <li> do nového <ul>
            newUl.appendChild(liClone);

            // Najdi rodičovský <ul> prvek, do kterého se původně <li> nacházel
            const ulElement = liElement.closest("ul");

            if (ulElement) {
                // Vlož nový <ul> za původní <ul>;
                ulElement.parentNode.insertBefore(newUl, ulElement.nextSibling);
            } else {
                console.error("Rodičovský <ul> nenalezen.");
            }
        } else {
            console.error("Rodičovský <li> nenalezen.");
        }
    } else {
        console.error(`<a> s třídou ${anchorSelector} nenalezen.`);
    }
});

/* END vždy zobrazit přehled u objednávek a produktů END */
/* označení více jak 1 ks v objednávce */

if (location.href.includes("/admin/prehled-objednavek/")) {
    setInterval(function () {
        var cells = document.querySelectorAll(".table__cell--number");
        cells.forEach(function (cell) {
            if (cell.innerText.trim() != "1 ks" && cell.innerText.trim() != "Množství" && cell.innerText.trim() != "") {
                cell.style.backgroundColor = "#FFFF0040";
            }
        });
    }, 500);
}

/* END označení více jak 1 ks v objednávce END */
/* Kontrola Dobírek a přehození do vyřizuje se */

if (location.href.includes("/admin/prehled-objednavek/")) {
    var dropdownList = document.querySelectorAll("ul.dropdown-ready li");
    if (dropdownList[7].classList.contains("active")) {
        var divSelectElement = document.querySelectorAll("td div.v2FormField__select");
        if (divSelectElement.length > 0) {
            var tbody = document.querySelector("tbody");
            var trs = tbody.querySelectorAll("tr");
            var trsCount = trs.length;
            for (var i = 0; i < trsCount; i++) {
                var v2inlines = trs[i].querySelectorAll("div.v2inline.v2inline--justifyBetween");
                var spanElement = v2inlines[1].querySelector("span");
                if (spanElement && spanElement.textContent.trim() === "Dobírkou") {
                    var selectElement = divSelectElement[i].querySelector("select");
                    selectElement.value = "-2";
                    selectElement.style.backgroundColor = "#55995555";
                }
            }
        }
    }

    /* END Kontrola Dobírek a přehození do vyřizuje se END */
    /* Zaplaceno přehodit do Vyřizuje se */

    var dropdownList = document.querySelectorAll("ul.dropdown-ready li");
    if (dropdownList[6].classList.contains("active")) {
        var divSelectElement = document.querySelectorAll("td div.v2FormField__select");
        if (divSelectElement.length > 0) {
            var tbody = document.querySelector("tbody");
            var trs = tbody.querySelectorAll("tr");
            var trsCount = trs.length;
            for (var i = 0; i < trsCount; i++) {
                var selectElement = divSelectElement[i].querySelector("select");
                if (selectElement) selectElement.value = "-2";
                if (selectElement) selectElement.style.backgroundColor = "#55995555";
            }
        }
    }

    /* END Zaplaceno přehodit do Vyřizuje se END */
    /* Kontrola osobní odběr ve vyřizuje se a přehození do osobní odběr */

    var dropdownList = document.querySelectorAll("ul.dropdown-ready li");

    if (dropdownList[5].classList.contains("active")) {
        var divSelectElement = document.querySelectorAll("td div.v2FormField__select");
        if (divSelectElement.length > 0) {
            var tbody = document.querySelector("tbody");
            var trs = tbody.querySelectorAll("tr");
            var trsCount = trs.length;
            for (var i = 0; i < trsCount; i++) {
                var v2inlines = trs[i].querySelectorAll("div.v2inline.v2inline--justifyBetween");
                var spanElement = v2inlines[0].querySelector("span");
                if (spanElement && spanElement.textContent.trim() === "Osobní odběr / digitální produkty") {
                    var selectElement = divSelectElement[i].querySelector("select");
                    if (selectElement) selectElement.value = "30";
                    if (selectElement) selectElement.style.backgroundColor = "#ffff0040";
                }
            }
        }
    }

    /* END Kontrola osobní odběr ve vyřizuje se a přehození do osobní odběr END */
    /* Kontrola osobní odběr v nevyřizenýcha přehození do vyřizuje se */

    if (dropdownList[7].classList.contains("active")) {
        var divSelectElement = document.querySelectorAll("td div.v2FormField__select");
        if (divSelectElement.length > 0) {
            var tbody = document.querySelector("tbody");
            var trs = tbody.querySelectorAll("tr");
            var trsCount = trs.length;
            for (var i = 0; i < trsCount; i++) {
                var v2inlines = trs[i].querySelectorAll("div.v2inline.v2inline--justifyBetween");
                var spanElement = v2inlines[0].querySelector("span");
                var spanElementPay = v2inlines[1].querySelector("span");
                if (
                    spanElementPay &&
                    spanElementPay.textContent.trim() === "Hotově / kartou" &&
                    spanElement &&
                    spanElement.textContent.trim() === "Osobní odběr / digitální produkty"
                ) {
                    var selectElement = divSelectElement[i].querySelector("select");
                    if (selectElement) selectElement.value = "-2";
                    if (selectElement) selectElement.style.backgroundColor = "#55995555";
                }
            }
        }
    }
}

/* END Kontrola osobní odběr v nevyřizenýcha přehození do vyřizuje se END */
/* počet dnů u datumu */

if (location.href.includes("/admin/prehled-objednavek/")) {
    var spans = document.querySelectorAll("span.grey.nowrap");
    if (spans.length > 0) {
        var currentDate = new Date();
        spans.forEach(function (span, index) {
            var dateString = span.textContent.trim();
            var dateParts = dateString.split(" ")[0].split(".");
            var timeParts = dateString.split(" ")[1].split(":");
            var dateObject = new Date(
                parseInt(dateParts[2]),
                parseInt(dateParts[1]) - 1,
                parseInt(dateParts[0]),
                parseInt(timeParts[0]),
                parseInt(timeParts[1])
            );
            var timeDiff = currentDate - dateObject;
            var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) - 1;
            const parentTr = span.closest("tr");
            const selectField1 = parentTr.querySelector('[data-testid="orderCode"]');
            if (selectField1.nextSibling) {
                let newSpan = document.createElement("span");
                newSpan.textContent += "\u00A0(" + daysDiff + ")\u00A0";
                selectField1.parentNode.insertBefore(newSpan, selectField1.nextSibling);

                var dropdownList = document.querySelectorAll("ul.dropdown-ready li");

                /* nevyřízeno */

                if (dropdownList[7].classList.contains("active")) {
                    if (daysDiff >= 5) {
                        newSpan.style.backgroundColor = "#cf000363";
                        newSpan.style.borderRadius = "10px";

                        /* přesunout dlouho nezaplacené objednávky do "Stále nezaplacené" */

                        var divSelectElement = document.querySelectorAll("td div.v2FormField__select");
                        var selectElement = divSelectElement[index].querySelector("select");
                        if (selectElement) selectElement.value = "39";
                        if (selectElement) selectElement.style.backgroundColor = "#55995555";

                        /* END přesunout dlouho nezaplacené objednávky do "Stále nezaplacené" END */
                        /* END nevyřízeno END */
                    }
                }
                if (dropdownList[4].classList.contains("active")) {
                    /* osobní odběr */
                    if (daysDiff >= 7) {
                        newSpan.style.backgroundColor = "#cf000363";
                        newSpan.style.borderRadius = "10px";
                    }
                }
                if (dropdownList[3].classList.contains("active")) {
                    /* odesláno */

                    var previousMonth = currentDate.getMonth() - 1;
                    var previousMonthYear = currentDate.getFullYear();
                    if (previousMonth < 0) {
                        previousMonth = 11;
                        previousMonthYear -= 1;
                    }
                    var elementDobírky = document.querySelector(
                        `tr:nth-child(${index + 1}) td:nth-child(5) div.v2inline.v2inline--justifyBetween span`
                    );
                    if (elementDobírky && elementDobírky.textContent.trim() === "Dobírkou") {
                        if (dateObject.getMonth() === previousMonth && dateObject.getFullYear() === previousMonthYear) {
                            newSpan.style.backgroundColor = "#0000ff66";
                            newSpan.style.borderRadius = "10px";
                        }
                    }
                }
            }
        });
    }
}

/* END počet dnů u datumu END */
/* přepínání tabování mezi sloupci a řádky - další tlačítko u "uložit" */

if (document.querySelector("tbody")) {
    let tabindexEnabled = localStorage.getItem("tabindexEnabled") === "true";

    if (tabindexEnabled) {
        applyTabindex();
    } else {
        removeTabindex();
    }

    if (location.href.includes("/admin/produkty/")) {
        const toggleButtonElement = document.querySelector(".content-buttons");
        const buttonSpan = document.createElement("span");
        const buttonA = document.createElement("a");
        buttonA.id = "toggleTabindex";
        buttonA.className = "btn btn-sm btn-primary";
        buttonA.textContent = "column tab";
        buttonA.title = "tabování po sloupcích";

        if (tabindexEnabled) buttonA.style.backgroundColor = "#14b1ef";
        else buttonA.style.backgroundColor = "#00000055";

        buttonSpan.appendChild(buttonA);
        toggleButtonElement.insertBefore(buttonSpan, toggleButtonElement.firstChild);

        buttonA.addEventListener("click", () => {
            if (tabindexEnabled) {
                removeTabindex();
                buttonA.style.backgroundColor = "#00000055";
            } else {
                applyTabindex();
                buttonA.style.backgroundColor = "#14b1ef";
            }
            tabindexEnabled = !tabindexEnabled;
            localStorage.setItem("tabindexEnabled", tabindexEnabled);
        });
    }
}
function applyTabindex() {
    document.querySelectorAll("tbody").forEach((tbody) => {
        const rows = Array.from(tbody.querySelectorAll("tr"));
        if (!rows.length) return;

        const colsCount = rows[0].querySelectorAll("td").length;
        let tabIndex = 1;

        for (let col = 0; col < colsCount; col++) {
            const cells = rows.map((row) => row.querySelectorAll("td")[col]).filter(Boolean);

            // zjistíme maximální počet inputů v buňkách sloupce
            const maxInputs = Math.max(...cells.map((cell) => cell.querySelectorAll("input, select, a").length));

            // PRVNÍ inputy, DRUHÉ inputy, TŘETÍ inputy...
            for (let inputIndex = 0; inputIndex < maxInputs; inputIndex++) {
                cells.forEach((cell) => {
                    const inputs = cell.querySelectorAll("input, select, a");
                    const input = inputs[inputIndex];
                    if (!input) return;

                    input.setAttribute("tabindex", tabIndex++);
                });
            }
        }
    });
}

function removeTabindex() {
    document.querySelectorAll("tbody").forEach((tbody) => {
        tbody.querySelectorAll("input, select, a").forEach((input) => {
            input.removeAttribute("tabindex");
        });
    });
}

/* END přepínání tabování mezi sloupci a řádky - další tlačítko u "uložit" END */
/* zvýraznění přehazování objednávek do odesláno */

if (location.href.includes("/admin/prehled-objednavek/")) {
    var dropdownLists = document.querySelectorAll("ul.dropdown-ready li");
    if (dropdownLists[5].classList.contains("active")) {
        var originalButton1 = document.querySelectorAll('a[data-custom-action="openCreateAndPrintShipmentsModal"]')[1];
        if (originalButton1) {
            if (originalButton1) {
                // && originalButton.textContent.includes("Tisknout štítky (Balíky)"))
                originalButton1.style.backgroundColor = "#55995555";
                var newButtonTisk = document.createElement("button");
                newButtonTisk.className = "btn btn-sm btn-secondary";
                newButtonTisk.style.backgroundColor = "#55995555";
                newButtonTisk.innerText = "Tisk";
                newButtonTisk.addEventListener("click", function (event) {
                    originalButton1.click();
                });
                var dropdownMenu = document.querySelector(".massAction");
                dropdownMenu.appendChild(newButtonTisk);
            }
        }
        var originalButton2 = document.querySelector('a[rel="massStatusChange|2"]');
        if (originalButton2) {
            var parentSpan = originalButton2
                .closest(".massAction__submenuTrigger")
                .querySelector(".massAction__submenuHeader");
            originalButton2.style.backgroundColor = "#55995555";
            if (
                originalButton2 &&
                originalButton2.textContent.includes("Odeslaná") &&
                parentSpan &&
                parentSpan.textContent.includes("Stav")
            ) {
                var newButtonOdeslana = document.createElement("button");
                newButtonOdeslana.className = "btn btn-sm btn-secondary";
                newButtonOdeslana.style.backgroundColor = "#55995555";
                newButtonOdeslana.innerText = "Odeslaná";
                newButtonOdeslana.addEventListener("click", function (event) {
                    originalButton2.click();
                });
                var dropdownMenu = document.querySelector(".massAction");
                dropdownMenu.appendChild(newButtonOdeslana);
            }
        }
    }
    var dropdownLists = document.querySelectorAll("ul.dropdown-ready li");
    if (dropdownLists[4].classList.contains("active")) {
        if (document.querySelector('a[rel="massStatusChange|-3"]')) {
            var originalButton = document.querySelector('a[rel="massStatusChange|-3"]');
            var parentSpan = originalButton
                .closest(".massAction__submenuTrigger")
                .querySelector(".massAction__submenuHeader");

            originalButton.style.backgroundColor = "#55995555";

            if (
                originalButton &&
                originalButton.textContent.includes("Vyřízena") &&
                parentSpan &&
                parentSpan.textContent.includes("Stav")
            ) {
                var newButtonVyrizena = document.createElement("button");
                newButtonVyrizena.className = "btn btn-sm btn-secondary";
                newButtonVyrizena.style.marginBottom = "10px";
                newButtonVyrizena.style.backgroundColor = "#55995555";
                newButtonVyrizena.innerText = "Vyřízena";

                newButtonVyrizena.addEventListener("click", function (event) {
                    originalButton.click();
                });

                var dropdownMenu = document.querySelector(".massAction");
                dropdownMenu.appendChild(newButtonVyrizena);
            }
        }
    }
}

/* END zvýraznění přehazování objednávek do odesláno END */
/* odesílání digitálních produktů */

const linksMap = {
    "Digitální diář Minimalistický": "https://drive.google.com/drive/folders/18elDfL7V4Hgvt5HTH-G_BGOFT4TuiT1u?usp=drive_link",
    "Digitální receptář": "https://drive.google.com/drive/folders/1MUMi6lWqA01v33kyQEoPoocUqrNr1lTV?usp=drive_link",
    "Digitální rozvrh hodin Duha": "https://drive.google.com/drive/folders/1IlaJqqWpBZN13t2q7b5gY7AHZIx8txcE?usp=drive_link",
    "Digitální rozvrh hodin Kaktus": "https://drive.google.com/drive/folders/1qcgNHYLtZvhsPBGtb1Sne-xZu32DIUnJ?usp=drive_link",
    "Digitální rozvrh hodin Květiny": "https://drive.google.com/drive/folders/1v5o6wxjQJ9RZyFEFEgWjKt6uptyz8Dru?usp=drive_link",
    "Digitální rozvrh hodin Monstera": "https://drive.google.com/drive/folders/1ZqwU1kP0G-OO0gha5pvgVYlWUTlXD2ll?usp=drive_link",
    "Digitální rozvrh hodin Slunečnice": "https://drive.google.com/drive/folders/11XtYeJwgHMdopmXMsiD06VRjjWm1zXoY?usp=drive_link",
    "Digitální rozvrh hodin Škola": "https://drive.google.com/drive/folders/1aElcvdPNkDD_-H2inaGFe1b5U7yhfoTx?usp=drive_link",
    "Digitální rozvrh hodin Tele": "https://drive.google.com/drive/folders/1MNh2NykVGizi3f-xjZiyn1TDnVPBQ9n_?usp=drive_link",
    "Horizontální rozložení k tisku": "https://drive.google.com/drive/folders/1wYMtesWBmodS15E2CQEhGSb6BoXo2GVA?usp=drive_link",
    "Kalendářní rozložení k tisku": "https://drive.google.com/drive/folders/12_zaD2pDV7YQ_0KseiZQ9OI5ko9SXEg_?usp=drive_link",
    "Knihy k tisku": "https://drive.google.com/drive/folders/1os7eRw-7W6DiLt8kiXl_SM7Mi1OQoc-P?usp=drive_link",
    "Mapa k tisku": "https://drive.google.com/drive/folders/1_5QYGX-rpPBGntEYvzZt_aRFUYS_1rzV?usp=drive_link",
    "Narozeniny k tisku": "https://drive.google.com/drive/folders/1dvdWbprTO-Xf0XNVY-XdQmmazqzirjcW?usp=drive_link",
    "Organizace + sloupce k tisku": "https://drive.google.com/drive/folders/1QgOwkj54CV6Ty4-pDVUCqgf4xKnKUvxw?usp=drive_link",
    "Random rozložení k tisku": "https://drive.google.com/drive/folders/1XM1-7FhrlrFl3eMfUmVsJyS1Krzu1kc_?usp=drive_link",
    "Rozdělovač hory k tisku": "https://drive.google.com/drive/folders/1BzQzRaTqZTLrF5euoh2x3NU3HZFupQtK?usp=drive_link",
    "Řádky + poznámky k tisku": "https://drive.google.com/drive/folders/14qRfY6Tpl1qbkVK_K6M3299xTVqqsizi?usp=drive_link",
    "Řádky + prázdná strana k tisku": "https://drive.google.com/drive/folders/1QUVv0DvgmSNMy8Lq82EFq_K4I76lmrZg?usp=drive_link",
    "Řádky k tisku": "https://drive.google.com/drive/folders/1PhWzIH-7NBVM3W4ZMzYAqze90CEGp1jl?usp=drive_link",
    "Sloupce + hodiny k tisku": "https://drive.google.com/drive/folders/1_zVqtnUH2TN4U111km-CPJLCwSxFZlUK?usp=drive_link",
    "Spoření k tisku": "https://drive.google.com/drive/folders/1W2LwjgsSqy88jDmHq6CI4pX3EZhxFS2O?usp=drive_link",
    "Učitelský zápisník - PDF k tisku": "https://drive.google.com/drive/folders/1nM7_M6WufM9EzWHLBS8NHRFwbzbqQVwG?usp=drive_link",
    "Zápisník asistenta pedagoga - PDF k tisku": "https://drive.google.com/drive/folders/1BkOOukxKUVjmZQeaxk-NXTi35bXfiObl?usp=drive_link",
    "Zápisník pro Mateřské školy - PDF k tisku": "https://drive.google.com/drive/folders/17rPMDxw9C1l6tZ9UoJyjPM_EfuxAV09A?usp=drive_link",
    "Černobílý Neobyčejný diář 2026 k tisku": "https://drive.google.com/file/d/1POZ0u77yInIx-25PVUR97pe5q6vcvDiJ/view?usp=drive_link",
    "Barevný Neobyčejný diář 2026 k tisku": "https://drive.google.com/file/d/1X80YnEMOj9vPN_28tgP8Bxkka3P86Vx9/view?usp=sharing",
};
if (location.href.includes("/admin/objednavky-detail")) {
    document.addEventListener("click", function (event) {
        // Zkontrolujeme, zda kliknutí bylo na odkaz uvnitř elementu s třídou 'open-modal'
        if (event.target.closest(".open-modal a")) {
            setTimeout(function () {
                let inputElement = document.querySelector('input[value="Artýrium 📚 PDF soubory"]');
                if (inputElement) {
                    var iframe = document.getElementById("description_ifr");

                    if (iframe && iframe.contentDocument) {
                        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

                        if (iframeDocument.readyState === "complete") {
                            var links = iframeDocument.body.getElementsByTagName("a");
                            var replacementHTML = "";
                            for (var i = 0; i < links.length; i++) {
                                for (const [text, url] of Object.entries(linksMap)) {
                                    if (links[i].textContent.includes(text)) {
                                        replacementHTML += `<a href="${url}">${text}</a><br>`;
                                    }
                                }
                            }
                            var paragraphsForZde = iframeDocument.body.getElementsByTagName("p");
                            for (var j = 0; j < paragraphsForZde.length; j++) {
                                var p = paragraphsForZde[j];
                                if (p.textContent.includes("CHYBA")) {
                                    if (replacementHTML != "") {
                                        p.innerHTML = replacementHTML;
                                    }
                                    if (replacementHTML == "") {
                                        replacementHTML =
                                            "<p style='color: red'>V objednávce není žádný digitální produkt!</p>";
                                        p.innerHTML = replacementHTML;
                                    }
                                }
                                if (p.textContent.includes("SMAZAT")) {
                                    while (p.nextSibling) {
                                        p.parentNode.removeChild(p.nextSibling);
                                    }
                                    p.parentNode.removeChild(p);
                                    break;
                                }
                            }
                        }
                    }
                }
            }, 1000);
        }
    });
}

/* END odesílání digitálních produktů END */
/* kontrola custom produktu a odeslání do google sheet */

function poslatObjednavku(datum, jmeno) {
    fetch(
        "https://script.google.com/macros/s/AKfycbzOm1laILFgGBR_q1WH0q-wIo6zyja8L_Waw2OvFLvhstb7Ur-37Am9yvGPSNdvXxBs/exec",
        {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ datum, jmeno }),
            headers: { "Content-Type": "application/json" },
        }
    ).then((response) => console.log("Objednávka odeslána"));
}
if (window.location.href === "https://www.artyrium.cz/admin/pokladna/univerzalni-produkt/") {
    const productActionButton = document.querySelector(".btn.btn-lg.btn-action.product-action");
    if (productActionButton) {
        productActionButton.addEventListener("click", () => {
            const now = new Date();
            const formattedDate = now.toLocaleString("cs-CZ");
            const input = document.getElementById("cash-desk-hollow-product-name");
            const inputValue = input ? input.value : "Název neznámý";
            poslatObjednavku(formattedDate, inputValue);
        });
    }
}

/* END kontrola custom produktu a odeslání do google sheet END */
/* zobrazení icon pro mobil */

function applyHeaderLinkPadding() {
    const links = document.querySelectorAll("a.headerNavigation__link");

    if (window.innerWidth < 500) {
        links.forEach((link) => {
            link.style.padding = "0 5px";
        });
    } else {
        links.forEach((link) => {
            link.style.padding = "";
        });
    }
}
// při načtení
applyHeaderLinkPadding();
// při změně velikosti
window.addEventListener("resize", applyHeaderLinkPadding);

/* END zobrazení icon pro mobil END */
/* vytvořit kalendář */

const numberLiKalendar = document.createElement("li");
numberLiKalendar.className = "headerNavigation__link";
if (window.innerWidth < 500) {
    numberLiKalendar.style.padding = "0 5px";
} else {
    numberLiKalendar.style.padding = "0 12px";
}
const buttonKalendar = document.createElement("button");
buttonKalendar.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       width="20" height="20" viewBox="0 0 24 24" 
       fill="none" stroke="currentColor" 
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
`;
buttonKalendar.setAttribute("aria-label", "Kalendář");

buttonKalendar.style.display = "block";
buttonKalendar.style.zIndex = "10000";
buttonKalendar.style.cursor = "pointer";
buttonKalendar.style.background = "none";
buttonKalendar.style.border = "none";
buttonKalendar.style.color = "white";
numberLiKalendar.appendChild(buttonKalendar);

const targetElementProKalendar = document.querySelector(".headerNavigation__item.headerNavigation__item--university");
if (targetElementProKalendar) {
    targetElementProKalendar.parentNode.insertBefore(numberLiKalendar, targetElementProKalendar);
}
// Funkce pro přidání obsahu kalendáře
let calendarVisible = false; // Stav, zda je kalendář zobrazen

function loadCalendar() {
    const existingCalendar = document.getElementById("calendar-container");
    if (existingCalendar) {
        // Pokud kalendář již existuje, skryjeme ho
        existingCalendar.style.display = calendarVisible ? "none" : "block";
        calendarVisible = !calendarVisible;
        return;
    }

    // Vytvoření kontejneru pro celý kalendář
    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendar-container";
    calendarContainer.style.zIndex = "9999"; // Vertikální střed
    calendarContainer.style.position = "absolute"; // Vertikální střed
    calendarContainer.style.top = "50%"; // Vertikální střed
    calendarContainer.style.left = "50%"; // Horizontální střed
    calendarContainer.style.transform = "translate(-50%, -50%)";
    calendarContainer.style.maxWidth = "800px"; // Maximální šířka kalendáře
    calendarContainer.style.margin = "auto"; // Zarovnání na střed
    calendarContainer.style.padding = "20px";
    calendarContainer.style.border = "2px solid #ccc"; // Rámeček kolem kalendáře
    calendarContainer.style.borderRadius = "10px"; // Zaoblení rohů
    calendarContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    calendarContainer.style.textAlign = "center";
    calendarContainer.style.backgroundColor = "white"; // Horizontální střed
    document.body.appendChild(calendarContainer);

    // Vytvoření hlavičky a stylování
    const h1 = document.createElement("h1");
    h1.id = "date";
    calendarContainer.appendChild(h1);

    // Vytvoření kontejneru pro události
    const eventContainer = document.createElement("div");
    eventContainer.id = "event-container";
    calendarContainer.appendChild(eventContainer);

    // Funkce pro převod formátu "DD.MM.YYYY" na Date v UTC bez hodin
    function parseDate(dateStr) {
        let parts = dateStr.trim().split(".");
        if (parts.length === 3) {
            let date = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
            return date;
        }
        return null;
    }

    // Funkce pro výpočet počtu uplynulých dní a celkového počtu dní (bez času)
    function getDaysProgress(startDate, endDate, currentDate) {
        const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        const elapsedDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        return {
            progress: Math.min(elapsedDays / totalDays, 1),
            totalDays: totalDays,
            elapsedDays: elapsedDays,
        };
    }

    // Dnešní datum
    let today = new Date();
    let formattedToday = today.toLocaleDateString("cs-CZ");
    document.getElementById("date").textContent = formattedToday;

    // Funkce pro výběr barvy progress baru podle typu akce
    function getProgressBarColor(eventName) {
        if (eventName.includes("Ilustrace")) {
            return "#FF634755";
        } else if (eventName.includes("Produkty příprava")) {
            return "#1E90FF55";
        } else if (eventName.includes("Reklama příprava")) {
            return "#32CD3255";
        } else {
            return "#4CAF5055";
        }
    }

    // Načítání dat z CSV
    fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpcLfA-b_8s1xUDwu9SVElVqbgf0xPtYBDBz-w3XeAG29UavKuBUXyPVRY2jFgoGrXhWgtAbqPSBeT/pub?gid=1964521897&single=true&output=csv"
    )
        .then((response) => response.text())
        .then((csv) => {
            let rows = csv.split("\n");
            let events = [];

            for (let i = 4; i < 34 && i < rows.length; i++) {
                let cols = rows[i].split(",").map((col) => col.trim());
                if (cols.length >= 6) {
                    let date1 = parseDate(cols[0]);
                    let date2 = parseDate(cols[1]);
                    let date3 = parseDate(cols[2]);
                    let date4 = parseDate(cols[3]);
                    let date5 = parseDate(cols[4]);
                    let eventName = cols[5];

                    if (date1 && date2 && date3 && date4 && date5) {
                        let eventProgress;
                        if (date1 <= today && today < date2) {
                            eventProgress = getDaysProgress(date1, date2, today);
                            events.push({ name: `Ilustrace - ${eventName}`, progress: eventProgress });
                        } else if (date2 <= today && today < date3) {
                            eventProgress = getDaysProgress(date2, date3, today);
                            events.push({ name: `Produkty příprava - ${eventName}`, progress: eventProgress });
                        } else if (date3 <= today && today < date4) {
                            eventProgress = getDaysProgress(date3, date4, today);
                            events.push({ name: `Reklama příprava - ${eventName}`, progress: eventProgress });
                        } else if (today === date5) {
                            eventProgress = getDaysProgress(date5, date5, today);
                            events.push({ name: `${eventName}`, progress: eventProgress });
                        }
                    }
                }
            }

            // Zobrazování akcí
            if (events.length > 0) {
                events.forEach((event) => {
                    let eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    eventDiv.style.backgroundColor = "#f0f0f0";
                    eventDiv.style.border = "1px solid #ccc";
                    //eventDiv.style.margin = "auto";
                    eventDiv.style.padding = "10px";
                    eventDiv.style.width = "80%";
                    eventDiv.style.margin = "5px auto 5px auto";
                    eventDiv.style.textAlign = "left";
                    eventDiv.style.borderRadius = "5px";
                    eventDiv.style.display = "flex";
                    eventDiv.style.flexDirection = "column";

                    let eventHeaderDiv = document.createElement("div");
                    eventHeaderDiv.classList.add("event-header");
                    eventHeaderDiv.style.display = "flex";
                    eventHeaderDiv.style.justifyContent = "space-between";
                    eventHeaderDiv.style.alignItems = "center";

                    let eventNameDiv = document.createElement("div");
                    eventNameDiv.classList.add("event-name");
                    eventNameDiv.textContent = event.name;
                    eventNameDiv.style.textAlign = "left";
                    eventNameDiv.style.flexGrow = "1";

                    let eventProgressDiv = document.createElement("div");
                    eventProgressDiv.classList.add("event-progress");
                    eventProgressDiv.textContent = `${event.progress.elapsedDays}/${event.progress.totalDays}`;
                    eventProgressDiv.style.textAlign = "right";
                    eventProgressDiv.style.marginLeft = "20px";

                    eventHeaderDiv.appendChild(eventNameDiv);
                    eventHeaderDiv.appendChild(eventProgressDiv);

                    let progressBar = document.createElement("div");
                    progressBar.classList.add("progress-bar");
                    progressBar.style.height = "8px";
                    progressBar.style.backgroundColor = getProgressBarColor(event.name);
                    progressBar.style.borderRadius = "5px";
                    progressBar.style.width = event.progress.progress * 100 + "%";
                    progressBar.style.marginTop = "5px";

                    eventDiv.appendChild(eventHeaderDiv);
                    eventDiv.appendChild(progressBar);

                    eventContainer.appendChild(eventDiv);
                });
            } else {
                let noEventDiv = document.createElement("div");
                noEventDiv.classList.add("event");
                noEventDiv.textContent = "Dnes žádná akce";
                eventContainer.appendChild(noEventDiv);
            }
        })
        .catch((error) => {
            console.error("Chyba při načítání dat:", error);
            let eventContainer = document.getElementById("event-container");
            eventContainer.innerHTML = "";
            let errorDiv = document.createElement("div");
            errorDiv.classList.add("event");
            errorDiv.textContent = "Chyba při načítání";
            eventContainer.appendChild(errorDiv);
        });

    calendarVisible = true; // Kalendář je nyní zobrazen
}

// Akce pro tlačítko, které načte/skryje kalendář
buttonKalendar.addEventListener("click", loadCalendar);

/* END vytvořit kalendář END */

/* pokladna úprava */

function updateImageSrc() {
    var imgElements = document.querySelectorAll("img");
    imgElements.forEach((img) => {
        if (img.src.includes("/related/")) {
            img.src = img.src.replace("/related/", "/detail/");
        }
    });
}

if (location.href.includes("/admin/pokladna/")) {
    updateImageSrc();

    // Nastavení MutationObserver pro sledování změn v .cashdesk-search-result
    var observer = new MutationObserver((mutationsList) => {
        for (var mutation of mutationsList) {
            if (mutation.type === "childList") {
                updateImageSrc();
            }
        }
    });

    // Najdeme .cashdesk-search-result prvek a začneme ho sledovat
    var targetNode = document.querySelector(".cashdesk-search-result");
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    } else {
        console.warn(".cashdesk-search-result element not found.");
    }
}

/* END pokladna úprava END */
/* zobrazení skladových zásob produktů */

const csvUrl =
    "https://www.artyrium.cz/export/products.csv?patternId=11&partnerId=14&hash=fb37ca04338a033910bb58806735dfd92f8abe968e8d7c8f83c3bbc2ed58f6b2&stockState=4";
// --- 1️⃣ Vytvoření tlačítka Produkty ---
const numberLiProdukty = document.createElement("li");
numberLiProdukty.className = "headerNavigation__link";
if (window.innerWidth < 400) {
    numberLiProdukty.style.padding = "0 5px";
} else {
    numberLiProdukty.style.padding = "0 12px";
}
const buttonProdukty = document.createElement("button");
buttonProdukty.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="20" height="20" viewBox="0 0 24 24"
     fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="6" x2="21" y2="6"></line>
  <line x1="8" y1="12" x2="21" y2="12"></line>
  <line x1="8" y1="18" x2="21" y2="18"></line>
  <circle cx="4" cy="6" r="1"></circle>
  <circle cx="4" cy="12" r="1"></circle>
  <circle cx="4" cy="18" r="1"></circle>
</svg>
`;
buttonProdukty.style.display = "block";
buttonProdukty.style.zIndex = "10000";
buttonProdukty.style.cursor = "pointer";
buttonProdukty.style.background = "none";
buttonProdukty.style.border = "none";
buttonProdukty.style.color = "white";

numberLiProdukty.appendChild(buttonProdukty);

// --- 2️⃣ Vložení tlačítka vedle Kalendáře ---
if (targetElementProKalendar) {
    targetElementProKalendar.parentNode.insertBefore(numberLiProdukty, targetElementProKalendar);
}

// --- 3️⃣ Funkce pro zobrazení overlay s produkty ---
let produktyOverlayLoaded = false; // aby se data načetla jen jednou

// Funkce pro zobrazení overlay s produkty (upravená část)
async function zobrazProdukty() {
    let overlay = document.getElementById("produktyOverlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "produktyOverlay";
        Object.assign(overlay.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            height: "95vh",
            background: "rgba(250,250,250,0.97)",
            zIndex: 999999,
            overflowY: "auto",
            padding: "20px",
            fontFamily: "sans-serif",
            color: "#222",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        });
        document.body.appendChild(overlay);

        const heading = document.createElement("h2");
        heading.textContent = "Výpis produktů";
        heading.style.marginBottom = "20px";
        overlay.appendChild(heading);

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Zavřít";
        Object.assign(closeBtn.style, {
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "6px 12px",
            fontSize: "14px",
            cursor: "pointer",
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
        });
        closeBtn.onclick = () => (overlay.style.display = "none");
        overlay.appendChild(closeBtn);

        const outputDiv = document.createElement("div");
        outputDiv.id = "produktyLoading";
        outputDiv.textContent = "Načítám data...";
        overlay.appendChild(outputDiv);

        try {
            const response = await fetch(csvUrl);
            if (!response.ok) throw new Error("HTTP " + response.status);
            const text = await response.text();
            const delimiter = text.includes(";") ? ";" : ",";
            const rows = text
                .trim()
                .split("\n")
                .map((r) => r.split(delimiter));

            const categories = {};

            const headers = rows[0].map((h) => h.replace(/^"|"$/g, "").trim());

            const idxImage = headers.indexOf("image");
            const idxName = headers.indexOf("name");
            const idxCategory = headers.indexOf("defaultCategory");
            const idxStock = headers.indexOf("stock");
            const idxStockMin = headers.indexOf("stockMinSupply");
            const variantIndexes = headers.map((h, i) => (h.startsWith("variant:") ? i : -1)).filter((i) => i !== -1);

            for (let i = 1; i < rows.length; i++) {
                const cols = rows[i].map((c) => c.replace(/^"|"$/g, "").trim());
                const colC = cols[idxName];
                const colD = cols[idxCategory];
                const colE = parseFloat(cols[idxStock]?.replace(",", "."));
                const colF = parseFloat(cols[idxStockMin]?.replace(",", "."));

                if (!isNaN(colF) && !isNaN(colE) && colF > colE) {
                    const parts = colD.split(">");
                    const categoryName = parts[parts.length - 1].trim();

                    const variants = variantIndexes
                        .map((idx) => cols[idx])
                        .filter((v) => v && v !== "")
                        .join(", ");

                    const displayName = variants ? `${colC} (${variants})` : colC;

                    if (!categories[categoryName]) categories[categoryName] = [];
                    let imageUrl = cols[idxImage];

                    // úprava cesty obrázku
                    if (imageUrl && imageUrl.includes("/orig/")) {
                        imageUrl = imageUrl.replace("/orig/", "/detail/");
                    }

                    categories[categoryName].push({
                        name: displayName,
                        value: colE,
                        image: imageUrl,
                    });
                }
            }

            const container = document.createElement("div");
            container.id = "produktyContainer";
            container.style.columnCount = "auto";
            container.style.columnWidth = "260px"; // šířka sloupce
            container.style.columnGap = "20px";
            overlay.appendChild(container);

            function renderCategories() {
                container.innerHTML = "";

                const columnWidth = 260;
                const gap = 20;

                const containerWidth = container.clientWidth;
                const columnCount = Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)));

                const columnHeights = new Array(columnCount).fill(0);
                container.style.position = "relative";

                // červené kategorie první
                const sortedCategoryNames = Object.keys(categories).sort((a, b) => {
                    const ar = localStorage.getItem("cat_" + a) === "red";
                    const br = localStorage.getItem("cat_" + b) === "red";
                    return Number(br) - Number(ar);
                });

                sortedCategoryNames.forEach((cat) => {
                    const catDiv = document.createElement("div");
                    catDiv.className = "produkty-category";

                    let catState = localStorage.getItem("cat_" + cat) || "";
                    if (catState === "red") catDiv.classList.add("red");

                    const heading = document.createElement("h3");
                    heading.textContent = cat;
                    heading.onclick = () => {
                        catState = catState === "red" ? "" : "red";
                        localStorage.setItem("cat_" + cat, catState);
                        renderCategories();
                    };

                    catDiv.appendChild(heading);

                    categories[cat]
                        .sort((a, b) => a.value - b.value)
                        .forEach((item) => {
                            const row = document.createElement("div");
                            row.className = "produkty-row";

                            const states = ["", "!", "✓"];
                            let prodState = localStorage.getItem("prod_" + cat + "_" + item.name) || "";

                            if (prodState === "!") row.classList.add("state-alert");
                            if (prodState === "✓") row.classList.add("state-ok");

                            const btn = document.createElement("button");
                            btn.className = "produkty-state-btn";
                            btn.textContent = prodState;

                            btn.onclick = () => {
                                const i = states.indexOf(prodState);
                                prodState = states[(i + 1) % states.length];
                                localStorage.setItem("prod_" + cat + "_" + item.name, prodState);
                                renderCategories();
                            };

                            row.appendChild(btn);

                            if (item.image) {
                                const img = document.createElement("img");
                                img.src = item.image;
                                img.alt = item.name;
                                row.appendChild(img);
                            }

                            const link = document.createElement("a");
                            link.href =
                                "https://www.artyrium.cz/admin/vyhledavani/?string=" + encodeURIComponent(item.name);
                            link.textContent = `${item.name}: ${item.value}`;
                            link.target = "_blank";

                            row.appendChild(link);
                            catDiv.appendChild(row);
                        });

                    container.appendChild(catDiv);

                    // masonry pozice
                    const col = columnHeights.indexOf(Math.min(...columnHeights));
                    const x = col * (columnWidth + gap);
                    const y = columnHeights[col];

                    catDiv.style.transform = `translate(${x}px, ${y}px)`;
                    columnHeights[col] += catDiv.offsetHeight + gap;
                });
                container.style.height = Math.max(...columnHeights) + "px";
                const loading = document.getElementById("produktyLoading");
                if (loading) loading.style.display = "none";
            }

            renderCategories(); // první vykreslení
        } catch (err) {
            document.getElementById("produktyLoading").textContent = "Chyba při načítání CSV: " + err.message;
            console.error(err);
        }

        produktyOverlayLoaded = true;
    } else {
        overlay.style.display = "block";
    }
}

// --- 4️⃣ Kliknutí na tlačítko Produkty ---
buttonProdukty.addEventListener("click", () => {
    const overlay = document.getElementById("produktyOverlay");
    if (overlay) {
        // Pokud overlay existuje, toggle display
        overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
    } else {
        // Pokud overlay ještě neexistuje, vytvoříme jej
        zobrazProdukty();
    }
});

window.addEventListener("resize", () => {
    if (document.getElementById("produktyOverlay")) {
        renderCategories();
    }
});

/* END zobrazení skladových zásob produktů END */
/* tlačítka kopírování ve statistikách */

if (location.href.includes("/admin/statistika-produktu/")) {
    const table = document.querySelector("table.table.checkbox-table tbody");

    let globalSumNumber = 0;
    let globalSumPrice = 0;

    if (table) {
        const rows = table.querySelectorAll("tr");

        rows.forEach((row, rowIndex) => {
            const numbers = row.querySelectorAll(".table__cell--number");
            const prices = row.querySelectorAll(".table__cell--price");

            if (numbers.length >= 2 && prices.length >= 1) {
                const priceEl = prices[0]; // 1. výskyt price
                const numberEl = numbers[1]; // 2. výskyt number
                const buttonContainer = numbers[0]; // kam vložíme tlačítka

                const cleanPrice = Number(priceEl.innerText.replace(/\s/g, "").replace("Kč", "").trim());
                const cleanNumber = Number(numberEl.innerText.trim());

                // vymažeme obsah containeru
                buttonContainer.innerHTML = "";

                // tlačítko: KOPÍROVAT (reset globálního součtu)
                const copyBtn = document.createElement("button");
                copyBtn.textContent = "📋";
                copyBtn.style.marginRight = "6px";
                copyBtn.style.cursor = "pointer";

                // tlačítko: PŘIČÍST k předchozímu globálnímu součtu
                const addBtn = document.createElement("button");
                addBtn.textContent = "➕";
                addBtn.style.cursor = "pointer";

                // event: 📋 tlačítko
                copyBtn.addEventListener("click", () => {
                    globalSumPrice = cleanPrice;
                    globalSumNumber = cleanNumber;

                    const textToCopy = `${globalSumNumber}\t${globalSumPrice}`;
                    navigator.clipboard.writeText(textToCopy);

                    // vizuálně označí aktivní tlačítko
                    copyBtn.classList.add("active-btn");
                    addBtn.classList.remove("active-btn");

                    // reset ostatních řádků
                    rows.forEach((otherRow) => {
                        if (otherRow !== row) {
                            const otherButtons = otherRow.querySelectorAll("button");
                            otherButtons.forEach((btn) => btn.classList.remove("active-btn"));
                        }
                    });
                });

                // event: ➕ tlačítko
                addBtn.addEventListener("click", () => {
                    globalSumPrice += cleanPrice;
                    globalSumNumber += cleanNumber;

                    const textToCopy = `${globalSumNumber}\t${globalSumPrice}`;
                    navigator.clipboard.writeText(textToCopy);

                    // vizuálně označí samo, ostatní necháme
                    addBtn.classList.add("active-btn");
                });

                // vložíme tlačítka
                buttonContainer.appendChild(copyBtn);
                buttonContainer.appendChild(addBtn);
            }
        });
    }
}

/* END tlačítka kopírování ve statistikách END */
/* neuhrazená dobírka generování QR kódů */

if (location.href.includes("/admin/objednavky-detail")) {
    document.addEventListener("click", function (event) {
        const link = event.target.closest('a[href*="/admin/zaslat-zakaznikovi-email/"]');

        if (!link) return;

        if (!link.textContent.includes("nevyzvednutá dobírka")) return;

        console.log("Kliknuto na email 'nevyzvednutá dobírka - upozornění'");

        setTimeout(function () {
            var iframe = document.getElementById("description_ifr");

            if (!iframe) {
                console.error("iframe nenalezen");
                return;
            }

            var doc = iframe.contentDocument || iframe.contentWindow.document;

            var paragraphs = doc.getElementsByTagName("p");

            var accountRaw = null;
            var vs = null;
            var amountFromText = null;

            for (var i = 0; i < paragraphs.length; i++) {
                var p = paragraphs[i];

                if (p.innerText.includes("Číslo účtu")) {
                    console.log("Platební údaje nalezeny");

                    var accMatch = p.innerText.match(/Číslo účtu:\s*([0-9\/\-]+)/);
                    var vsMatch = p.innerText.match(/Variabilní symbol platby:\s*([0-9]+)/);
                    var amountMatch = p.innerText.match(/Částka:\s*([0-9]+)/);

                    if (accMatch) accountRaw = accMatch[1];
                    if (vsMatch) vs = vsMatch[1];
                    if (amountMatch) amountFromText = amountMatch[1];

                    break;
                }
            }

            if (!accountRaw || !vs) {
                console.error("Účet nebo VS nenalezen");
                return;
            }

            if (!amountFromText) {
                console.error("Částka nenalezena");
                return;
            }

            console.log("Účet:", accountRaw);
            console.log("VS:", vs);
            console.log("Částka z textu:", amountFromText);

            // převod na IBAN
            function accountToIBAN(account) {
                let parts = account.split("/");
                let accountNumber = parts[0];
                let bankCode = parts[1];

                let prefix = "";
                let number = accountNumber;

                if (accountNumber.includes("-")) {
                    let split = accountNumber.split("-");
                    prefix = split[0];
                    number = split[1];
                }

                prefix = prefix.padStart(6, "0");
                number = number.padStart(10, "0");

                let bban = bankCode + prefix + number;

                let country = "CZ";
                let converted = bban + country + "00";

                let numeric = converted.replace(/[A-Z]/g, function (char) {
                    return char.charCodeAt(0) - 55;
                });

                let mod = BigInt(numeric) % 97n;

                let check = (98n - mod).toString();

                if (check.length === 1) check = "0" + check;

                return country + check + bban;
            }

            var iban = accountToIBAN(accountRaw);

            console.log("Vypočtený IBAN:", iban);

            var expectedIBAN = "CZ3020100000002102759244";

            if (iban !== expectedIBAN) {
                console.error("IBAN se neshoduje!");
                console.error("Očekávaný IBAN:", expectedIBAN);
                console.error("Vypočtený IBAN:", iban);

                return;
            }

            console.log("IBAN kontrola OK");

            // QR generátor
            function generateQR(amount) {
                return "SPD*1.0*" + "ACC:" + iban + "*AM:" + amount + "*CC:CZK" + "*X-VS:" + vs + "*X-PER:7";
            }

            var qrURL1 =
                "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" +
                encodeURIComponent(generateQR(amountFromText));

            var qrURL2 =
                "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(generateQR(100));

            var qrTarget1 = doc.getElementById("QRkod1");
            var qrTarget2 = doc.getElementById("QRkod2");

            if (!qrTarget1) {
                console.error("QRkod1 nenalezen");
            }

            if (!qrTarget2) {
                console.error("QRkod2 nenalezen");
            }

            if (qrTarget1) {
                qrTarget1.innerHTML =
                    '<img src="' + qrURL1 + '" style="padding:15px;background:white;width:105px;height:105px;">';
            }

            if (qrTarget2) {
                qrTarget2.innerHTML =
                    '<img src="' + qrURL2 + '" style="padding:15px;background:white;width:105px;height:105px;">';
            }

            console.log("QR kódy vloženy");
        }, 1000);
    });
}

/* END neuhrazená dobírka generování QR kódů END */
