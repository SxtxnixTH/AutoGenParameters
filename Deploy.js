/* =========================================================
   AUTOGEN PARAMETERS - DEPLOY.JS
   ---------------------------------------------------------
   GitHub Pages / Static Deployment

   Python Data.py equivalent:
   - Select dataset by system
   - Read first worksheet
   - Read header row
   - Read first data row
   - Replace matching columns with user input
   - Return generated parameter data

   Dataset mapping:

   3G* -> Datasets/Template_MP_Cell3G.xlsx
   4G* -> Datasets/Template_MP_Cell4G.xlsx
   5G* -> Datasets/Template_MP_Cell5G.xlsx
========================================================= */


/* =========================================================
   DATASET FILES
========================================================= */

const DATASET_FILES = Object.freeze({

    "3G":
        "Datasets/Template_MP_Cell3G.xlsx",

    "4G":
        "Datasets/Template_MP_Cell4G.xlsx",

    "5G":
        "Datasets/Template_MP_Cell5G.xlsx"

});


/* =========================================================
   WORKBOOK CACHE
========================================================= */

const workbookCache =
    new Map();


/* =========================================================
   GET DATASET FILE
   Equivalent to Python get_dataset_file()
========================================================= */

function getDatasetFile(system) {

    system =
        String(system || "")
            .trim()
            .toUpperCase();


    if (system.startsWith("3G")) {

        return DATASET_FILES["3G"];

    }


    if (system.startsWith("4G")) {

        return DATASET_FILES["4G"];

    }


    if (system.startsWith("5G")) {

        return DATASET_FILES["5G"];

    }


    throw new Error(
        `Unsupported system: ${system}`
    );
}


/* =========================================================
   LOAD EXCEL FILE
========================================================= */

async function loadExcelFile(filePath) {

    /* -----------------------------------------
       CACHE
    ----------------------------------------- */

    if (
        workbookCache.has(
            filePath
        )
    ) {

        return workbookCache.get(
            filePath
        );

    }


    /* -----------------------------------------
       CHECK SHEETJS
    ----------------------------------------- */

    if (
        typeof XLSX === "undefined"
    ) {

        throw new Error(
            "SheetJS failed to load. Check the SheetJS script in index.html."
        );

    }


    /* -----------------------------------------
       FETCH DATASET
    ----------------------------------------- */

    let response;

    try {

        response =
            await fetch(
                filePath,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );

    } catch (error) {

        throw new Error(
            `Failed to load dataset: ${filePath}`
        );

    }


    /* -----------------------------------------
       CHECK RESPONSE
    ----------------------------------------- */

    if (!response.ok) {

        throw new Error(
            `Failed to load dataset (${response.status}): ${filePath}`
        );

    }


    /* -----------------------------------------
       READ ARRAY BUFFER
    ----------------------------------------- */

    const arrayBuffer =
        await response.arrayBuffer();


    if (
        !arrayBuffer.byteLength
    ) {

        throw new Error(
            `Dataset is empty: ${filePath}`
        );

    }


    /* -----------------------------------------
       READ WORKBOOK
    ----------------------------------------- */

    let workbook;

    try {

        workbook =
            XLSX.read(
                arrayBuffer,
                {
                    type: "array",
                    cellDates: false
                }
            );

    } catch (error) {

        throw new Error(
            `Failed to read dataset: ${error.message}`
        );

    }


    /* -----------------------------------------
       CHECK WORKSHEET
    ----------------------------------------- */

    if (
        !workbook.SheetNames ||
        workbook.SheetNames.length === 0
    ) {

        throw new Error(
            `Dataset does not contain any worksheet: ${filePath}`
        );

    }


    /* -----------------------------------------
       CACHE
    ----------------------------------------- */

    workbookCache.set(
        filePath,
        workbook
    );


    return workbook;
}


/* =========================================================
   GET FIRST SHEET
   Equivalent to Python excel.sheet_names[0]
========================================================= */

function getFirstSheet(workbook) {

    if (
        !workbook ||
        !Array.isArray(
            workbook.SheetNames
        )
    ) {

        throw new Error(
            "Invalid Excel workbook."
        );

    }


    if (
        workbook.SheetNames.length === 0
    ) {

        throw new Error(
            "Dataset does not contain any worksheet."
        );

    }


    const firstSheetName =
        workbook.SheetNames[0];


    const worksheet =
        workbook.Sheets[
            firstSheetName
        ];


    if (!worksheet) {

        throw new Error(
            `Worksheet not found: ${firstSheetName}`
        );

    }


    return {

        name:
            firstSheetName,

        worksheet:
            worksheet

    };
}


