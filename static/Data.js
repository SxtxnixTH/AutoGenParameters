/* =========================================================
   AUTOGEN PARAMETERS - DATA.JS
   ---------------------------------------------------------
   GitHub Pages / Static Deployment
   No Flask / Python / API endpoint required.
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const themeToggleBtn =
    document.getElementById("theme-toggle");

const datetimeDisplay =
    document.getElementById("datetime-display");

const autoBtn =
    document.getElementById("autogen-btn");

const clearBtn =
    document.getElementById("clear-btn");

const result =
    document.getElementById("result");

const parameterForm =
    document.getElementById("parameter-form");


/* =========================================================
   SYSTEM DROPDOWN
========================================================= */

const dropdown =
    document.querySelector(".system-dropdown");

const selected =
    document.getElementById("dropdownSelected");

const selectedText =
    document.getElementById("selectedText");

const items =
    document.querySelectorAll(
        "#dropdownList li"
    );


/* =========================================================
   TYPE DROPDOWN
========================================================= */

const typeDropdown =
    document.getElementById("typeDropdown");

const typeDropdownSelected =
    document.getElementById(
        "typeDropdownSelected"
    );

const typeSelectedText =
    document.getElementById(
        "typeSelectedText"
    );

const typeDropdownItems =
    document.querySelectorAll(
        "#typeDropdownList li"
    );

const typeStatus =
    document.getElementById(
        "type-status"
    );


/* =========================================================
   PARAMETER INPUTS
========================================================= */

const siteCodeInput =
    document.getElementById(
        "site-code"
    );

const nodebNameInput =
    document.getElementById(
        "nodeb-name"
    );

const siteCodeStatus =
    document.getElementById(
        "site-code-status"
    );

const nodebNameStatus =
    document.getElementById(
        "nodeb-name-status"
    );

const nodebHint =
    document.getElementById(
        "nodeb-hint"
    );


/* =========================================================
   3G2100 ELEMENTS
========================================================= */

const towerTypeDropdown =
    document.getElementById(
        "towerTypeDropdown"
    );

const towerTypeDropdownSelected =
    document.getElementById(
        "towerTypeDropdownSelected"
    );

const towerTypeSelectedText =
    document.getElementById(
        "towerTypeSelectedText"
    );

const towerTypeDropdownItems =
    document.querySelectorAll(
        "#towerTypeDropdownList li"
    );

const cellIdWrapper =
    document.getElementById(
        "cellIdWrapper"
    );

const nodebIdWrapper =
    document.getElementById(
        "nodebIdWrapper"
    );

const localCellIdWrapper =
    document.getElementById(
        "localCellIdWrapper"
    );

const cellIdInput =
    document.getElementById(
        "cell-id"
    );

const nodebIdInput =
    document.getElementById(
        "nodeb-id"
    );

const localCellIdInput =
    document.getElementById(
        "local-cellid"
    );

const cellIdStatus =
    document.getElementById(
        "cell-id-status"
    );

const nodebIdStatus =
    document.getElementById(
        "nodeb-id-status"
    );

const localCellIdStatus =
    document.getElementById(
        "local-cellid-status"
    );


/* =========================================================
   SYSTEM STATE
========================================================= */

let selectedSystem = "";

let selectedType = "";

let selectedTowerType = "";


/* =========================================================
   THEME TOGGLE
========================================================= */

if (themeToggleBtn) {

    const savedTheme =
        localStorage.getItem(
            "autogen-theme"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }

    const updateThemeButton = () => {

        const isLightTheme =
            document.body.classList.contains(
                "light-theme"
            );

        themeToggleBtn.textContent =
            isLightTheme
                ? "☀️ Light"
                : "🌙 Dark";
    };

    updateThemeButton();

    themeToggleBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );

            const isLightTheme =
                document.body.classList.contains(
                    "light-theme"
                );

            localStorage.setItem(
                "autogen-theme",
                isLightTheme
                    ? "light"
                    : "dark"
            );

            updateThemeButton();
        }
    );
}


/* =========================================================
   DATE / TIME
========================================================= */

function updateDateTime() {

    if (!datetimeDisplay) {
        return;
    }

    const now = new Date();

    const date =
        now.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    const time =
        now.toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    datetimeDisplay.textContent =
        `${date} ${time}`;
}

updateDateTime();

setInterval(
    updateDateTime,
    1000
);


/* =========================================================
   CURSOR GLOW
========================================================= */

const glow =
    document.querySelector(
        ".cursor-glow"
    );

if (glow) {

    document.addEventListener(
        "mousemove",
        (e) => {

            glow.style.left =
                `${e.clientX}px`;

            glow.style.top =
                `${e.clientY}px`;
        }
    );
}


/* =========================================================
   SYSTEM DATA
========================================================= */

const systemParameters = {};


/* =========================================================
   DEFAULT SYSTEM DATA
========================================================= */

function createDefaultSystemData() {

    return {

        siteCode: "",

        nodebName: "",

        type: "",

        towerType: "",

        cellId: "",

        nodebId: "",

        localCellId: ""
    };
}


/* =========================================================
   INITIALIZE SYSTEM DATA
========================================================= */

items.forEach(
    (item) => {

        const system =
            String(
                item.dataset.value || ""
            )
                .trim()
                .toUpperCase();

        if (system) {

            systemParameters[system] =
                createDefaultSystemData();
        }
    }
);


/* =========================================================
   NODE NAME LABEL
========================================================= */

function getNodeNameLabel(system) {

    const value =
        String(system || "")
            .trim()
            .toUpperCase();

    if (value.startsWith("3G")) {
        return "NODEB NAME";
    }

    if (value.startsWith("4G")) {
        return "ENODEB NAME";
    }

    if (value.startsWith("5G")) {
        return "GNODEB NAME";
    }

    return "NODEB NAME";
}


/* =========================================================
   VALIDATION
========================================================= */

