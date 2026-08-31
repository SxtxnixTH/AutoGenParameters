/* =========================================================
   AUTOGEN PARAMETERS - DATA.JS
   Normalized version

   3G2100
   - NODEB NAME
   - NODEB ID = 4 digits
   - CELL ID = 5 digits
   - LOCAL CELLID = 2 digits
   - TOWER TYPE = used
   - RNC = used
   - CELL COUNT = used

   4G1800 / 4G2100 / 4G2600
   - ENODEB NAME
   - ENODEB ID = 6 digits
   - CELL ID = 3 digits
   - LOCAL CELLID = same as CELL ID / hidden
   - TOWER TYPE = used
   - RNC = not used
   - CELL COUNT = used

   5G2600
   - GNODEB NAME
   - GNODEB ID = 6 digits
   - CELL ID = 5 digits
   - LOCAL CELLID = same as CELL ID / hidden
   - TOWER TYPE = used
   - BW = 40 / 60 / 80 / 100
   - RNC = not used
   - CELL COUNT = used
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
   BASIC INPUTS
========================================================= */

const siteCodeInput =
    document.getElementById("site-code");

const nodebNameInput =
    document.getElementById("nodeb-name");

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
   TOWER TYPE
   3G2100 + 4G + 5G2600
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


/* =========================================================
   RNC
   3G2100 ONLY
========================================================= */

const rncDropdown =
    document.getElementById(
        "rncDropdown"
    );

const rncDropdownSelected =
    document.getElementById(
        "rncDropdownSelected"
    );

const rncSelectedText =
    document.getElementById(
        "rncSelectedText"
    );

const rncDropdownItems =
    document.querySelectorAll(
        "#rncDropdownList li"
    );

const rncStatus =
    document.getElementById(
        "rnc-status"
    );


/* =========================================================
   3G INPUTS
========================================================= */

const cellIdWrapper =
    document.getElementById(
        "cellIdWrapper"
    );

const nodebIdWrapper =
    document.getElementById(
        "nodebIdWrapper"
    );

const cellIdInput =
    document.getElementById(
        "cell-id"
    );

const nodebIdInput =
    document.getElementById(
        "nodeb-id"
    );

const localCellIdWrapper =
    document.getElementById(
        "localCellIdWrapper"
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
   4G INPUTS
========================================================= */

const cellId4GWrapper =
    document.getElementById(
        "cellId4GWrapper"
    );

const cellId4GInput =
    document.getElementById(
        "cell-id-4g"
    );

const cellId4GStatus =
    document.getElementById(
        "cell-id-4g-status"
    );

const enodebIdWrapper =
    document.getElementById(
        "enodebIdWrapper"
    );

const enodebIdInput =
    document.getElementById(
        "enodeb-id"
    );

const enodebIdStatus =
    document.getElementById(
        "enodeb-id-status"
    );


/* =========================================================
   5G2600 INPUTS
========================================================= */

const cellId5GWrapper =
    document.getElementById(
        "cellId5GWrapper"
    );

const cellId5GInput =
    document.getElementById(
        "cell-id-5g"
    );

const cellId5GStatus =
    document.getElementById(
        "cell-id-5g-status"
    );

const localCellId5GInput =
    document.getElementById(
        "local-cellid-5g"
    );

const gnodebIdWrapper =
    document.getElementById(
        "gnodebIdWrapper"
    );

const gnodebIdInput =
    document.getElementById(
        "gnodeb-id"
    );

const gnodebIdStatus =
    document.getElementById(
        "gnodeb-id-status"
    );


/* =========================================================
   5G2600 BW
========================================================= */

const bwDropdown =
    document.getElementById(
        "bwDropdown"
    );

const bwDropdownSelected =
    document.getElementById(
        "bwDropdownSelected"
    );

const bwSelectedText =
    document.getElementById(
        "bwSelectedText"
    );

const bwDropdownItems =
    document.querySelectorAll(
        "#bwDropdownList li"
    );


/* =========================================================
   CELL COUNT
========================================================= */

const cellCountWrapper =
    document.getElementById(
        "cellCountWrapper"
    );

const cellCountInput =
    document.getElementById(
        "cell-count"
    );

const cellCountMinusBtn =
    document.getElementById(
        "cellCountMinus"
    );

const cellCountPlusBtn =
    document.getElementById(
        "cellCountPlus"
    );


/* =========================================================
   SYSTEM STATE
========================================================= */

let selectedSystem = "";
let selectedType = "";
let selectedTowerType = "";
let selectedRNC = "";
let selectedBW = "";


/* =========================================================
   CONSTANTS
========================================================= */

const CELL_COUNT_MIN = 1;
const CELL_COUNT_MAX = 10;

const BW_VALUES = [
    "40",
    "60",
    "80",
    "100"
];


/* =========================================================
   DEPLOY.JS / SHEETJS LOADER
   index.html loads Data.js only.
   Load SheetJS and Deploy.js here so the existing index.html
   works without Flask / Data.py / /autogen.
========================================================= */

let deployReadyPromise = null;

function loadExternalScript(
    src,
    type = "text/javascript"
) {

    return new Promise((resolve, reject) => {

        const existing =
            document.querySelector(
                `script[src="${src}"]`
            );

        if (existing) {
            if (
                type === "module" ||
                existing.dataset.loaded === "true"
            ) {
                resolve();
                return;
            }
        }

        const script =
            document.createElement("script");

        script.src = src;

        if (type === "module") {
            script.type = "module";
        }

        script.onload = () => {
            script.dataset.loaded = "true";
            resolve();
        };

        script.onerror = () => {
            reject(
                new Error(
                    `Failed to load script: ${src}`
                )
            );
        };

        document.head.appendChild(script);
    });
}


function ensureDeployReady() {

    if (
        window.AutoGenDeploy &&
        typeof window.AutoGenDeploy.generate === "function"
    ) {
        return Promise.resolve();
    }

    if (deployReadyPromise) {
        return deployReadyPromise;
    }

    deployReadyPromise =
        (async () => {

            /* SheetJS */
            if (typeof XLSX === "undefined") {

                await loadExternalScript(
                    "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"
                );
            }

            /* Deploy.js */
            if (
                !window.AutoGenDeploy ||
                typeof window.AutoGenDeploy.generate !== "function"
            ) {

                await loadExternalScript(
                    "Deploy.js"
                );
            }

            if (
                !window.AutoGenDeploy ||
                typeof window.AutoGenDeploy.generate !== "function"
            ) {
                throw new Error(
                    "Deploy.js did not initialize AutoGenDeploy."
                );
            }

        })();

    return deployReadyPromise;
}


/* =========================================================
   SYSTEM CHECK
========================================================= */

function is3G2100System(system) {
    return (
        String(system || "").trim() ===
        "3G2100"
    );
}


function is4GSystem(system) {
    const value =
        String(system || "").trim();

    return (
        value === "4G1800" ||
        value === "4G2100" ||
        value === "4G2600"
    );
}


function is5G2600System(system) {
    return (
        String(system || "").trim() ===
        "5G2600"
    );
}


function hasCellParameters(system) {
    return (
        is3G2100System(system) ||
        is4GSystem(system) ||
        is5G2600System(system)
    );
}


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

    const now =
        new Date();

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
        rnc: "",
        cellId: "",
        nodebId: "",
        localCellId: "",
        bw: "",
        cellCount:
            CELL_COUNT_MIN
    };
}