/* =========================================================
   GET FIRST SHEET DATA
   Equivalent to pandas.read_excel()
========================================================= */

function getFirstSheetData(workbook) {

    const {
        name,
        worksheet
    } =
        getFirstSheet(
            workbook
        );


    const rows =
        XLSX.utils.sheet_to_json(
            worksheet,
            {
                header: 1,
                defval: "",
                raw: true
            }
        );


    return {

        name:
            name,

        rows:
            rows

    };
}


/* =========================================================
   GET FIRST SHEET COLUMNS
========================================================= */

function getFirstSheetColumns(workbook) {

    const {
        worksheet
    } =
        getFirstSheet(
            workbook
        );


    const range =
        XLSX.utils.decode_range(
            worksheet["!ref"] || "A1"
        );


    const columns = [];


    for (
        let columnIndex = range.s.c;
        columnIndex <= range.e.c;
        columnIndex++
    ) {

        const cellAddress =
            XLSX.utils.encode_cell(
                {
                    r: range.s.r,
                    c: columnIndex
                }
            );


        const cell =
            worksheet[
                cellAddress
            ];


        columns.push(

            cell &&
            cell.v !== undefined

                ? String(
                    cell.v
                ).trim()

                : ""

        );

    }


    return columns;
}


/* =========================================================
   FIND HEADER
   Equivalent to Python find_header()
========================================================= */

function findHeaderIndex(
    headers,
    ...aliases
) {

    /* -----------------------------------------
       Support array input
    ----------------------------------------- */

    if (
        aliases.length === 1 &&
        Array.isArray(
            aliases[0]
        )
    ) {

        aliases =
            aliases[0];

    }


    /* -----------------------------------------
       NORMALIZE ALIASES
    ----------------------------------------- */

    const normalizedAliases =
        aliases.map(
            (alias) =>

                String(
                    alias || ""
                )
                    .trim()
                    .toUpperCase()
        );


    /* -----------------------------------------
       FIND HEADER
    ----------------------------------------- */

    for (
        let index = 0;
        index < headers.length;
        index++
    ) {

        const normalizedHeader =

            String(
                headers[index] || ""
            )
                .trim()
                .toUpperCase();


        if (
            normalizedAliases.includes(
                normalizedHeader
            )
        ) {

            return index;

        }

    }


    return -1;
}


/* =========================================================
   BUILD ROW
   Equivalent to modifying pandas df.iloc[0]
========================================================= */

function buildInputRow(
    headers,
    {
        system,
        siteCode,
        nodebName,
        type,
        towerType,
        cellId,
        nodebId,
        localCellid
    }
) {

    /* -----------------------------------------
       Start with blank row
       Same length as headers
    ----------------------------------------- */

    const row =
        new Array(
            headers.length
        ).fill("");


    /* -----------------------------------------
       SYSTEM
    ----------------------------------------- */

    let index =
        findHeaderIndex(
            headers,

            "SYSTEM *",
            "SYSTEM"
        );


    if (index !== -1) {

        row[index] =
            system;

    }


    /* -----------------------------------------
       SITE CODE
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "SITE_CODE *",
            "SITE_CODE"
        );


    if (index !== -1) {

        row[index] =
            siteCode;

    }


    /* -----------------------------------------
       NODEB / ENODEB / GNODEB NAME
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "NODEB_NAME *",
            "NODEB_NAME",

            "ENODEB_NAME *",
            "ENODEB_NAME",

            "GNODEB_NAME *",
            "GNODEB_NAME"
        );


    if (index !== -1) {

        row[index] =
            nodebName;

    }


    /* -----------------------------------------
       TYPE
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "TYPE *",
            "TYPE"
        );


    if (index !== -1) {

        row[index] =
            type;

    }


    /* -----------------------------------------
       TOWER TYPE
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "TOWER TYPE **",
            "TOWER TYPE *",
            "TOWER TYPE",

            "TOWER_TYPE **",
            "TOWER_TYPE *",
            "TOWER_TYPE"
        );


    if (index !== -1) {

        row[index] =
            towerType;

    }


    /* -----------------------------------------
       CELL ID
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "CELL ID **",
            "CELL ID *",
            "CELL ID",

            "CELL_ID **",
            "CELL_ID *",
            "CELL_ID"
        );


    if (index !== -1) {

        row[index] =
            cellId;

    }


    /* -----------------------------------------
       NODEB ID
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "NODEB_ID **",
            "NODEB_ID *",
            "NODEB_ID"
        );


    if (index !== -1) {

        row[index] =
            nodebId;

    }


    /* -----------------------------------------
       LOCAL CELLID
    ----------------------------------------- */

    index =
        findHeaderIndex(
            headers,

            "LOCAL_CELLID **",
            "LOCAL_CELLID *",
            "LOCAL_CELLID",

            "LOCAL CELLID **",
            "LOCAL CELLID *",
            "LOCAL CELLID"
        );


    if (index !== -1) {

        row[index] =
            localCellid;

    }


    return row;
}