function isValidSiteCode(value) {

    return /^[A-Z0-9]{5}$/.test(
        String(value || "")
            .trim()
            .toUpperCase()
    );
}


function isValidNodebName(value) {

    const cleanValue =
        String(value || "")
            .trim()
            .toUpperCase();

    return (
        /^[A-Z0-9]{5}$/.test(
            cleanValue
        ) ||
        /^[A-Z0-9]{5}_D[1-9]$/.test(
            cleanValue
        )
    );
}


function isValidType(value) {

    return (
        value === "NODE" ||
        value === "DISTRIBUTED"
    );
}


function isValidFixedNumber(
    value,
    length
) {

    return new RegExp(
        `^[0-9]{${length}}$`
    ).test(
        String(value || "")
    );
}


/* =========================================================
   STATUS
========================================================= */

function setValidStatus(
    element,
    valid
) {

    if (!element) {
        return;
    }

    if (element === typeStatus) {

        element.classList.remove(
            "valid"
        );

        return;
    }

    element.classList.toggle(
        "valid",
        Boolean(valid)
    );
}


/* =========================================================
   AUTO TYPE
========================================================= */

function getAutoType(nodebName) {

    const value =
        String(nodebName || "")
            .trim()
            .toUpperCase();

    if (!value) {
        return "";
    }

    if (value.includes("_")) {
        return "DISTRIBUTED";
    }

    return "NODE";
}


/* =========================================================
   TYPE DISPLAY
========================================================= */

function updateTypeDisplay() {

    if (typeSelectedText) {

        typeSelectedText.textContent =
            selectedType || "TYPE";
    }

    typeDropdownItems.forEach(
        (item) => {

            item.classList.toggle(
                "selected",
                item.dataset.value ===
                    selectedType
            );
        }
    );
}


/* =========================================================
   3G2100 FIELD VISIBILITY
========================================================= */

function update3G2100Fields(system) {

    const is3G2100 =
        String(system || "")
            .trim()
            .toUpperCase() ===
        "3G2100";

    if (towerTypeDropdown) {

        towerTypeDropdown.classList.toggle(
            "hidden",
            !is3G2100
        );
    }

    if (cellIdWrapper) {

        cellIdWrapper.classList.toggle(
            "hidden",
            !is3G2100
        );
    }

    if (nodebIdWrapper) {

        nodebIdWrapper.classList.toggle(
            "hidden",
            !is3G2100
        );
    }

    if (localCellIdWrapper) {

        localCellIdWrapper.classList.toggle(
            "hidden",
            !is3G2100
        );
    }
}


/* =========================================================
   NORMALIZE NUMERIC FIELD
========================================================= */

function normalizeNumericField(
    input,
    length
) {

    if (!input) {
        return;
    }

    let value =
        String(input.value || "")
            .replace(
                /[^0-9]/g,
                ""
            )
            .slice(
                0,
                length
            );

    if (!value) {

        input.value = "";

        return;
    }

    input.value =
        value.padStart(
            length,
            "0"
        );
}


/* =========================================================
   3G2100 VALIDATION
========================================================= */

function update3G2100Validation() {

    const is3G2100 =
        String(selectedSystem || "")
            .trim()
            .toUpperCase() ===
        "3G2100";

    if (!is3G2100) {

        setValidStatus(
            cellIdStatus,
            false
        );

        setValidStatus(
            nodebIdStatus,
            false
        );

        setValidStatus(
            localCellIdStatus,
            false
        );

        return;
    }

    const cellValid =
        Boolean(cellIdInput) &&
        isValidFixedNumber(
            cellIdInput.value,
            5
        );

    const nodebIdValid =
        Boolean(nodebIdInput) &&
        isValidFixedNumber(
            nodebIdInput.value,
            4
        );

    const localCellIdValid =
        Boolean(localCellIdInput) &&
        isValidFixedNumber(
            localCellIdInput.value,
            2
        );

    setValidStatus(
        cellIdStatus,
        cellValid
    );

    setValidStatus(
        nodebIdStatus,
        nodebIdValid
    );

    setValidStatus(
        localCellIdStatus,
        localCellIdValid
    );
}


/* =========================================================
   3G2100 NUMERIC INPUT HANDLER
========================================================= */

function setupNumericField(
    input,
    length
) {

    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        () => {

            input.value =
                input.value
                    .replace(
                        /[^0-9]/g,
                        ""
                    )
                    .slice(
                        0,
                        length
                    );

            update3G2100Validation();

            saveCurrentSystem();
        }
    );


    input.addEventListener(
        "blur",
        () => {

            if (!input.value) {

                update3G2100Validation();

                saveCurrentSystem();

                return;
            }

            normalizeNumericField(
                input,
                length
            );

            update3G2100Validation();

            saveCurrentSystem();
        }
    );
}


/* =========================================================
   SETUP 3G2100 NUMERIC FIELDS
========================================================= */

setupNumericField(
    cellIdInput,
    5
);

setupNumericField(
    nodebIdInput,
    4
);

setupNumericField(
    localCellIdInput,
    2
);


/* =========================================================
   SAVE CURRENT SYSTEM
========================================================= */

function saveCurrentSystem() {

    if (!selectedSystem) {
        return;
    }

    systemParameters[
        selectedSystem
    ] = {

        siteCode:
            siteCodeInput
                ? siteCodeInput.value
                : "",

        nodebName:
            nodebNameInput
                ? nodebNameInput.value
                : "",

        type:
            selectedType || "",

        towerType:
            selectedTowerType || "",

        cellId:
            cellIdInput
                ? cellIdInput.value
                : "",

        nodebId:
            nodebIdInput
                ? nodebIdInput.value
                : "",

        localCellId:
            localCellIdInput
                ? localCellIdInput.value
                : ""
    };
}


/* =========================================================
   LOAD SYSTEM
========================================================= */

