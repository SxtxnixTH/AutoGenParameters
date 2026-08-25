/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggleBtn =
    document.getElementById("theme-toggle");

if (themeToggleBtn) {

    const savedTheme =
        localStorage.getItem("autogen-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    const updateThemeButton = () => {

        const isLightTheme =
            document.body.classList.contains("light-theme");

        themeToggleBtn.textContent =
            isLightTheme
                ? "☀️ Light"
                : "🌙 Dark";
    };

    updateThemeButton();

    themeToggleBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("light-theme");

            const isLightTheme =
                document.body.classList.contains("light-theme");

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
   CURSOR GLOW
========================================================= */

const glow =
    document.querySelector(".cursor-glow");

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
   ELEMENTS
========================================================= */

const autoBtn =
    document.getElementById("autogen-btn");

const clearBtn =
    document.getElementById("clear-btn");

const result =
    document.getElementById("result");

const dropdown =
    document.querySelector(".system-dropdown");

const selected =
    document.getElementById(
        "dropdownSelected"
    );

const selectedText =
    document.getElementById(
        "selectedText"
    );

const items =
    document.querySelectorAll(
        "#dropdownList li"
    );


/* =========================================================
   SYSTEM
========================================================= */

let selectedSystem = "";


/* =========================================================
   PARAMETER FORM
========================================================= */

const parameterForm =
    document.getElementById(
        "parameter-form"
    );

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
   SYSTEM → NODE NAME
========================================================= */

function getNodeNameLabel(system) {

    if (system.startsWith("3G")) {
        return "NODEB NAME";
    }

    if (system.startsWith("4G")) {
        return "ENODEB NAME";
    }

    if (system.startsWith("5G")) {
        return "GNODEB NAME";
    }

    return "NODEB NAME";
}


/* =========================================================
   TYPE DROPDOWN
========================================================= */

const typeDropdown =
    document.getElementById(
        "typeDropdown"
    );

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

let selectedType = "";


/* =========================================================
   SYSTEM DATA
========================================================= */

const systemParameters = {};

items.forEach(
    (item) => {

        const system =
            item.dataset.value || "";

        if (system) {

            systemParameters[system] = {
                siteCode: "",
                nodebName: "",
                type: ""
            };
        }
    }
);


/* =========================================================
   VALIDATION
========================================================= */

function isValidSiteCode(value) {

    return /^[A-Za-z0-9]{5}$/.test(
        value
    );
}


function isValidNodebName(value) {

    return (
        /^[A-Za-z0-9]{5}$/.test(
            value
        )
        ||
        /^[A-Za-z0-9]{5}_D[1-9]$/.test(
            value
        )
    );
}


function isValidType(value) {

    return (
        value === "NODE"
        ||
        value === "DISTRIBUTED"
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

    /*
        TYPE ไม่มีไฟเขียว
    */

    if (element === typeStatus) {

        element.classList.remove(
            "valid"
        );

        return;
    }

    element.classList.toggle(
        "valid",
        valid
    );
}


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
            selectedType || ""
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
        systemParameters[
            system
        ] || {

            siteCode: "",
            nodebName: "",
            type: ""
        };


    /* -----------------------------------------
       UPDATE NODE NAME LABEL
    ----------------------------------------- */

    if (nodebNameInput) {

        nodebNameInput.placeholder =
            getNodeNameLabel(
                system
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
       NODEB / ENODEB / GNODEB NAME
    ----------------------------------------- */

    if (nodebNameInput) {

        nodebNameInput.value =
            data.nodebName || "";
    }


    /* -----------------------------------------
       TYPE
    ----------------------------------------- */

    selectedType =
        data.type || "";


    if (typeSelectedText) {

        typeSelectedText.textContent =
            selectedType || "TYPE";
    }


    /* -----------------------------------------
       SELECTED TYPE STYLE
    ----------------------------------------- */

    typeDropdownItems.forEach(
        (item) => {

            item.classList.toggle(
                "selected",
                item.dataset.value ===
                    selectedType
            );
        }
    );


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

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


    /* -----------------------------------------
       SITE CODE
    ----------------------------------------- */

    setValidStatus(
        siteCodeStatus,
        siteValid
    );


    /* -----------------------------------------
       NODEB NAME
    ----------------------------------------- */

    setValidStatus(
        nodebNameStatus,
        nodebValid
    );


    /* -----------------------------------------
       TYPE
       ไม่มีสีเขียว
    ----------------------------------------- */

    setValidStatus(
        typeStatus,
        typeValid
    );


    /* -----------------------------------------
       NODEB HINT
    ----------------------------------------- */

    if (
        nodebHint &&
        nodebNameInput
    ) {

        const value =
            nodebNameInput.value;

        const showHint =
            /^[A-Za-z0-9]{5}_$/.test(
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

            let value =
                siteCodeInput.value
                    .replace(
                        /[^A-Za-z0-9]/g,
                        ""
                    )
                    .slice(0, 5);

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
                nodebNameInput.value;


            /* =====================================
               FIRST 5 CHARACTERS
            ===================================== */

            const firstFive =
                value
                    .slice(0, 5)
                    .replace(
                        /[^A-Za-z0-9]/g,
                        ""
                    );


            /* =====================================
               ยังไม่ครบ 5 ตัว
            ===================================== */

            if (value.length <= 5) {

                nodebNameInput.value =
                    firstFive;

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* =====================================
               CHARACTER 6
               ต้องเป็น _
            ===================================== */

            if (
                value.charAt(5) !== "_"
            ) {

                nodebNameInput.value =
                    firstFive;

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* =====================================
               หลัง _ ต้องเป็น D
            ===================================== */

            let suffix =
                value.slice(6);


            if (suffix.length === 0) {

                nodebNameInput.value =
                    firstFive + "_";

                saveCurrentSystem();

                updateValidation();

                return;
            }


            if (
                suffix.charAt(0) !== "D"
            ) {

                nodebNameInput.value =
                    firstFive + "_";

                saveCurrentSystem();

                updateValidation();

                return;
            }


            /* =====================================
               หลัง D ต้องเป็น 1-9
            ===================================== */

            let number =
                suffix
                    .slice(1)
                    .replace(
                        /[^1-9]/g,
                        ""
                    );

            number =
                number.slice(0, 1);


            nodebNameInput.value =
                firstFive +
                "_D" +
                number;

            saveCurrentSystem();

            updateValidation();
        }
    );
}


/* =========================================================
   TYPE CUSTOM DROPDOWN
========================================================= */

if (
    typeDropdown &&
    typeDropdownSelected
) {

    typeDropdownSelected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();


            /*
                CLOSE SYSTEM DROPDOWN FIRST

                ป้องกัน SYSTEM และ TYPE
                เปิดพร้อมกัน
            */

            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );
            }


            /*
                TOGGLE TYPE DROPDOWN
            */

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


                /* -----------------------------------------
                   REMOVE SELECTED
                ----------------------------------------- */

                typeDropdownItems.forEach(
                    (x) => {

                        x.classList.remove(
                            "selected"
                        );
                    }
                );


                /* -----------------------------------------
                   SET SELECTED
                ----------------------------------------- */

                item.classList.add(
                    "selected"
                );


                /* -----------------------------------------
                   GET TYPE
                ----------------------------------------- */

                selectedType =
                    item.dataset.value || "";


                /* -----------------------------------------
                   UPDATE TEXT
                ----------------------------------------- */

                if (typeSelectedText) {

                    typeSelectedText.textContent =
                        selectedType || "TYPE";
                }


                /* -----------------------------------------
                   SAVE
                ----------------------------------------- */

                saveCurrentSystem();


                /* -----------------------------------------
                   VALIDATE
                ----------------------------------------- */

                updateValidation();


                /* -----------------------------------------
                   CLOSE TYPE
                ----------------------------------------- */

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

if (
    selected &&
    dropdown
) {

    selected.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();


            /*
                CLOSE TYPE DROPDOWN FIRST

                ป้องกัน SYSTEM และ TYPE
                เปิดพร้อมกัน
            */

            if (typeDropdown) {

                typeDropdown.classList.remove(
                    "active"
                );
            }


            /*
                TOGGLE SYSTEM DROPDOWN
            */

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
                   REMOVE SELECTED
                ----------------------------------------- */

                items.forEach(
                    (x) => {

                        x.classList.remove(
                            "selected"
                        );
                    }
                );


                /* -----------------------------------------
                   SET SELECTED
                ----------------------------------------- */

                item.classList.add(
                    "selected"
                );


                /* -----------------------------------------
                   GET SYSTEM
                ----------------------------------------- */

                selectedSystem =
                    item.dataset.value || "";


                /* -----------------------------------------
                   UPDATE SYSTEM TEXT
                ----------------------------------------- */

                if (selectedText) {

                    selectedText.textContent =
                        selectedSystem;
                }


                /* -----------------------------------------
                   UPDATE NODE NAME PLACEHOLDER
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
                   LOAD SYSTEM
                ----------------------------------------- */

                loadSystem(
                    selectedSystem
                );


                /* -----------------------------------------
                   CLOSE SYSTEM
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


        /* -----------------------------------------
           SYSTEM
        ----------------------------------------- */

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


        /* -----------------------------------------
           TYPE
        ----------------------------------------- */

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
    }
);


/* =========================================================
   ESC KEY → CLOSE ALL DROPDOWNS
========================================================= */

document.addEventListener(
    "keydown",
    (e) => {

        if (e.key === "Escape") {

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
        }
    }
);


/* =========================================================
   AUTO GENERATE
   GitHub Pages / Static Version
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function renderGeneratedResult(data) {

    const rows =
        data.headers
            .map(
                (header, index) => {

                    const value =
                        data.row[index];

                    return `
                        <tr>
                            <th>${escapeHtml(header)}</th>
                            <td>${escapeHtml(value)}</td>
                        </tr>
                    `;
                }
            )
            .join("");


    return `
        <div class="autogen-summary">

            <p>
                <strong>SYSTEM:</strong>
                ${escapeHtml(data.system)}
            </p>

            <p>
                <strong>SITE CODE:</strong>
                ${escapeHtml(data.siteCode)}
            </p>

            <p>
                <strong>${escapeHtml(
                    getNodeNameLabel(data.system)
                )}:</strong>
                ${escapeHtml(data.nodebName)}
            </p>

            <p>
                <strong>TYPE:</strong>
                ${escapeHtml(data.type)}
            </p>

            <p>
                <strong>DATASET:</strong>
                ${escapeHtml(data.filePath)}
            </p>

            <p>
                <strong>SHEET:</strong>
                ${escapeHtml(data.sheetName)}
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

        </div>
    `;
}


if (autoBtn) {

    autoBtn.addEventListener(
        "click",
        async () => {


            /* -----------------------------------------
               CHECK SYSTEM
            ----------------------------------------- */

            if (!selectedSystem) {

                result.innerHTML = `
                    <p class="status-message warning">
                        Please select a system first.
                    </p>
                `;

                result.classList.remove(
                    "hidden"
                );

                return;
            }


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

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


            if (
                !siteValid ||
                !nodebValid ||
                !typeValid
            ) {

                result.innerHTML = `
                    <p class="status-message warning">
                        Please complete all parameters correctly.
                    </p>
                `;

                result.classList.remove(
                    "hidden"
                );

                updateValidation();

                return;
            }


            /* -----------------------------------------
               SAVE CURRENT SYSTEM
            ----------------------------------------- */

            saveCurrentSystem();


            /* -----------------------------------------
               LOADING
            ----------------------------------------- */

            result.innerHTML = `
                <p class="status-message">
                    Loading dataset...
                </p>
            `;

            result.classList.remove(
                "hidden"
            );


            /* -----------------------------------------
               LOAD DATASET
            ----------------------------------------- */

            try {

                const data =
                    await generateFromDataset(
                        selectedSystem,
                        siteCodeInput.value,
                        nodebNameInput.value,
                        selectedType
                    );


                result.innerHTML =
                    renderGeneratedResult(
                        data
                    );

                result.classList.remove(
                    "hidden"
                );

            } catch (error) {

                console.error(
                    "AutoGen Error:",
                    error
                );

                result.innerHTML = `
                    <p class="status-message error">
                        ${escapeHtml(
                            error &&
                            error.message
                                ? error.message
                                : "Failed to load dataset."
                        )}
                    </p>
                `;

                result.classList.remove(
                    "hidden"
                );
            }
        }
    );
}