/* =========================================================
   CONVERT VALUES TO JSON-SAFE VALUES
   Equivalent to Python pd.isna()
========================================================= */

function convertRowToSafeValues(row) {

    return row.map(
        (value) => {

            if (
                value === null ||
                value === undefined
            ) {

                return "";

            }


            /* -----------------------------------------
               Handle Excel date / invalid values
            ----------------------------------------- */

            if (
                typeof value === "number" &&
                Number.isNaN(value)
            ) {

                return "";

            }


            return String(
                value
            );

        }
    );
}


/* =========================================================
   GENERATE FROM DATASET
   Main replacement for Flask /autogen
========================================================= */

async function generateFromDataset(
    system,
    siteCode,
    nodebName,
    type,
    towerType = "",
    cellId = "",
    nodebId = "",
    localCellid = ""
) {

    /* -----------------------------------------
       CLEAN INPUT
    ----------------------------------------- */

    system =
        String(
            system || ""
        ).trim();


    siteCode =
        String(
            siteCode || ""
        ).trim();


    nodebName =
        String(
            nodebName || ""
        ).trim();


    type =
        String(
            type || ""
        ).trim();


    towerType =
        String(
            towerType || ""
        ).trim();


    cellId =
        String(
            cellId || ""
        ).trim();


    nodebId =
        String(
            nodebId || ""
        ).trim();


    localCellid =
        String(
            localCellid || ""
        ).trim();


    /* =====================================================
       VALIDATION
       Same required fields as Python
    ===================================================== */

    if (!system) {

        throw new Error(
            "System is required."
        );

    }


    if (!siteCode) {

        throw new Error(
            "Site Code is required."
        );

    }


    if (!nodebName) {

        throw new Error(
            "NodeB Name is required."
        );

    }


    if (!type) {

        throw new Error(
            "Type is required."
        );

    }


    /* =====================================================
       DATASET
    ===================================================== */

    let filePath;

    try {

        filePath =
            getDatasetFile(
                system
            );

    } catch (error) {

        throw new Error(
            error.message
        );

    }


    /* =====================================================
       LOAD EXCEL
    ===================================================== */

    const workbook =
        await loadExcelFile(
            filePath
        );


    /* =====================================================
       READ FIRST SHEET
    ===================================================== */

    const {
        name: sheetName,
        rows
    } =
        getFirstSheetData(
            workbook
        );


    /* =====================================================
       HEADERS
       Equivalent to df.columns
    ===================================================== */

    const headers =
        rows.length > 0

            ? rows[0].map(
                (value) =>
                    String(
                        value ?? ""
                    ).trim()
            )

            : [];


    if (
        headers.length === 0
    ) {

        throw new Error(
            `Template has no header row: ${sheetName}`
        );

    }


    /* =====================================================
       READ FIRST DATA ROW
       Equivalent to df.iloc[0]
    ===================================================== */

    let row;


    if (
        rows.length > 1
    ) {

        row =
            rows[1].slice();


        /* -----------------------------------------
           Ensure row has same number of columns
        ----------------------------------------- */

        while (
            row.length <
            headers.length
        ) {

            row.push("");

        }


        if (
            row.length >
            headers.length
        ) {

            row =
                row.slice(
                    0,
                    headers.length
                );

        }

    } else {

        row =
            new Array(
                headers.length
            ).fill("");

    }


    /* =====================================================
       REPLACE INPUT VALUES
    ===================================================== */

    const inputRow =
        buildInputRow(
            headers,
            {
                system,
                siteCode,
                nodebName,
                type,
                towerType,
                cellId,
                nodebId,
                localCellid
            }
        );


    /* =====================================================
       IMPORTANT
       Preserve existing Excel values

       Python starts from df.iloc[0], then only replaces
       matching columns.

       Therefore:
       - Existing Excel values remain
       - Matching fields are replaced
    ===================================================== */

    for (
        let index = 0;
        index < headers.length;
        index++
    ) {

        const header =
            String(
                headers[index] || ""
            )
                .trim()
                .toUpperCase();


        const isMappedField =

            header === "SYSTEM *" ||
            header === "SYSTEM" ||

            header === "SITE_CODE *" ||
            header === "SITE_CODE" ||

            header === "NODEB_NAME *" ||
            header === "NODEB_NAME" ||

            header === "ENODEB_NAME *" ||
            header === "ENODEB_NAME" ||

            header === "GNODEB_NAME *" ||
            header === "GNODEB_NAME" ||

            header === "TYPE *" ||
            header === "TYPE" ||

            header === "TOWER TYPE **" ||
            header === "TOWER TYPE *" ||
            header === "TOWER TYPE" ||

            header === "TOWER_TYPE **" ||
            header === "TOWER_TYPE *" ||
            header === "TOWER_TYPE" ||

            header === "CELL ID **" ||
            header === "CELL ID *" ||
            header === "CELL ID" ||

            header === "CELL_ID **" ||
            header === "CELL_ID *" ||
            header === "CELL_ID" ||

            header === "NODEB_ID **" ||
            header === "NODEB_ID *" ||
            header === "NODEB_ID" ||

            header === "LOCAL_CELLID **" ||
            header === "LOCAL_CELLID *" ||
            header === "LOCAL_CELLID" ||

            header === "LOCAL CELLID **" ||
            header === "LOCAL CELLID *" ||
            header === "LOCAL CELLID";


        if (
            isMappedField
        ) {

            row[index] =
                inputRow[index];

        }

    }


    /* =====================================================
       SAFE ROW
    ===================================================== */

    const safeRow =
        convertRowToSafeValues(
            row
        );


    /* =====================================================
       FILE NAME
       Equivalent to os.path.basename(file_path)
    ===================================================== */

    const fileName =
        filePath
            .split("/")
            .pop();


    /* =====================================================
       RETURN
       Equivalent to Flask jsonify()
    ===================================================== */

    return {

        success:
            true,

        system:
            system,

        siteCode:
            siteCode,

        nodebName:
            nodebName,

        type:
            type,

        towerType:
            towerType,

        cellId:
            cellId,

        nodebId:
            nodebId,

        localCellid:
            localCellid,

        filePath:
            fileName,

        fileName:
            fileName,

        sheetName:
            sheetName,

        headers:
            headers,

        row:
            safeRow

    };
}