function loadSystem(system) {

    if (!parameterForm) {
        return;
    }

    const cleanSystem =
        String(system || "")
            .trim()
            .toUpperCase();

    const data =
        systemParameters[
            cleanSystem
        ] ||
        createDefaultSystemData();


    /* -----------------------------------------
       FIELD VISIBILITY
    ----------------------------------------- */

    update3G2100Fields(
        cleanSystem
    );


    /* -----------------------------------------
       NODE NAME LABEL
    ----------------------------------------- */

    if (nodebNameInput) {

        nodebNameInput.placeholder =
            getNodeNameLabel(
                cleanSystem
            );
    }


    /* -----------------------------------------
       SITE CODE
    ----------------------------------------- */

    if (siteCodeInput) {

        siteCodeInput.value =
            data.siteCode || "";
    }


    /* -----------------------------------------
       NODE NAME
    ----------------------------------------- */

    if (nodebNameInput) {

        nodebNameInput.value =
            data.nodebName || "";
    }


    /* -----------------------------------------
       TYPE
    ----------------------------------------- */

    if (data.type) {

        selectedType =
            data.type;

    } else {

        selectedType =
            getAutoType(
                data.nodebName || ""
            );
    }

    updateTypeDisplay();


    /* -----------------------------------------
       TOWER TYPE
    ----------------------------------------- */

    selectedTowerType =
        cleanSystem === "3G2100"
            ? data.towerType || ""
            : "";

    if (towerTypeSelectedText) {

        towerTypeSelectedText.textContent =
            selectedTowerType ||
            "TOWER TYPE";
    }

    towerTypeDropdownItems.forEach(
        (item) => {

            item.classList.toggle(
                "selected",
                item.dataset.value ===
                    selectedTowerType
            );
        }
    );


    /* -----------------------------------------
       CELL ID
    ----------------------------------------- */

    if (cellIdInput) {

        cellIdInput.value =
            cleanSystem === "3G2100"
                ? data.cellId || ""
                : "";
    }


    /* -----------------------------------------
       NODEB ID
    ----------------------------------------- */

    if (nodebIdInput) {

        nodebIdInput.value =
            cleanSystem === "3G2100"
                ? data.nodebId || ""
                : "";
    }


    /* -----------------------------------------
       LOCAL CELL ID
    ----------------------------------------- */

    if (localCellIdInput) {

        localCellIdInput.value =
            cleanSystem === "3G2100"
                ? data.localCellId || ""
                : "";
    }


    updateValidation();

    update3G2100Validation();
}


/* =========================================================
   UPDATE VALIDATION
========================================================= */

function updateValidation() {

    const siteValid =
        Boolean(siteCodeInput) &&
        isValidSiteCode(
            siteCodeInput.value
        );

    const nodebValid =
        Boolean(nodebNameInput) &&
        isValidNodebName(
            nodebNameInput.value
        );

    const typeValid =
        isValidType(
            selectedType
        );


    setValidStatus(
        siteCodeStatus,
        siteValid
    );

    setValidStatus(
        nodebNameStatus,
        nodebValid
    );

    setValidStatus(
        typeStatus,
        typeValid
    );


    /* -----------------------------------------
       NODE NAME HINT
    ----------------------------------------- */

    if (
        nodebHint &&
        nodebNameInput
    ) {

        const value =
            nodebNameInput.value;

        const showHint =
            /^[A-Z0-9]{5}_$/.test(
                value
            );

        nodebHint.classList.toggle(
            "hidden",
            !showHint
        );
    }
}


/* =========================================================
   SITE CODE INPUT
========================================================= */

if (siteCodeInput) {

    siteCodeInput.addEventListener(
        "input",
        () => {

            const value =
                siteCodeInput.value
                    .toUpperCase()
                    .replace(
                        /[^A-Z0-9]/g,
                        ""
                    )
                    .slice(
                        0,
                        5
                    );

            siteCodeInput.value =
                value;

            saveCurrentSystem();

            updateValidation();
        }
    );
}


/* =========================================================
   NODEB / ENODEB / GNODEB NAME INPUT
========================================================= */

if (nodebNameInput) {

    nodebNameInput.addEventListener(
        "input",
        () => {

            let value =
                nodebNameInput.value
                    .toUpperCase();


            /* -----------------------------------------
               EMPTY
            ----------------------------------------- */

            if (value.length === 0) {

                nodebNameInput.value =
                    "";

                selectedType =
                    "";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* -----------------------------------------
               FIRST 5 CHARACTERS
            ----------------------------------------- */

            const firstFive =
                value
                    .slice(
                        0,
                        5
                    )
                    .replace(
                        /[^A-Z0-9]/g,
                        ""
                    );


            if (value.length <= 5) {

                nodebNameInput.value =
                    firstFive;

                selectedType =
                    getAutoType(
                        firstFive
                    );

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* -----------------------------------------
               CHARACTER 6 MUST BE _
            ----------------------------------------- */

            if (
                value.charAt(5) !== "_"
            ) {

                nodebNameInput.value =
                    firstFive;

                selectedType =
                    getAutoType(
                        firstFive
                    );

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* -----------------------------------------
               ABC12_
            ----------------------------------------- */

            const suffix =
                value.slice(6);


            if (suffix.length === 0) {

                nodebNameInput.value =
                    firstFive +
                    "_";

                selectedType =
                    "DISTRIBUTED";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* -----------------------------------------
               CHARACTER AFTER _ MUST BE D
            ----------------------------------------- */

            if (
                suffix.charAt(0) !== "D"
            ) {

                nodebNameInput.value =
                    firstFive +
                    "_";

                selectedType =
                    "DISTRIBUTED";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* -----------------------------------------
               AFTER D MUST BE 1-9
            ----------------------------------------- */

            const number =
                suffix
                    .slice(1)
                    .replace(
                        /[^1-9]/g,
                        ""
                    )
                    .slice(
                        0,
                        1
                    );


            nodebNameInput.value =
                firstFive +
                "_D" +
                number;

            selectedType =
                "DISTRIBUTED";

            updateTypeDisplay();

            saveCurrentSystem();

            updateValidation();
        }
    );
}


/* =========================================================
   TYPE DROPDOWN OPEN / CLOSE
========================================================= */

if (
    typeDropdown &&
    typeDropdownSelected
) {

    typeDropdownSelected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );
            }

            if (towerTypeDropdown) {

                towerTypeDropdown.classList.remove(
                    "active"
                );
            }

            typeDropdown.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   TYPE OPTIONS
========================================================= */

typeDropdownItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();

                selectedType =
                    item.dataset.value ||
                    "";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                if (typeDropdown) {

                    typeDropdown.classList.remove(
                        "active"
                    );
                }
            }
        );
    }
);