/* =========================================================
   INITIALIZE SYSTEM DATA
========================================================= */

items.forEach(
    (item) => {

        const system =
            item.dataset.value || "";

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
        String(system || "").trim();

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
   NODE ID LABEL
========================================================= */

function getNodeIdLabel(system) {

    if (is5G2600System(system)) {
        return "GNODEB ID";
    }

    if (is4GSystem(system)) {
        return "ENODEB ID";
    }

    return "NODEB ID";
}


/* =========================================================
   ID LABEL
========================================================= */

function updateIDLabels(system) {

    const is3G =
        is3G2100System(system);

    const is4G =
        is4GSystem(system);

    const is5G =
        is5G2600System(system);


    if (cellIdInput) {

        cellIdInput.placeholder =
            "CELL ID";
    }

    if (nodebIdInput) {

        nodebIdInput.placeholder =
            "NODEB ID";
    }

    if (cellId4GInput) {

        cellId4GInput.placeholder =
            "CELL ID / LOCAL CELLID";
    }

    if (enodebIdInput) {

        enodebIdInput.placeholder =
            "ENODEB ID";
    }

    if (cellId5GInput) {

        cellId5GInput.placeholder =
            "CELL ID / LOCAL CELLID";
    }

    if (gnodebIdInput) {

        gnodebIdInput.placeholder =
            "GNODEB ID";
    }

    if (localCellIdInput) {

        localCellIdInput.placeholder =
            "LOCAL CELLID";
    }

    if (localCellIdWrapper) {

        localCellIdWrapper.classList.toggle(
            "hidden",
            !is3G
        );
    }

    if (is3G) {

        const label =
            cellIdInput
                ? cellIdInput
                    .parentElement
                    ?.querySelector(
                        "label"
                    )
                : null;

        if (label) {
            label.textContent =
                "CELL ID";
        }
    }

    void is4G;
    void is5G;
}


/* =========================================================
   VALIDATION
========================================================= */

function isValidSiteCode(value) {

    return /^[A-Z0-9]{5}$/.test(
        String(value || "")
    );
}


function isValidNodebName(value) {

    const cleanValue =
        String(value || "");

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


function isValidRNC(value) {

    return (
        String(value || "").trim() !== ""
    );
}


function isValidBW(value) {

    return BW_VALUES.includes(
        String(value || "")
    );
}


/* =========================================================
   SYSTEM-SPECIFIC LENGTH
========================================================= */

function getNodeIdLength(system) {

    if (
        is4GSystem(system) ||
        is5G2600System(system)
    ) {
        return 6;
    }

    return 4;
}


function getCellIdLength(system) {

    if (is4GSystem(system)) {
        return 3;
    }

    if (is5G2600System(system)) {
        return 5;
    }

    return 5;
}


function getLocalCellIdLength(system) {

    if (is5G2600System(system)) {
        return 5;
    }

    if (is4GSystem(system)) {
        return 3;
    }

    return 2;
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
   RNC DISPLAY
========================================================= */

function updateRNCDisplay() {

    if (rncSelectedText) {

        rncSelectedText.textContent =
            selectedRNC || "RNC";
    }

    rncDropdownItems.forEach(
        (item) => {

            item.classList.toggle(
                "selected",
                item.dataset.value ===
                    selectedRNC
            );
        }
    );
}


/* =========================================================
   BW DISPLAY
========================================================= */

function updateBWDisplay() {

    if (bwSelectedText) {

        bwSelectedText.textContent =
            selectedBW || "BW";
    }

    bwDropdownItems.forEach(
        (item) => {

            item.classList.toggle(
                "selected",
                item.dataset.value ===
                    selectedBW
            );
        }
    );
}


/* =========================================================
   TOWER TYPE DISPLAY
========================================================= */

function updateTowerTypeDisplay() {

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
}


/* =========================================================
   SYSTEM-SPECIFIC FIELD VISIBILITY
========================================================= */

function updateSystemSpecificFields(
    system
) {

    const is3G =
        is3G2100System(system);

    const is4G =
        is4GSystem(system);

    const is5G =
        is5G2600System(system);


    /* CELL COUNT */

    if (cellCountWrapper) {

        cellCountWrapper.classList.toggle(
            "hidden",
            !(
                is3G ||
                is4G ||
                is5G
            )
        );
    }


    /* TOWER TYPE */

    if (towerTypeDropdown) {

        towerTypeDropdown.classList.toggle(
            "hidden",
            !(
                is3G ||
                is4G ||
                is5G
            )
        );
    }


    /* RNC */

    if (rncDropdown) {

        rncDropdown.classList.toggle(
            "hidden",
            !is3G
        );
    }


    /* 3G */

    if (cellIdWrapper) {

        cellIdWrapper.classList.toggle(
            "hidden",
            !is3G
        );
    }

    if (nodebIdWrapper) {

        nodebIdWrapper.classList.toggle(
            "hidden",
            !is3G
        );
    }

    if (localCellIdWrapper) {

        localCellIdWrapper.classList.toggle(
            "hidden",
            !is3G
        );
    }


    /* 4G */

    if (cellId4GWrapper) {

        cellId4GWrapper.classList.toggle(
            "hidden",
            !is4G
        );
    }

    if (enodebIdWrapper) {

        enodebIdWrapper.classList.toggle(
            "hidden",
            !is4G
        );
    }


    /* 5G */

    if (cellId5GWrapper) {

        cellId5GWrapper.classList.toggle(
            "hidden",
            !is5G
        );
    }

    if (gnodebIdWrapper) {

        gnodebIdWrapper.classList.toggle(
            "hidden",
            !is5G
        );
    }

    if (bwDropdown) {

        bwDropdown.classList.toggle(
            "hidden",
            !is5G
        );
    }


    updateIDLabels(system);
}


/* =========================================================
   COMPATIBILITY WRAPPER
========================================================= */

function update3G2100Fields(system) {

    updateSystemSpecificFields(
        system
    );
}


/* =========================================================
   GET ACTIVE CELL INPUT
========================================================= */

function getActiveCellInput(system) {

    if (is3G2100System(system)) {
        return cellIdInput;
    }

    if (is4GSystem(system)) {
        return cellId4GInput;
    }

    if (is5G2600System(system)) {
        return cellId5GInput;
    }

    return null;
}


/* =========================================================
   GET ACTIVE NODE ID INPUT
========================================================= */

function getActiveNodeIdInput(system) {

    if (is3G2100System(system)) {
        return nodebIdInput;
    }

    if (is4GSystem(system)) {
        return enodebIdInput;
    }

    if (is5G2600System(system)) {
        return gnodebIdInput;
    }

    return null;
}


/* =========================================================
   SYNC 4G LOCAL CELLID
========================================================= */

function sync4GLocalCellId() {

    if (
        !is4GSystem(selectedSystem) ||
        !cellId4GInput
    ) {
        return;
    }
}


/* =========================================================
   SYNC 5G LOCAL CELLID
========================================================= */

function sync5GLocalCellId() {

    if (
        !is5G2600System(selectedSystem) ||
        !localCellId5GInput ||
        !cellId5GInput
    ) {
        return;
    }

    localCellId5GInput.value =
        cellId5GInput.value;
}


/* =========================================================
   SYSTEM-SPECIFIC VALIDATION
========================================================= */

function updateSystemSpecificValidation() {

    const is3G =
        is3G2100System(
            selectedSystem
        );

    const is4G =
        is4GSystem(
            selectedSystem
        );

    const is5G =
        is5G2600System(
            selectedSystem
        );


    const cellInput =
        getActiveCellInput(
            selectedSystem
        );

    const nodeInput =
        getActiveNodeIdInput(
            selectedSystem
        );


    /* CELL ID */

    const cellValid =
        !hasCellParameters(
            selectedSystem
        ) ||
        (
            cellInput &&
            isValidFixedNumber(
                cellInput.value,
                getCellIdLength(
                    selectedSystem
                )
            )
        );


    /* NODE ID */

    const nodeIdValid =
        !hasCellParameters(
            selectedSystem
        ) ||
        (
            nodeInput &&
            isValidFixedNumber(
                nodeInput.value,
                getNodeIdLength(
                    selectedSystem
                )
            )
        );


    /* LOCAL CELLID */

    let localCellIdValid = true;

    if (is3G) {

        localCellIdValid =
            localCellIdInput &&
            isValidFixedNumber(
                localCellIdInput.value,
                getLocalCellIdLength(
                    selectedSystem
                )
            );
    }


    if (is4G) {

        sync4GLocalCellId();
    }


    if (is5G) {

        sync5GLocalCellId();
    }


    /* RNC */

    const rncValid =
        !is3G ||
        isValidRNC(
            selectedRNC
        );


    /* BW */

    const bwValid =
        !is5G ||
        isValidBW(
            selectedBW
        );


    /* STATUS */

    setValidStatus(
        cellIdStatus,
        is3G
            ? cellValid
            : false
    );

    setValidStatus(
        nodebIdStatus,
        is3G
            ? nodeIdValid
            : false
    );

    setValidStatus(
        localCellIdStatus,
        is3G
            ? localCellIdValid
            : false
    );

    setValidStatus(
        cellId4GStatus,
        is4G
            ? cellValid
            : false
    );

    setValidStatus(
        enodebIdStatus,
        is4G
            ? nodeIdValid
            : false
    );

    setValidStatus(
        cellId5GStatus,
        is5G
            ? cellValid
            : false
    );

    setValidStatus(
        gnodebIdStatus,
        is5G
            ? nodeIdValid
            : false
    );

    setValidStatus(
        rncStatus,
        rncValid
    );

    void bwValid;
}


/* =========================================================
   COMPATIBILITY FUNCTION
========================================================= */

function update3G2100Validation() {

    updateSystemSpecificValidation();
}


/* =========================================================
   NUMERIC INPUT HANDLER
========================================================= */

function setupNumericField(
    input,
    status,
    getLength,
    onInput = null
) {

    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        () => {

            const length =
                getLength(
                    selectedSystem
                );

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

            if (onInput) {
                onInput();
            }

            updateSystemSpecificFields(
                selectedSystem
            );

            updateSystemSpecificValidation();

            saveCurrentSystem();
        }
    );


    input.addEventListener(
        "blur",
        () => {

            const length =
                getLength(
                    selectedSystem
                );

            if (!input.value) {

                updateSystemSpecificValidation();

                saveCurrentSystem();

                return;
            }

            normalizeNumericField(
                input,
                length
            );

            if (onInput) {
                onInput();
            }

            updateSystemSpecificFields(
                selectedSystem
            );

            updateSystemSpecificValidation();

            saveCurrentSystem();
        }
    );
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
   SETUP NUMERIC FIELDS
========================================================= */

/* 3G */

setupNumericField(
    cellIdInput,
    cellIdStatus,
    getCellIdLength
);

setupNumericField(
    nodebIdInput,
    nodebIdStatus,
    getNodeIdLength
);

setupNumericField(
    localCellIdInput,
    localCellIdStatus,
    getLocalCellIdLength
);


/* 4G */

setupNumericField(
    cellId4GInput,
    cellId4GStatus,
    getCellIdLength,
    sync4GLocalCellId
);

setupNumericField(
    enodebIdInput,
    enodebIdStatus,
    getNodeIdLength
);


/* 5G */

setupNumericField(
    cellId5GInput,
    cellId5GStatus,
    getCellIdLength,
    sync5GLocalCellId
);

setupNumericField(
    gnodebIdInput,
    gnodebIdStatus,
    getNodeIdLength
);


/* =========================================================
   CELL COUNT
========================================================= */

function normalizeCellCount(value) {

    let count =
        parseInt(
            value,
            10
        );

    if (Number.isNaN(count)) {

        count =
            CELL_COUNT_MIN;
    }

    return Math.max(
        CELL_COUNT_MIN,
        Math.min(
            CELL_COUNT_MAX,
            count
        )
    );
}


function updateCellCount(
    value,
    save = true
) {

    if (!cellCountInput) {
        return CELL_COUNT_MIN;
    }

    const count =
        normalizeCellCount(
            value
        );

    cellCountInput.value =
        String(count);

    if (save) {
        saveCurrentSystem();
    }

    return count;
}


/* =========================================================
   CELL COUNT - MINUS
========================================================= */

if (cellCountMinusBtn) {

    cellCountMinusBtn.type =
        "button";

    cellCountMinusBtn.addEventListener(
        "click",
        (e) => {

            e.preventDefault();
            e.stopPropagation();

            if (!cellCountInput) {
                return;
            }

            const current =
                parseInt(
                    cellCountInput.value,
                    10
                ) ||
                CELL_COUNT_MIN;

            const newValue =
                Math.max(
                    CELL_COUNT_MIN,
                    current - 1
                );

            cellCountInput.value =
                String(newValue);

            saveCurrentSystem();
        }
    );
}


/* =========================================================
   CELL COUNT - PLUS
========================================================= */

if (cellCountPlusBtn) {

    cellCountPlusBtn.type =
        "button";

    cellCountPlusBtn.addEventListener(
        "click",
        (e) => {

            e.preventDefault();
            e.stopPropagation();

            if (!cellCountInput) {
                return;
            }

            const current =
                parseInt(
                    cellCountInput.value,
                    10
                ) ||
                CELL_COUNT_MIN;

            const newValue =
                Math.min(
                    CELL_COUNT_MAX,
                    current + 1
                );

            cellCountInput.value =
                String(newValue);

            saveCurrentSystem();
        }
    );
}


/* =========================================================
   CELL COUNT DIRECT INPUT
========================================================= */

if (cellCountInput) {

    cellCountInput.addEventListener(
        "input",
        () => {

            let value =
                String(
                    cellCountInput.value ||
                    ""
                ).replace(
                    /[^0-9]/g,
                    ""
                );

            if (value === "") {

                cellCountInput.value =
                    "";

                saveCurrentSystem();

                return;
            }

            let count =
                parseInt(
                    value,
                    10
                );

            if (Number.isNaN(count)) {

                cellCountInput.value =
                    String(
                        CELL_COUNT_MIN
                    );

                saveCurrentSystem();

                return;
            }

            count =
                Math.max(
                    CELL_COUNT_MIN,
                    Math.min(
                        CELL_COUNT_MAX,
                        count
                    )
                );

            cellCountInput.value =
                String(count);

            saveCurrentSystem();
        }
    );


    cellCountInput.addEventListener(
        "blur",
        () => {

            updateCellCount(
                cellCountInput.value,
                true
            );
        }
    );


    cellCountInput.addEventListener(
        "keydown",
        (e) => {

            const allowedKeys = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Tab",
                "Home",
                "End"
            ];

            if (
                allowedKeys.includes(
                    e.key
                )
            ) {
                return;
            }

            if (
                !/^[0-9]$/.test(
                    e.key
                )
            ) {
                e.preventDefault();
            }
        }
    );
}


/* =========================================================
   SAVE CURRENT SYSTEM
========================================================= */

function saveCurrentSystem() {

    if (!selectedSystem) {
        return;
    }


    if (is4GSystem(selectedSystem)) {
        sync4GLocalCellId();
    }


    if (is5G2600System(selectedSystem)) {
        sync5GLocalCellId();
    }


    const cellInput =
        getActiveCellInput(
            selectedSystem
        );

    const nodeInput =
        getActiveNodeIdInput(
            selectedSystem
        );


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

        rnc:
            is3G2100System(
                selectedSystem
            )
                ? selectedRNC || ""
                : "",

        cellId:
            cellInput
                ? cellInput.value
                : "",

        nodebId:
            nodeInput
                ? nodeInput.value
                : "",

        localCellId:
            is3G2100System(
                selectedSystem
            )
                ? (
                    localCellIdInput
                        ? localCellIdInput.value
                        : ""
                )
                : is5G2600System(
                    selectedSystem
                )
                    ? (
                        localCellId5GInput
                            ? localCellId5GInput.value
                            : ""
                    )
                    : (
                        cellInput
                            ? cellInput.value
                            : ""
                    ),

        bw:
            is5G2600System(
                selectedSystem
            )
                ? selectedBW || ""
                : "",

        cellCount:
            cellCountInput
                ? normalizeCellCount(
                    cellCountInput.value
                )
                : CELL_COUNT_MIN
    };
}


/* =========================================================
   LOAD SYSTEM
========================================================= */

function loadSystem(system) {

    if (!parameterForm) {
        return;
    }

    const data =
        systemParameters[system] ||
        createDefaultSystemData();


    selectedSystem =
        system;


    updateSystemSpecificFields(
        system
    );


    if (nodebNameInput) {

        nodebNameInput.placeholder =
            getNodeNameLabel(
                system
            );
    }


    /* SITE CODE */

    if (siteCodeInput) {

        siteCodeInput.value =
            data.siteCode || "";
    }


    /* NODE NAME */

    if (nodebNameInput) {

        nodebNameInput.value =
            data.nodebName || "";
    }


    /* TYPE */

    if (data.nodebName) {

        selectedType =
            getAutoType(
                data.nodebName
            );

    } else if (data.type) {

        selectedType =
            data.type;

    } else {

        selectedType = "";
    }

    updateTypeDisplay();


    /* TOWER TYPE */

    selectedTowerType =
        (
            is3G2100System(system) ||
            is4GSystem(system) ||
            is5G2600System(system)
        )
            ? data.towerType || ""
            : "";

    updateTowerTypeDisplay();


    /* RNC */

    selectedRNC =
        is3G2100System(system)
            ? data.rnc || ""
            : "";

    updateRNCDisplay();


    /* BW */

    selectedBW =
        is5G2600System(system)
            ? data.bw || ""
            : "";

    updateBWDisplay();


    /* CLEAR ALL CELL INPUTS */

    if (cellIdInput) {
        cellIdInput.value = "";
    }

    if (nodebIdInput) {
        nodebIdInput.value = "";
    }

    if (localCellIdInput) {
        localCellIdInput.value = "";
    }

    if (cellId4GInput) {
        cellId4GInput.value = "";
    }

    if (enodebIdInput) {
        enodebIdInput.value = "";
    }

    if (cellId5GInput) {
        cellId5GInput.value = "";
    }

    if (localCellId5GInput) {
        localCellId5GInput.value = "";
    }

    if (gnodebIdInput) {
        gnodebIdInput.value = "";
    }


    /* 3G */

    if (is3G2100System(system)) {

        if (cellIdInput) {
            cellIdInput.value =
                data.cellId || "";
        }

        if (nodebIdInput) {
            nodebIdInput.value =
                data.nodebId || "";
        }

        if (localCellIdInput) {
            localCellIdInput.value =
                data.localCellId || "";
        }
    }


    /* 4G */

    if (is4GSystem(system)) {

        if (cellId4GInput) {

            cellId4GInput.value =
                data.cellId || "";
        }

        if (enodebIdInput) {

            enodebIdInput.value =
                data.nodebId || "";
        }

        sync4GLocalCellId();
    }


    /* 5G */

    if (is5G2600System(system)) {

        if (cellId5GInput) {

            cellId5GInput.value =
                data.cellId || "";
        }

        if (gnodebIdInput) {

            gnodebIdInput.value =
                data.nodebId || "";
        }

        sync5GLocalCellId();
    }


    /* CELL COUNT */

    if (cellCountInput) {

        cellCountInput.value =
            hasCellParameters(system)
                ? normalizeCellCount(
                    data.cellCount
                )
                : CELL_COUNT_MIN;
    }


    updateSystemSpecificFields(
        system
    );

    updateSystemSpecificValidation();

    updateValidation();
}


/* =========================================================
   UPDATE VALIDATION
========================================================= */

function updateValidation() {

    const siteValid =
        siteCodeInput &&
        isValidSiteCode(
            siteCodeInput.value
        );


    const nodebValid =
        nodebNameInput &&
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
   NODE NAME INPUT
========================================================= */

if (nodebNameInput) {

    nodebNameInput.addEventListener(
        "input",
        () => {

            let value =
                nodebNameInput.value
                    .toUpperCase();


            if (value.length === 0) {

                nodebNameInput.value =
                    "";

                selectedType = "";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


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
                        nodebNameInput.value
                    );

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            if (
                value.charAt(5) !== "_"
            ) {

                nodebNameInput.value =
                    firstFive;

                selectedType =
                    getAutoType(
                        nodebNameInput.value
                    );

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            const suffix =
                value.slice(6);


            if (suffix.length === 0) {

                nodebNameInput.value =
                    `${firstFive}_`;

                selectedType =
                    "DISTRIBUTED";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


            if (
                suffix.charAt(0) !== "D"
            ) {

                nodebNameInput.value =
                    `${firstFive}_`;

                selectedType =
                    "DISTRIBUTED";

                updateTypeDisplay();

                saveCurrentSystem();

                updateValidation();

                return;
            }


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
                `${firstFive}_D${number}`;

            selectedType =
                "DISTRIBUTED";

            updateTypeDisplay();

            saveCurrentSystem();

            updateValidation();
        }
    );
}


/* =========================================================
   AUTO UPDATE TYPE
========================================================= */

function autoUpdateTypeFromNodeName() {

    if (!nodebNameInput) {
        return;
    }

    selectedType =
        getAutoType(
            nodebNameInput.value || ""
        );

    updateTypeDisplay();

    saveCurrentSystem();

    updateValidation();
}


/* =========================================================
   CLOSE OTHER DROPDOWNS
========================================================= */

function closeOtherDropdowns(
    except
) {

    if (
        dropdown &&
        except !== dropdown
    ) {
        dropdown.classList.remove(
            "active"
        );
    }

    if (
        typeDropdown &&
        except !== typeDropdown
    ) {
        typeDropdown.classList.remove(
            "active"
        );
    }

    if (
        towerTypeDropdown &&
        except !== towerTypeDropdown
    ) {
        towerTypeDropdown.classList.remove(
            "active"
        );
    }

    if (
        rncDropdown &&
        except !== rncDropdown
    ) {
        rncDropdown.classList.remove(
            "active"
        );
    }

    if (
        bwDropdown &&
        except !== bwDropdown
    ) {
        bwDropdown.classList.remove(
            "active"
        );
    }
}


/* =========================================================
   TYPE DROPDOWN
========================================================= */

if (
    typeDropdown &&
    typeDropdownSelected
) {

    typeDropdownSelected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            closeOtherDropdowns(
                typeDropdown
            );

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
   SYSTEM DROPDOWN
========================================================= */

if (selected && dropdown) {

    selected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            closeOtherDropdowns(
                dropdown
            );

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

                saveCurrentSystem();


                items.forEach(
                    (x) => {

                        x.classList.remove(
                            "selected"
                        );
                    }
                );


                item.classList.add(
                    "selected"
                );


                selectedSystem =
                    item.dataset.value ||
                    "";


                if (selectedText) {

                    selectedText.textContent =
                        selectedSystem;
                }


                if (nodebNameInput) {

                    nodebNameInput.placeholder =
                        getNodeNameLabel(
                            selectedSystem
                        );
                }


                if (parameterForm) {

                    parameterForm.classList.remove(
                        "hidden"
                    );
                }


                loadSystem(
                    selectedSystem
                );


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

            closeOtherDropdowns(
                towerTypeDropdown
            );

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

                updateTowerTypeDisplay();

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
   RNC DROPDOWN
========================================================= */

if (
    rncDropdown &&
    rncDropdownSelected
) {

    rncDropdownSelected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            closeOtherDropdowns(
                rncDropdown
            );

            rncDropdown.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   RNC OPTIONS
========================================================= */

rncDropdownItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();

                selectedRNC =
                    item.dataset.value ||
                    "";

                updateRNCDisplay();

                saveCurrentSystem();

                updateSystemSpecificValidation();

                if (rncDropdown) {

                    rncDropdown.classList.remove(
                        "active"
                    );
                }
            }
        );
    }
);


/* =========================================================
   BW DROPDOWN
========================================================= */

if (
    bwDropdown &&
    bwDropdownSelected
) {

    bwDropdownSelected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            closeOtherDropdowns(
                bwDropdown
            );

            bwDropdown.classList.toggle(
                "active"
            );
        }
    );
}


/* =========================================================
   BW OPTIONS
========================================================= */

bwDropdownItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();

                const value =
                    item.dataset.value ||
                    "";

                if (
                    !isValidBW(value)
                ) {
                    return;
                }

                selectedBW =
                    value;

                updateBWDisplay();

                saveCurrentSystem();

                updateSystemSpecificValidation();

                if (bwDropdown) {

                    bwDropdown.classList.remove(
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
            !dropdown.contains(e.target)
        ) {
            dropdown.classList.remove(
                "active"
            );
        }

        if (
            typeDropdown &&
            !typeDropdown.contains(e.target)
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

        if (
            rncDropdown &&
            !rncDropdown.contains(e.target)
        ) {
            rncDropdown.classList.remove(
                "active"
            );
        }

        if (
            bwDropdown &&
            !bwDropdown.contains(e.target)
        ) {
            bwDropdown.classList.remove(
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

        closeOtherDropdowns(
            null
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
        String(system || "").trim();

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
   PARAMETER VALUE
========================================================= */

function getResultParameterValue(
    data,
    row,
    headers,
    keys
) {

    for (const key of keys) {

        if (
            data[key] !== undefined &&
            data[key] !== null &&
            String(
                data[key]
            ).trim() !== ""
        ) {

            return String(
                data[key]
            );
        }
    }


    const normalizeHeader =
        (header) => {

            return String(
                header || ""
            )
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
        };


    const normalizedKeys =
        keys.map(
            normalizeHeader
        );


    const index =
        headers.findIndex(
            (header) =>
                normalizedKeys.includes(
                    normalizeHeader(
                        header
                    )
                )
        );


    if (
        index >= 0 &&
        row[index] !== undefined &&
        row[index] !== null
    ) {

        return String(
            row[index]
        );
    }


    return "";
}


/* =========================================================
   RENDER GENERATED RESULT
========================================================= */

function renderGeneratedResult(
    data
) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        return `
            <p class="status-message error">
                Invalid response from server.
            </p>
        `;
    }


    if (data.error) {

        return `
            <p class="status-message error">
                ${escapeHtml(data.error)}
            </p>
        `;
    }


    const headers =
        Array.isArray(data.headers)
            ? [...data.headers]
            : [];


    const row =
        Array.isArray(data.row)
            ? [...data.row]
            : [];


    const currentSystem =
        String(
            data.system ||
            selectedSystem ||
            ""
        )
            .trim()
            .toUpperCase();


    const is3G =
        is3G2100System(
            currentSystem
        );

    const is4G =
        is4GSystem(
            currentSystem
        );

    const is5G =
        is5G2600System(
            currentSystem
        );


    /* =====================================================
       ENSURE SYSTEM-SPECIFIC PARAMETERS
    ===================================================== */

    const ensureParameter =
        (
            names,
            fallbackHeader
        ) => {

            const normalizeHeader =
                (header) => {

                    return String(
                        header || ""
                    )
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
                };


            const normalizedNames =
                names.map(
                    normalizeHeader
                );


            let index =
                headers.findIndex(
                    (header) =>
                        normalizedNames.includes(
                            normalizeHeader(
                                header
                            )
                        )
                );


            if (index < 0) {

                headers.push(
                    fallbackHeader
                );

                row.push("");

                index =
                    headers.length - 1;
            }


            return index;
        };


    /* 3G */

    if (is3G) {

        const rncIndex =
            ensureParameter(
                [
                    "RNC",
                    "RNC_NAME",
                    "RNCNAME"
                ],
                "RNC"
            );

        row[rncIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "rnc",
                    "RNC",
                    "rnc_name",
                    "rncName",
                    "RNC_NAME"
                ]
            ) ||
            selectedRNC ||
            "";


        const cellIndex =
            ensureParameter(
                [
                    "CELL_ID",
                    "CELLID",
                    "CELL_ID_"
                ],
                "CELL_ID"
            );

        row[cellIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "cell_id",
                    "cellId",
                    "CELL_ID",
                    "cellID"
                ]
            ) ||
            (
                cellIdInput
                    ? cellIdInput.value
                    : ""
            );


        const nodeIndex =
            ensureParameter(
                [
                    "NODEB_ID",
                    "NODEBID",
                    "NODEB_ID_"
                ],
                "NODEB_ID"
            );

        row[nodeIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "nodeb_id",
                    "nodebId",
                    "NODEB_ID",
                    "nodeBId"
                ]
            ) ||
            (
                nodebIdInput
                    ? nodebIdInput.value
                    : ""
            );


        const localIndex =
            ensureParameter(
                [
                    "LOCAL_CELLID",
                    "LOCAL_CELL_ID",
                    "LOCALCELLID"
                ],
                "LOCAL_CELLID"
            );

        row[localIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "local_cellid",
                    "local_cell_id",
                    "localCellId",
                    "localCellID",
                    "LOCAL_CELLID"
                ]
            ) ||
            (
                localCellIdInput
                    ? localCellIdInput.value
                    : ""
            );
    }


    /* 4G */

    if (is4G) {

        const cellIndex =
            ensureParameter(
                [
                    "CELL_ID",
                    "CELLID",
                    "CELL_ID_"
                ],
                "CELL_ID"
            );

        row[cellIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "cell_id",
                    "cellId",
                    "CELL_ID",
                    "cellID"
                ]
            ) ||
            (
                cellId4GInput
                    ? cellId4GInput.value
                    : ""
            );


        const nodeIndex =
            ensureParameter(
                [
                    "ENODEB_ID",
                    "ENODEBID",
                    "ENODEB_ID_",
                    "NODEB_ID",
                    "NODEBID"
                ],
                "ENODEB_ID"
            );

        row[nodeIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "enodeb_id",
                    "enodebId",
                    "ENODEB_ID",
                    "ENODEBID",
                    "nodeb_id",
                    "nodebId",
                    "NODEB_ID"
                ]
            ) ||
            (
                enodebIdInput
                    ? enodebIdInput.value
                    : ""
            );
    }


    /* 5G */

    if (is5G) {

        const cellIndex =
            ensureParameter(
                [
                    "CELL_ID",
                    "CELLID",
                    "CELL_ID_"
                ],
                "CELL_ID"
            );

        row[cellIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "cell_id",
                    "cellId",
                    "CELL_ID",
                    "cellID"
                ]
            ) ||
            (
                cellId5GInput
                    ? cellId5GInput.value
                    : ""
            );


        const nodeIndex =
            ensureParameter(
                [
                    "GNODEB_ID",
                    "GNODEBID",
                    "GNODEB_ID_"
                ],
                "GNODEB_ID"
            );

        row[nodeIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "gnodeb_id",
                    "gnodebId",
                    "GNODEB_ID",
                    "GNODEBID"
                ]
            ) ||
            (
                gnodebIdInput
                    ? gnodebIdInput.value
                    : ""
            );


        const bwIndex =
            ensureParameter(
                [
                    "BW",
                    "BANDWIDTH"
                ],
                "BW"
            );

        row[bwIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "bw",
                    "BW",
                    "bandwidth",
                    "BANDWIDTH"
                ]
            ) ||
            selectedBW ||
            "";


        const localIndex =
            ensureParameter(
                [
                    "LOCAL_CELLID",
                    "LOCAL_CELL_ID",
                    "LOCALCELLID"
                ],
                "LOCAL_CELLID"
            );

        row[localIndex] =
            getResultParameterValue(
                data,
                row,
                headers,
                [
                    "local_cellid",
                    "local_cell_id",
                    "localCellId",
                    "LOCAL_CELLID"
                ]
            ) ||
            (
                cellId5GInput
                    ? cellId5GInput.value
                    : ""
            );


        if (localIndex >= 0) {

            row[localIndex] =
                getResultParameterValue(
                    data,
                    row,
                    headers,
                    [
                        "local_cellid",
                        "local_cell_id",
                        "localCellId",
                        "LOCAL_CELLID"
                    ]
                ) ||
                (
                    cellId5GInput
                        ? cellId5GInput.value
                        : ""
                );
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

    const generateParameterRow =
        (
            header,
            index
        ) => {

            let value =
                String(
                    row[index] ?? ""
                ).trim();


            const normalizedHeader =
                String(
                    header || ""
                )
                    .trim()
                    .toUpperCase();


            if (
                (
                    is3G &&
                    (
                        normalizedHeader.startsWith(
                            "CELL_ID"
                        ) ||
                        normalizedHeader.startsWith(
                            "NODEB_ID"
                        ) ||
                        normalizedHeader.startsWith(
                            "LOCAL_CELLID"
                        )
                    )
                ) ||
                (
                    is4G &&
                    (
                        normalizedHeader.startsWith(
                            "CELL_ID"
                        ) ||
                        normalizedHeader.startsWith(
                            "ENODEB_ID"
                        ) ||
                        normalizedHeader.startsWith(
                            "LOCAL_CELLID"
                        )
                    )
                ) ||
                (
                    is5G &&
                    (
                        normalizedHeader.startsWith(
                            "CELL_ID"
                        ) ||
                        normalizedHeader.startsWith(
                            "GNODEB_ID"
                        ) ||
                        normalizedHeader.startsWith(
                            "LOCAL_CELLID"
                        )
                    )
                )
            ) {

                value =
                    value.replace(
                        /^0+(?=\d)/,
                        ""
                    );
            }


            const isLong =
                value.length >
                MAX_VISIBLE_LENGTH;


            if (!isLong) {

                return `
                    <tr class="generated-parameter-row">

                        <th>
                            ${escapeHtml(
                                header
                            )}
                        </th>

                        <td>
                            ${escapeHtml(
                                value
                            )}
                        </td>

                    </tr>
                `;
            }


            const shortValue =
                value.slice(
                    0,
                    MAX_VISIBLE_LENGTH
                ) + "...";


            return `
                <tr class="generated-parameter-row parameter-long-row">

                    <th>
                        ${escapeHtml(
                            header
                        )}
                    </th>

                    <td>

                        <div class="parameter-value-container">

                            <span class="parameter-value-short">
                                ${escapeHtml(
                                    shortValue
                                )}
                            </span>

                            <span class="parameter-value-full hidden">
                                ${escapeHtml(
                                    value
                                )}
                            </span>

                            <button
                                type="button"
                                class="parameter-expand-btn"
                                aria-expanded="false"
                                aria-label="Show full value"
                                title="Show full value"
                            >
                                <span class="parameter-expand-icon"></span>
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
                <div class="parameter-list-toggle">

                    <button
                        type="button"
                        class="parameter-list-toggle-btn"
                        aria-expanded="false"
                        aria-label="Show All Parameters"
                    >

                        <span class="parameter-list-toggle-circle">

                            <span class="parameter-list-toggle-arrow"></span>

                        </span>

                    </button>

                    <span class="parameter-list-toggle-label">
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
       RNC
    ===================================================== */

    const displayRNC =
        data.rnc ||
        data.RNC ||
        selectedRNC ||
        "";


    /* =====================================================
       BW
    ===================================================== */

    const displayBW =
        data.bw ||
        data.BW ||
        selectedBW ||
        "";


    /* =====================================================
       CELL COUNT
    ===================================================== */

    const displayCellCount =
        data.cellCount ||
        (
            cellCountInput
                ? cellCountInput.value
                : CELL_COUNT_MIN
        );


    /* =====================================================
    RESULT
    ===================================================== */

    return `

        <div class="autogen-summary">

            <p>
                <strong>SYSTEM:</strong>
                ${escapeHtml(system)}
            </p>


            ${
                is3G
                    ? `
                        <p>
                            <strong>RNC:</strong>
                            ${escapeHtml(
                                displayRNC
                            )}
                        </p>
                    `
                    : ""
            }


            <p>
                <strong>SITE CODE:</strong>
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


            ${
                is3G
                    ? `
                        <p>
                            <strong>NODEB ID:</strong>
                            ${escapeHtml(
                                nodebIdInput
                                    ? nodebIdInput.value
                                    : ""
                            )}
                        </p>
                    `
                    : ""
            }


            ${
                is4G
                    ? `
                        <p>
                            <strong>ENODEB ID:</strong>
                            ${escapeHtml(
                                enodebIdInput
                                    ? enodebIdInput.value
                                    : ""
                            )}
                        </p>
                    `
                    : ""
            }


            ${
                is5G
                    ? `
                        <p>
                            <strong>GNODEB ID:</strong>
                            ${escapeHtml(
                                gnodebIdInput
                                    ? gnodebIdInput.value
                                    : ""
                            )}
                        </p>
                    `
                    : ""
            }


            ${
                is5G
                    ? `
                        <p>
                            <strong>BW:</strong>
                            ${escapeHtml(
                                displayBW
                            )}
                        </p>
                    `
                    : ""
            }


            <p>
                <strong>TYPE:</strong>
                ${escapeHtml(displayType)}
            </p>


            ${
                is3G || is4G || is5G
                    ? `
                        <p>
                            <strong>TOWER TYPE:</strong>
                            ${escapeHtml(
                                displayTowerType
                            )}
                        </p>

                        <p>
                            <strong>CELL COUNT:</strong>
                            ${escapeHtml(
                                displayCellCount
                            )}
                        </p>
                    `
                    : ""
            }


            <p>
                <strong>FILE:</strong>
                ${escapeHtml(fileName)}
            </p>

        </div>


        <div class="result-table-wrapper">

            <table class="autogen-table">

                <thead>

                    <tr>
                        <th>Parameter</th>
                        <th>Generated Value</th>
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

            /* LONG VALUE */

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


            /* PARAMETER LIST */

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
   AUTO GENERATE
========================================================= */

if (autoBtn) {

    autoBtn.addEventListener(
        "click",
        async () => {

            /* =================================================
               SYSTEM
            ================================================= */

            if (!selectedSystem) {

                if (result) {

                    result.innerHTML = `
                        <p class="status-message warning">
                            Please select a system first.
                        </p>
                    `;

                    result.classList.remove(
                        "hidden"
                    );
                }

                return;
            }


            /* =================================================
               BASIC VALIDATION
            ================================================= */

            const siteValid =
                siteCodeInput &&
                isValidSiteCode(
                    siteCodeInput.value
                );


            const nodebValid =
                nodebNameInput &&
                isValidNodebName(
                    nodebNameInput.value
                );


            /* =================================================
               AUTO TYPE
            ================================================= */

            const autoType =
                getAutoType(
                    nodebNameInput
                        ? nodebNameInput.value
                        : ""
                );


            if (autoType) {

                selectedType =
                    autoType;

                updateTypeDisplay();
            }


            const typeValid =
                isValidType(
                    selectedType
                );


            /* =================================================
               SYSTEM
            ================================================= */

            const is3G =
                is3G2100System(
                    selectedSystem
                );

            const is4G =
                is4GSystem(
                    selectedSystem
                );

            const is5G =
                is5G2600System(
                    selectedSystem
                );

            const hasCell =
                hasCellParameters(
                    selectedSystem
                );


            /* =================================================
               TOWER TYPE
            ================================================= */

            const towerTypeValid =
                !(
                    is3G ||
                    is4G ||
                    is5G
                ) ||
                Boolean(
                    selectedTowerType &&
                    String(
                        selectedTowerType
                    ).trim() !== ""
                );


            /* =================================================
               RNC
            ================================================= */

            const rncValid =
                !is3G ||
                isValidRNC(
                    selectedRNC
                );


            /* =================================================
               BW
               5G ONLY
            ================================================= */

            const bwValid =
                !is5G ||
                isValidBW(
                    selectedBW
                );


            /* =================================================
               CELL ID
            ================================================= */

            const activeCellInput =
                getActiveCellInput(
                    selectedSystem
                );


            const cellValid =
                !hasCell ||
                (
                    activeCellInput &&
                    isValidFixedNumber(
                        activeCellInput.value,
                        getCellIdLength(
                            selectedSystem
                        )
                    )
                );


            /* =================================================
               NODE ID
            ================================================= */

            const activeNodeIdInput =
                getActiveNodeIdInput(
                    selectedSystem
                );


            const nodebIdValid =
                !hasCell ||
                (
                    activeNodeIdInput &&
                    isValidFixedNumber(
                        activeNodeIdInput.value,
                        getNodeIdLength(
                            selectedSystem
                        )
                    )
                );


            /* =================================================
               LOCAL CELLID
            ================================================= */

            let localCellIdValid =
                true;


            if (is3G) {

                localCellIdValid =
                    localCellIdInput &&
                    isValidFixedNumber(
                        localCellIdInput.value,
                        getLocalCellIdLength(
                            selectedSystem
                        )
                    );
            }


            if (is4G) {

                sync4GLocalCellId();
            }


            if (is5G) {

                sync5GLocalCellId();
            }


            /* =================================================
               CELL COUNT
            ================================================= */

            const cellCountValue =
                cellCountInput
                    ? parseInt(
                        cellCountInput.value,
                        10
                    )
                    : CELL_COUNT_MIN;


            const cellCountValid =
                !hasCell ||
                (
                    Number.isInteger(
                        cellCountValue
                    ) &&
                    cellCountValue >=
                        CELL_COUNT_MIN &&
                    cellCountValue <=
                        CELL_COUNT_MAX
                );


            /* =================================================
               ALL REQUIRED
            ================================================= */

            const allValid =
                siteValid &&
                nodebValid &&
                typeValid &&
                towerTypeValid &&
                cellValid &&
                nodebIdValid &&
                bwValid &&
                rncValid &&
                localCellIdValid &&
                cellCountValid;


            /* =================================================
            BLOCK AUTOGEN
            ================================================= */

            if (!allValid) {

                if (result) {

                    let message =
                        "Please complete all required parameters correctly.";


                    if (!siteValid) {

                        message =
                            "Please enter a valid SITE CODE.";

                    } else if (!nodebValid) {

                        message =
                            `Please enter a valid ${getNodeNameLabel(selectedSystem)}.`;

                    } else if (!typeValid) {

                        message =
                            "TYPE could not be determined automatically.";

                    } else if (
                        (
                            is3G ||
                            is4G ||
                            is5G
                        ) &&
                        !towerTypeValid
                    ) {

                        message =
                            "Please select TOWER TYPE.";

                    /* =================================================
                    CELL ID
                    3G / 4G / 5G
                    ================================================= */

                    } else if (
                        is3G &&
                        !cellValid
                    ) {

                        message =
                            "Please enter a valid CELL ID.";

                    } else if (
                        is4G &&
                        !cellValid
                    ) {

                        message =
                            "Please enter a valid CELL ID / LOCAL CELLID.";

                    } else if (
                        is5G &&
                        !cellValid
                    ) {

                        message =
                            "Please enter a valid CELL ID / LOCAL CELLID.";

                    /* =================================================
                    NODE ID
                    3G / 4G / 5G
                    ================================================= */

                    } else if (
                        is3G &&
                        !nodebIdValid
                    ) {

                        message =
                            "Please enter a valid NODEB ID.";

                    } else if (
                        is4G &&
                        !nodebIdValid
                    ) {

                        message =
                            "Please enter a valid ENODEB ID.";

                    } else if (
                        is5G &&
                        !nodebIdValid
                    ) {

                        message =
                            "Please enter a valid GNODEB ID.";

                    /* =================================================
                    BW
                    5G ONLY
                    ================================================= */

                    } else if (
                        is5G &&
                        !bwValid
                    ) {

                        message =
                            "Please select BW.";

                    /* =================================================
                    RNC
                    3G ONLY
                    ================================================= */

                    } else if (
                        is3G &&
                        !rncValid
                    ) {

                        message =
                            "Please select RNC.";

                    /* =================================================
                    LOCAL CELLID
                    3G ONLY
                    ================================================= */

                    } else if (
                        is3G &&
                        !localCellIdValid
                    ) {

                        message =
                            "Please enter a valid LOCAL CELLID.";

                    /* =================================================
                    CELL COUNT
                    ================================================= */

                    } else if (
                        hasCell &&
                        !cellCountValid
                    ) {

                        message =
                            "Please enter a valid CELL COUNT between 1 and 10.";
                    }


                    result.innerHTML = `
                        <p class="status-message warning">
                            ${escapeHtml(
                                message
                            )}
                        </p>
                    `;

                    result.classList.remove(
                        "hidden"
                    );
                }


                updateValidation();

                updateSystemSpecificValidation();

                return;
            }


            /* =================================================
               SYNC
            ================================================= */

            if (is4G) {
                sync4GLocalCellId();
            }

            if (is5G) {
                sync5GLocalCellId();
            }


            /* =================================================
               SAVE
            ================================================= */

            saveCurrentSystem();


            /* =================================================
               LOADING
            ================================================= */

            if (result) {

                result.innerHTML = `
                    <p class="status-message">
                        Generating parameters...
                    </p>
                `;

                result.classList.remove(
                    "hidden"
                );
            }


            /* =================================================
               DEPLOY.JS
            ================================================= */

            try {

                await ensureDeployReady();

                const activeCellInput =
                    getActiveCellInput(
                        selectedSystem
                    );

                const activeNodeInput =
                    getActiveNodeIdInput(
                        selectedSystem
                    );

                /* =================================================
                   GENERATE PARAMETERS
                ================================================= */

                const data =
                    await window.AutoGenDeploy.generate({

                        system:
                            selectedSystem,

                        site_code:
                            siteCodeInput
                                ? siteCodeInput.value
                                : "",

                        nodeb_name:
                            nodebNameInput
                                ? nodebNameInput.value
                                : "",

                        type:
                            selectedType,

                        tower_type:
                            (
                                is3G ||
                                is4G ||
                                is5G
                            )
                                ? selectedTowerType
                                : "",

                        rnc:
                            is3G
                                ? selectedRNC
                                : "",

                        cell_id:
                            hasCell &&
                            activeCellInput
                                ? activeCellInput.value
                                : "",

                        nodeb_id:
                            is3G || is4G
                                ? (
                                    activeNodeInput
                                        ? activeNodeInput.value
                                        : ""
                                )
                                : "",

                        gnodeb_id:
                            is5G
                                ? (
                                    gnodebIdInput
                                        ? gnodebIdInput.value
                                        : ""
                                )
                                : "",

                        local_cellid:
                            is3G
                                ? (
                                    localCellIdInput
                                        ? localCellIdInput.value
                                        : ""
                                )
                                : is5G
                                    ? (
                                        localCellId5GInput
                                            ? localCellId5GInput.value
                                            : ""
                                    )
                                    : is4G
                                        ? (
                                            activeCellInput
                                                ? activeCellInput.value
                                                : ""
                                        )
                                        : "",

                        bw:
                            is5G
                                ? selectedBW
                                : "",

                        cell_count:
                            hasCell &&
                            cellCountInput
                                ? String(
                                    cellCountInput.value
                                )
                                : "1"
                    });

                /* =================================================
                   RENDER
                ================================================= */

                if (data && data.error) {
                    throw new Error(
                        data.error
                    );
                }

                if (result) {

                    result.innerHTML =
                        renderGeneratedResult(
                            data
                        );

                    result.classList.remove(
                        "hidden"
                    );
                }

            } catch (error) {


                console.error(
                    "AutoGen Error:",
                    error
                );


                if (result) {

                    result.innerHTML = `
                        <p class="status-message error">
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

            /* RESULT */

            if (result) {

                result.innerHTML = "";

                result.classList.add(
                    "hidden"
                );
            }


            /* SYSTEM */

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


            /* ALL SYSTEM DATA */

            items.forEach(
                (item) => {

                    const system =
                        item.dataset.value ||
                        "";

                    if (system) {

                        systemParameters[
                            system
                        ] =
                            createDefaultSystemData();
                    }
                }
            );


            /* SITE CODE */

            if (siteCodeInput) {

                siteCodeInput.value = "";
            }


            /* NODE NAME */

            if (nodebNameInput) {

                nodebNameInput.value = "";

                nodebNameInput.placeholder =
                    "NODEB NAME";
            }


            /* TYPE */

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


            /* TOWER TYPE */

            selectedTowerType = "";

            updateTowerTypeDisplay();


            /* RNC */

            selectedRNC = "";

            updateRNCDisplay();


            /* BW */

            selectedBW = "";

            updateBWDisplay();


            /* 3G */

            if (cellIdInput) {
                cellIdInput.value = "";
            }

            if (nodebIdInput) {
                nodebIdInput.value = "";
            }

            if (localCellIdInput) {
                localCellIdInput.value = "";
            }


            /* 4G */

            if (cellId4GInput) {
                cellId4GInput.value = "";
            }

            if (enodebIdInput) {
                enodebIdInput.value = "";
            }


            /* 5G */

            if (cellId5GInput) {
                cellId5GInput.value = "";
            }

            if (localCellId5GInput) {
                localCellId5GInput.value = "";
            }

            if (gnodebIdInput) {
                gnodebIdInput.value = "";
            }


            /* CELL COUNT */

            if (cellCountInput) {

                cellCountInput.value =
                    String(
                        CELL_COUNT_MIN
                    );
            }


            /* STATUS */

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
                rncStatus,
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

            setValidStatus(
                cellId4GStatus,
                false
            );

            setValidStatus(
                enodebIdStatus,
                false
            );

            setValidStatus(
                cellId5GStatus,
                false
            );

            setValidStatus(
                gnodebIdStatus,
                false
            );


            /* HINT */

            if (nodebHint) {

                nodebHint.classList.add(
                    "hidden"
                );
            }


            /* HIDE SYSTEM FIELDS */

            updateSystemSpecificFields(
                ""
            );


            /* HIDE FORM */

            if (parameterForm) {

                parameterForm.classList.add(
                    "hidden"
                );
            }


            /* CLOSE DROPDOWNS */

            closeOtherDropdowns(
                null
            );
        }
    );
}


/* =========================================================
   INITIAL STATE
========================================================= */

if (cellCountInput) {

    cellCountInput.value =
        String(
            CELL_COUNT_MIN
        );
}


updateSystemSpecificFields(
    selectedSystem
);


updateValidation();
updateSystemSpecificValidation();