/* =========================================================
   AUTO GENERATE
   Backward-compatible diagnostic helper
========================================================= */

async function autoGenerate() {

    const result = {};


    for (
        const filePath of
        Object.values(
            DATASET_FILES
        )
    ) {

        try {

            const workbook =
                await loadExcelFile(
                    filePath
                );


            result[filePath] = {

                sheetName:
                    getFirstSheet(
                        workbook
                    ).name,

                columns:
                    getFirstSheetColumns(
                        workbook
                    )

            };

        } catch (error) {

            console.error(
                error
            );


            result[filePath] = {

                sheetName:
                    "",

                columns:
                    [],

                error:
                    error.message

            };

        }

    }


    return result;
}


/* =========================================================
   GLOBAL EXPORT
========================================================= */

window.DATASET_FILES =
    DATASET_FILES;


window.loadExcelFile =
    loadExcelFile;


window.getDatasetFile =
    getDatasetFile;


window.getFirstSheet =
    getFirstSheet;


window.getFirstSheetColumns =
    getFirstSheetColumns;


window.getFirstSheetData =
    getFirstSheetData;


window.findHeaderIndex =
    findHeaderIndex;


window.buildInputRow =
    buildInputRow;


window.generateFromDataset =
    generateFromDataset;


window.autoGenerate =
    autoGenerate;