/* =========================================================
   SYSTEM DROPDOWN OPEN / CLOSE
========================================================= */

if (
    selected &&
    dropdown
) {

    selected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            if (typeDropdown) {

                typeDropdown.classList.remove(
                    "active"
                );
            }

            if (towerTypeDropdown) {

                towerTypeDropdown.classList.remove(
                    "active"
                );
            }

            dropdown.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   SYSTEM OPTIONS
========================================================= */

items.forEach(
    (item) => {

        item.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();


                /* -----------------------------------------
                   SAVE PREVIOUS SYSTEM
                ----------------------------------------- */

                saveCurrentSystem();


                /* -----------------------------------------
                   REMOVE OLD SELECTION
                ----------------------------------------- */

                items.forEach(
                    (x) => {

                        x.classList.remove(
                            "selected"
                        );
                    }
                );


                /* -----------------------------------------
                   SELECT SYSTEM
                ----------------------------------------- */

                item.classList.add(
                    "selected"
                );

                selectedSystem =
                    String(
                        item.dataset.value || ""
                    )
                        .trim()
                        .toUpperCase();


                /* -----------------------------------------
                   DISPLAY SYSTEM
                ----------------------------------------- */

                if (selectedText) {

                    selectedText.textContent =
                        selectedSystem;
                }


                /* -----------------------------------------
                   NODE NAME LABEL
                ----------------------------------------- */

                if (nodebNameInput) {

                    nodebNameInput.placeholder =
                        getNodeNameLabel(
                            selectedSystem
                        );
                }


                /* -----------------------------------------
                   SHOW FORM
                ----------------------------------------- */

                if (parameterForm) {

                    parameterForm.classList.remove(
                        "hidden"
                    );
                }


                /* -----------------------------------------
                   LOAD SYSTEM DATA
                ----------------------------------------- */

                loadSystem(
                    selectedSystem
                );


                /* -----------------------------------------
                   CLOSE DROPDOWN
                ----------------------------------------- */

                if (dropdown) {

                    dropdown.classList.remove(
                        "active"
                    );
                }
            }
        );
    }
);


/* =========================================================
   CLOSE DROPDOWNS
========================================================= */

document.addEventListener(
    "click",
    (e) => {

        if (
            dropdown &&
            !dropdown.contains(
                e.target
            )
        ) {

            dropdown.classList.remove(
                "active"
            );
        }


        if (
            typeDropdown &&
            !typeDropdown.contains(
                e.target
            )
        ) {

            typeDropdown.classList.remove(
                "active"
            );
        }


        if (
            towerTypeDropdown &&
            !towerTypeDropdown.contains(
                e.target
            )
        ) {

            towerTypeDropdown.classList.remove(
                "active"
            );
        }
    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (e) => {

        if (e.key !== "Escape") {
            return;
        }

        if (dropdown) {

            dropdown.classList.remove(
                "active"
            );
        }

        if (typeDropdown) {

            typeDropdown.classList.remove(
                "active"
            );
        }

        if (towerTypeDropdown) {

            towerTypeDropdown.classList.remove(
                "active"
            );
        }
    }
);


/* =========================================================
   TOWER TYPE DROPDOWN
========================================================= */

if (
    towerTypeDropdown &&
    towerTypeDropdownSelected
) {

    towerTypeDropdownSelected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );
            }

            if (typeDropdown) {

                typeDropdown.classList.remove(
                    "active"
                );
            }

            towerTypeDropdown.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   TOWER TYPE OPTIONS
========================================================= */

towerTypeDropdownItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();

                selectedTowerType =
                    item.dataset.value ||
                    "";

                towerTypeDropdownItems.forEach(
                    (x) => {

                        x.classList.toggle(
                            "selected",
                            x === item
                        );
                    }
                );

                if (towerTypeSelectedText) {

                    towerTypeSelectedText.textContent =
                        selectedTowerType ||
                        "TOWER TYPE";
                }

                saveCurrentSystem();

                if (towerTypeDropdown) {

                    towerTypeDropdown.classList.remove(
                        "active"
                    );
                }
            }
        );
    }
);


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   SYSTEM FILE NAME
========================================================= */

function getSystemFileName(
    system,
    siteCode
) {

    const cleanSystem =
        String(system || "")
            .trim()
            .toUpperCase();

    const cleanSiteCode =
        String(siteCode || "")
            .trim()
            .toUpperCase();


    if (!cleanSystem) {
        return "";
    }


    if (!cleanSiteCode) {

        return `${cleanSystem}.xlsx`;
    }


    return `${cleanSystem}_${cleanSiteCode}.xlsx`;
}


/* =========================================================
   FIND HEADER INDEX
========================================================= */

function normalizeHeader(header) {

    return String(header || "")
        .trim()
        .toUpperCase()
        .replace(
            /\*/g,
            ""
        )
        .replace(
            /[\s-]+/g,
            "_"
        )
        .replace(
            /_+/g,
            "_"
        )
        .replace(
            /^_|_$/g,
            ""
        );
}


function findHeaderIndex(
    headers,
    possibleNames
) {

    const normalizedNames =
        possibleNames.map(
            normalizeHeader
        );

    return headers.findIndex(
        (header) => {

            return normalizedNames.includes(
                normalizeHeader(header)
            );
        }
    );
}