/* =========================================================
   CLEAR RESULT
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
               RESET SYSTEM TEXT
            ----------------------------------------- */

            if (selectedText) {

                selectedText.textContent =
                    "SYSTEM";
            }


            /* -----------------------------------------
               RESET SYSTEM
            ----------------------------------------- */

            selectedSystem =
                "";


            /* -----------------------------------------
               REMOVE SYSTEM SELECTED
            ----------------------------------------- */

            items.forEach(
                (item) => {

                    item.classList.remove(
                        "selected"
                    );
                }
            );


            /* -----------------------------------------
               CLEAR ALL SYSTEM DATA
            ----------------------------------------- */

            items.forEach(
                (item) => {

                    const system =
                        item.dataset.value || "";

                    if (system) {

                        systemParameters[
                            system
                        ] = {

                            siteCode: "",
                            nodebName: "",
                            type: ""
                        };
                    }
                }
            );


            /* -----------------------------------------
               CLEAR SITE CODE
            ----------------------------------------- */

            if (siteCodeInput) {

                siteCodeInput.value =
                    "";
            }


            /* -----------------------------------------
               CLEAR NODEB / ENODEB / GNODEB NAME
            ----------------------------------------- */

            if (nodebNameInput) {

                nodebNameInput.value =
                    "";

                nodebNameInput.placeholder =
                    "NODEB NAME";
            }


            /* -----------------------------------------
               CLEAR TYPE
            ----------------------------------------- */

            selectedType =
                "";


            if (typeSelectedText) {

                typeSelectedText.textContent =
                    "TYPE";
            }


            /* -----------------------------------------
               REMOVE TYPE SELECTED
            ----------------------------------------- */

            typeDropdownItems.forEach(
                (item) => {

                    item.classList.remove(
                        "selected"
                    );
                }
            );


            /* -----------------------------------------
               CLEAR STATUS
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


            /* -----------------------------------------
               HIDE NODEB HINT
            ----------------------------------------- */

            if (nodebHint) {

                nodebHint.classList.add(
                    "hidden"
                );
            }


            /* -----------------------------------------
               HIDE FORM
            ----------------------------------------- */

            if (parameterForm) {

                parameterForm.classList.add(
                    "hidden"
                );
            }


            /* -----------------------------------------
               CLOSE SYSTEM
            ----------------------------------------- */

            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );
            }


            /* -----------------------------------------
               CLOSE TYPE
            ----------------------------------------- */

            if (typeDropdown) {

                typeDropdown.classList.remove(
                    "active"
                );
            }
        }
    );
}