/* =========================================================
   GET DATASET VALUE
========================================================= */

function getDatasetValue(
    data,
    keys
) {

    if (
        !data ||
        typeof data !== "object"
    ) {
        return "";
    }

    for (const key of keys) {

        if (
            data[key] !== undefined &&
            data[key] !== null &&
            String(data[key]).trim() !== ""
        ) {

            return String(
                data[key]
            );
        }
    }

    return "";
}


/* =========================================================
   SET GENERATED VALUE
========================================================= */

function setGeneratedValue(
    headers,
    row,
    possibleHeaders,
    dataKeys,
    input
) {

    let index =
        findHeaderIndex(
            headers,
            possibleHeaders
        );


    if (index < 0) {

        headers.push(
            possibleHeaders[0]
        );

        row.push("");

        index =
            headers.length - 1;
    }


    const datasetValue =
        getDatasetValue(
            window.__lastGeneratedData,
            dataKeys
        );


    if (
        datasetValue !== ""
    ) {

        row[index] =
            datasetValue;

    } else if (
        input &&
        String(input.value || "").trim() !== ""
    ) {

        row[index] =
            input.value;
    }


    return index;
}


/* =========================================================
   RENDER GENERATED RESULT
========================================================= */

function renderGeneratedResult(data) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        return `
            <p class="status-message error">
                Invalid response from dataset.
            </p>
        `;
    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (data.error) {

        return `
            <p class="status-message error">
                ${escapeHtml(data.error)}
            </p>
        `;
    }


    /* =====================================================
       DATA
    ===================================================== */

    const headers =
        Array.isArray(data.headers)
            ? [...data.headers]
            : [];

    const row =
        Array.isArray(data.row)
            ? [...data.row]
            : [];


    /* =====================================================
       CURRENT SYSTEM
    ===================================================== */

    const currentSystem =
        String(
            data.system ||
            selectedSystem ||
            ""
        )
            .trim()
            .toUpperCase();

    const is3G2100 =
        currentSystem ===
        "3G2100";


    /* =====================================================
       KEEP DATA AVAILABLE FOR 3G VALUES
    ===================================================== */

    window.__lastGeneratedData =
        data;


    /* =====================================================
       3G2100 PARAMETERS
    ===================================================== */

    if (is3G2100) {


        /* -----------------------------------------
           CELL ID
        ----------------------------------------- */

        let cellIdIndex =
            findHeaderIndex(
                headers,
                [
                    "CELL_ID",
                    "CELLID",
                    "CELL_ID_"
                ]
            );


        if (cellIdIndex < 0) {

            headers.push(
                "CELL_ID"
            );

            row.push("");

            cellIdIndex =
                headers.length - 1;
        }


        const cellIdValue =
            getDatasetValue(
                data,
                [
                    "cell_id",
                    "cellId",
                    "CELL_ID",
                    "cellID"
                ]
            );


        if (cellIdValue !== "") {

            row[cellIdIndex] =
                cellIdValue;

        } else if (
            cellIdInput
        ) {

            row[cellIdIndex] =
                cellIdInput.value || "";
        }


        /* -----------------------------------------
           NODEB ID
        ----------------------------------------- */

        let nodebIdIndex =
            findHeaderIndex(
                headers,
                [
                    "NODEB_ID",
                    "NODEBID",
                    "NODEB_ID_"
                ]
            );


        if (nodebIdIndex < 0) {

            headers.push(
                "NODEB_ID"
            );

            row.push("");

            nodebIdIndex =
                headers.length - 1;
        }


        const nodebIdValue =
            getDatasetValue(
                data,
                [
                    "nodeb_id",
                    "nodebId",
                    "NODEB_ID",
                    "nodeBId"
                ]
            );


        if (nodebIdValue !== "") {

            row[nodebIdIndex] =
                nodebIdValue;

        } else if (
            nodebIdInput
        ) {

            row[nodebIdIndex] =
                nodebIdInput.value || "";
        }


        /* -----------------------------------------
           LOCAL CELL ID
        ----------------------------------------- */

        let localCellIdIndex =
            findHeaderIndex(
                headers,
                [
                    "LOCAL_CELLID",
                    "LOCAL_CELL_ID",
                    "LOCALCELLID",
                    "LOCAL_CELLID_"
                ]
            );


        if (localCellIdIndex < 0) {

            headers.push(
                "LOCAL_CELLID"
            );

            row.push("");

            localCellIdIndex =
                headers.length - 1;
        }


        const localCellIdValue =
            getDatasetValue(
                data,
                [
                    "local_cellid",
                    "local_cell_id",
                    "localCellId",
                    "localCellID",
                    "LOCAL_CELLID"
                ]
            );


        if (
            localCellIdValue !== ""
        ) {

            row[localCellIdIndex] =
                localCellIdValue;

        } else if (
            localCellIdInput
        ) {

            row[localCellIdIndex] =
                localCellIdInput.value || "";
        }
    }


    /* =====================================================
       EMPTY RESULT
    ===================================================== */

    if (!headers.length) {

        return `
            <p class="status-message warning">
                No generated parameters found.
            </p>
        `;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const MAX_VISIBLE_LENGTH =
        80;

    const INITIAL_PARAMETER_COUNT =
        5;


    /* =====================================================
       GENERATE PARAMETER ROW
    ===================================================== */

    const generateParameterRow = (
        header,
        index
    ) => {

        const value =
            String(
                row[index] ?? ""
            ).trim();

        const isLong =
            value.length >
            MAX_VISIBLE_LENGTH;


        /* -------------------------------------
           NORMAL VALUE
        ------------------------------------- */

        if (!isLong) {

            return `
                <tr
                    class="generated-parameter-row"
                >

                    <th>
                        ${escapeHtml(header)}
                    </th>

                    <td>
                        ${escapeHtml(value)}
                    </td>

                </tr>
            `;
        }


        /* -------------------------------------
           LONG VALUE
        ------------------------------------- */

        const shortValue =
            value.slice(
                0,
                MAX_VISIBLE_LENGTH
            ) + "...";


        return `
            <tr
                class="generated-parameter-row parameter-long-row"
            >

                <th>
                    ${escapeHtml(header)}
                </th>

                <td>

                    <div
                        class="parameter-value-container"
                    >

                        <span
                            class="parameter-value-short"
                        >
                            ${escapeHtml(shortValue)}
                        </span>

                        <span
                            class="parameter-value-full hidden"
                        >
                            ${escapeHtml(value)}
                        </span>

                        <button
                            type="button"
                            class="parameter-expand-btn"
                            aria-expanded="false"
                            aria-label="Show full value"
                            title="Show full value"
                        >

                            <span
                                class="parameter-expand-icon"
                            ></span>

                        </button>

                    </div>

                </td>

            </tr>
        `;
    };


    /* =====================================================
       GENERATE ALL ROWS
    ===================================================== */

    const rows =
        headers
            .map(
                (header, index) => {

                    const rowHtml =
                        generateParameterRow(
                            header,
                            index
                        );


                    if (
                        index >=
                        INITIAL_PARAMETER_COUNT
                    ) {

                        return rowHtml.replace(
                            "generated-parameter-row",
                            "generated-parameter-row parameter-hidden-row hidden"
                        );
                    }


                    return rowHtml;
                }
            )
            .join("");


    /* =====================================================
       SHOW ALL BUTTON
    ===================================================== */

    const hasMoreParameters =
        headers.length >
        INITIAL_PARAMETER_COUNT;


    const showAllButton =
        hasMoreParameters
            ? `
                <div
                    class="parameter-list-toggle"
                >

                    <button
                        type="button"
                        class="parameter-list-toggle-btn"
                        aria-expanded="false"
                        aria-label="Show All Parameters"
                    >

                        <span
                            class="parameter-list-toggle-circle"
                        >

                            <span
                                class="parameter-list-toggle-arrow"
                            ></span>

                        </span>

                    </button>

                    <span
                        class="parameter-list-toggle-label"
                    >
                        Show All Parameters
                    </span>

                </div>
            `
            : "";


    /* =====================================================
       FILE NAME
    ===================================================== */

    const system =
        data.system ||
        selectedSystem ||
        "";

    const siteCode =
        data.siteCode ||
        (
            siteCodeInput
                ? siteCodeInput.value
                : ""
        );

    const fileName =
        data.fileName ||
        getSystemFileName(
            system,
            siteCode
        );


    /* =====================================================
       NODE NAME
    ===================================================== */

    const nodeName =
        data.nodebName ||
        data.nodeName ||
        (
            nodebNameInput
                ? nodebNameInput.value
                : ""
        );


    /* =====================================================
       TYPE
    ===================================================== */

    const displayType =
        data.type ||
        selectedType ||
        "";


    /* =====================================================
       TOWER TYPE
    ===================================================== */

    const displayTowerType =
        data.towerType ||
        selectedTowerType ||
        "";


    /* =====================================================
       RESULT
    ===================================================== */

    return `

        <div
            class="autogen-summary"
        >

            <p>

                <strong>
                    SYSTEM:
                </strong>

                ${escapeHtml(system)}

            </p>


            <p>

                <strong>
                    SITE CODE:
                </strong>

                ${escapeHtml(siteCode)}

            </p>


            <p>

                <strong>
                    ${escapeHtml(
                        getNodeNameLabel(
                            system
                        )
                    )}:
                </strong>

                ${escapeHtml(nodeName)}

            </p>


            <p>

                <strong>
                    TYPE:
                </strong>

                ${escapeHtml(displayType)}

            </p>


            ${
                currentSystem === "3G2100"
                    ? `
                        <p>

                            <strong>
                                TOWER TYPE:
                            </strong>

                            ${escapeHtml(
                                displayTowerType
                            )}

                        </p>
                    `
                    : ""
            }


            <p>

                <strong>
                    FILE:
                </strong>

                ${escapeHtml(fileName)}

            </p>

        </div>


        <div
            class="result-table-wrapper"
        >

            <table
                class="autogen-table"
            >

                <thead>

                    <tr>

                        <th>
                            Parameter
                        </th>

                        <th>
                            Generated Value
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows}

                </tbody>

            </table>


            ${showAllButton}

        </div>

    `;
}


/* =========================================================
   PARAMETER EXPAND / COLLAPSE
========================================================= */

function setupParameterExpandButtons() {

    if (!result) {
        return;
    }


    if (
        result.dataset.expandReady ===
        "true"
    ) {

        return;
    }


    result.dataset.expandReady =
        "true";


    result.addEventListener(
        "click",
        (e) => {


            /* =================================================
               LONG VALUE BUTTON
            ================================================= */

            const valueButton =
                e.target.closest(
                    ".parameter-expand-btn"
                );


            if (
                valueButton &&
                result.contains(
                    valueButton
                )
            ) {

                const container =
                    valueButton.closest(
                        ".parameter-value-container"
                    );


                if (!container) {
                    return;
                }


                const shortValue =
                    container.querySelector(
                        ".parameter-value-short"
                    );

                const fullValue =
                    container.querySelector(
                        ".parameter-value-full"
                    );


                if (
                    !shortValue ||
                    !fullValue
                ) {

                    return;
                }


                const expanded =
                    valueButton.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (!expanded) {

                    shortValue.classList.add(
                        "hidden"
                    );

                    fullValue.classList.remove(
                        "hidden"
                    );

                    valueButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    valueButton.setAttribute(
                        "aria-label",
                        "Show less"
                    );

                    valueButton.setAttribute(
                        "title",
                        "Show less"
                    );

                } else {

                    fullValue.classList.add(
                        "hidden"
                    );

                    shortValue.classList.remove(
                        "hidden"
                    );

                    valueButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    valueButton.setAttribute(
                        "aria-label",
                        "Show full value"
                    );

                    valueButton.setAttribute(
                        "title",
                        "Show full value"
                    );
                }


                return;
            }


            /* =================================================
               SHOW ALL PARAMETERS BUTTON
            ================================================= */

            const listButton =
                e.target.closest(
                    ".parameter-list-toggle-btn"
                );


            if (
                !listButton ||
                !result.contains(
                    listButton
                )
            ) {

                return;
            }


            const tableWrapper =
                listButton.closest(
                    ".result-table-wrapper"
                );


            if (!tableWrapper) {
                return;
            }


            const hiddenRows =
                tableWrapper.querySelectorAll(
                    ".parameter-hidden-row"
                );


            const label =
                tableWrapper.querySelector(
                    ".parameter-list-toggle-label"
                );


            const arrow =
                tableWrapper.querySelector(
                    ".parameter-list-toggle-arrow"
                );


            const expanded =
                listButton.getAttribute(
                    "aria-expanded"
                ) === "true";


            /* =================================================
               SHOW ALL
            ================================================= */

            if (!expanded) {

                hiddenRows.forEach(
                    (row) => {

                        row.classList.remove(
                            "hidden"
                        );
                    }
                );


                listButton.setAttribute(
                    "aria-expanded",
                    "true"
                );


                listButton.setAttribute(
                    "aria-label",
                    "Show Less"
                );


                if (label) {

                    label.textContent =
                        "Show Less";
                }


                if (arrow) {

                    arrow.classList.add(
                        "up"
                    );
                }

                return;
            }


            /* =================================================
               SHOW ONLY FIRST 5
            ================================================= */

            hiddenRows.forEach(
                (row) => {

                    row.classList.add(
                        "hidden"
                    );
                }
            );


            listButton.setAttribute(
                "aria-expanded",
                "false"
            );


            listButton.setAttribute(
                "aria-label",
                "Show All Parameters"
            );


            if (label) {

                label.textContent =
                    "Show All Parameters";
            }


            if (arrow) {

                arrow.classList.remove(
                    "up"
                );
            }


            tableWrapper.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    );
}


/* =========================================================
   INITIALIZE PARAMETER EXPAND BUTTONS
========================================================= */

setupParameterExpandButtons();


/* =========================================================
   AUTO GENERATE - GITHUB PAGES
========================================================= */

if (autoBtn) {

    autoBtn.addEventListener(
        "click",
        async () => {


            /* -----------------------------------------
               SYSTEM REQUIRED
            ----------------------------------------- */

            if (!selectedSystem) {

                if (result) {

                    result.innerHTML = `
                        <p
                            class="status-message warning"
                        >
                            Please select a system first.
                        </p>
                    `;

                    result.classList.remove(
                        "hidden"
                    );
                }

                return;
            }


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            const siteValid =
                Boolean(siteCodeInput) &&
                isValidSiteCode(
                    siteCodeInput.value
                );

            const nodebValid =
                Boolean(nodebNameInput) &&
                isValidNodebName(
                    nodebNameInput.value
                );

            const typeValid =
                isValidType(
                    selectedType
                );


            /* -----------------------------------------
               3G2100 VALIDATION
            ----------------------------------------- */

            const is3G2100 =
                selectedSystem ===
                "3G2100";


            const cellValid =
                !is3G2100 ||
                (
                    Boolean(cellIdInput) &&
                    isValidFixedNumber(
                        cellIdInput.value,
                        5
                    )
                );


            const nodebIdValid =
                !is3G2100 ||
                (
                    Boolean(nodebIdInput) &&
                    isValidFixedNumber(
                        nodebIdInput.value,
                        4
                    )
                );


            const localCellIdValid =
                !is3G2100 ||
                (
                    Boolean(localCellIdInput) &&
                    isValidFixedNumber(
                        localCellIdInput.value,
                        2
                    )
                );


            if (
                !siteValid ||
                !nodebValid ||
                !typeValid ||
                !cellValid ||
                !nodebIdValid ||
                !localCellIdValid
            ) {

                if (result) {

                    result.innerHTML = `
                        <p
                            class="status-message warning"
                        >
                            Please complete all parameters correctly.
                        </p>
                    `;

                    result.classList.remove(
                        "hidden"
                    );
                }

                updateValidation();

                update3G2100Validation();

                return;
            }


            /* -----------------------------------------
               SAVE
            ----------------------------------------- */

            saveCurrentSystem();


            /* -----------------------------------------
               CHECK DEPLOY.JS
            ----------------------------------------- */

            if (
                typeof window.generateFromDataset !==
                "function"
            ) {

                if (result) {

                    result.innerHTML = `
                        <p
                            class="status-message error"
                        >
                            Deploy.js is not loaded correctly.
                        </p>
                    `;

                    result.classList.remove(
                        "hidden"
                    );
                }

                return;
            }


            /* -----------------------------------------
               LOADING
            ----------------------------------------- */

            if (result) {

                result.innerHTML = `
                    <p
                        class="status-message"
                    >
                        Generating parameters...
                    </p>
                `;

                result.classList.remove(
                    "hidden"
                );
            }


            /* -----------------------------------------
               STATIC DATASET GENERATION
            ----------------------------------------- */

            try {

                const data =
                    await window.generateFromDataset(
                        selectedSystem,
                        siteCodeInput
                            ? siteCodeInput.value
                            : "",
                        nodebNameInput
                            ? nodebNameInput.value
                            : "",
                        selectedType
                    );


                /* -------------------------------------
                   SAFETY CHECK
                ------------------------------------- */

                if (
                    !data ||
                    typeof data !== "object"
                ) {

                    throw new Error(
                        "Invalid response from dataset."
                    );
                }


                /* -------------------------------------
                   ADD UI VALUES
                ------------------------------------- */

                data.system =
                    data.system ||
                    selectedSystem;

                data.siteCode =
                    siteCodeInput
                        ? siteCodeInput.value
                        : "";

                data.nodebName =
                    nodebNameInput
                        ? nodebNameInput.value
                        : "";

                data.type =
                    selectedType;

                data.towerType =
                    is3G2100
                        ? selectedTowerType
                        : "";

                data.cell_id =
                    data.cell_id ||
                    data.cellId ||
                    (
                        cellIdInput
                            ? cellIdInput.value
                            : ""
                    );

                data.nodeb_id =
                    data.nodeb_id ||
                    data.nodebId ||
                    (
                        nodebIdInput
                            ? nodebIdInput.value
                            : ""
                    );

                data.local_cellid =
                    data.local_cellid ||
                    data.localCellId ||
                    (
                        localCellIdInput
                            ? localCellIdInput.value
                            : ""
                    );

                data.fileName =
                    data.fileName ||
                    getSystemFileName(
                        selectedSystem,
                        data.siteCode
                    );


                /* -------------------------------------
                   STORE LAST DATASET
                ------------------------------------- */

                window.__lastGeneratedData =
                    data;


                /* -------------------------------------
                   RENDER RESULT
                ------------------------------------- */

                if (result) {

                    result.innerHTML =
                        renderGeneratedResult(
                            data
                        );

                    result.classList.remove(
                        "hidden"
                    );
                }

            }


            /* -----------------------------------------
               ERROR
            ----------------------------------------- */

            catch (error) {

                console.error(
                    "AutoGen Error:",
                    error
                );


                if (result) {

                    result.innerHTML = `
                        <p
                            class="status-message error"
                        >
                            ${escapeHtml(
                                error &&
                                error.message
                                    ? error.message
                                    : "Failed to generate parameters."
                            )}
                        </p>
                    `;

                    result.classList.remove(
                        "hidden"
                    );
                }
            }
        }
    );
}


/* =========================================================
   CLEAR BUTTON
========================================================= */

if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        () => {


            /* -----------------------------------------
               CLEAR RESULT
            ----------------------------------------- */

            if (result) {

                result.innerHTML =
                    "";

                result.classList.add(
                    "hidden"
                );
            }


            /* -----------------------------------------
               CLEAR LAST DATASET
            ----------------------------------------- */

            window.__lastGeneratedData =
                null;


            /* -----------------------------------------
               RESET SYSTEM
            ----------------------------------------- */

            selectedSystem = "";


            if (selectedText) {

                selectedText.textContent =
                    "SYSTEM";
            }


            items.forEach(
                (item) => {

                    item.classList.remove(
                        "selected"
                    );
                }
            );


            /* -----------------------------------------
               RESET ALL SYSTEM DATA
            ----------------------------------------- */

            items.forEach(
                (item) => {

                    const system =
                        String(
                            item.dataset.value || ""
                        )
                            .trim()
                            .toUpperCase();

                    if (system) {

                        systemParameters[
                            system
                        ] =
                            createDefaultSystemData();
                    }
                }
            );


            /* -----------------------------------------
               RESET SITE CODE
            ----------------------------------------- */

            if (siteCodeInput) {

                siteCodeInput.value =
                    "";
            }


            /* -----------------------------------------
               RESET NODE NAME
            ----------------------------------------- */

            if (nodebNameInput) {

                nodebNameInput.value =
                    "";

                nodebNameInput.placeholder =
                    "NODEB NAME";
            }


            /* -----------------------------------------
               RESET TYPE
            ----------------------------------------- */

            selectedType = "";


            if (typeSelectedText) {

                typeSelectedText.textContent =
                    "TYPE";
            }


            typeDropdownItems.forEach(
                (item) => {

                    item.classList.remove(
                        "selected"
                    );
                }
            );


            /* -----------------------------------------
               RESET TOWER TYPE
            ----------------------------------------- */

            selectedTowerType = "";


            if (towerTypeSelectedText) {

                towerTypeSelectedText.textContent =
                    "TOWER TYPE";
            }


            towerTypeDropdownItems.forEach(
                (item) => {

                    item.classList.remove(
                        "selected"
                    );
                }
            );


            /* -----------------------------------------
               RESET 3G2100 INPUTS
            ----------------------------------------- */

            if (cellIdInput) {

                cellIdInput.value =
                    "";
            }


            if (nodebIdInput) {

                nodebIdInput.value =
                    "";
            }


            if (localCellIdInput) {

                localCellIdInput.value =
                    "";
            }


            /* -----------------------------------------
               RESET STATUS
            ----------------------------------------- */

            setValidStatus(
                siteCodeStatus,
                false
            );

            setValidStatus(
                nodebNameStatus,
                false
            );

            setValidStatus(
                typeStatus,
                false
            );

            setValidStatus(
                cellIdStatus,
                false
            );

            setValidStatus(
                nodebIdStatus,
                false
            );

            setValidStatus(
                localCellIdStatus,
                false
            );


            /* -----------------------------------------
               RESET HINT
            ----------------------------------------- */

            if (nodebHint) {

                nodebHint.classList.add(
                    "hidden"
                );
            }


            /* -----------------------------------------
               HIDE 3G2100 FIELDS
            ----------------------------------------- */

            update3G2100Fields(
                ""
            );


            /* -----------------------------------------
               HIDE FORM
            ----------------------------------------- */

            if (parameterForm) {

                parameterForm.classList.add(
                    "hidden"
                );
            }


            /* -----------------------------------------
               CLOSE DROPDOWNS
            ----------------------------------------- */

            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );
            }


            if (typeDropdown) {

                typeDropdown.classList.remove(
                    "active"
                );
            }


            if (towerTypeDropdown) {

                towerTypeDropdown.classList.remove(
                    "active"
                );
            }
        }
    );
}


/* =========================================================
   INITIAL STATE
========================================================= */

update3G2100Fields(
    selectedSystem
);

updateValidation();

update3G2100Validation();

