/* =========================================================
   AUTOGEN PARAMETERS - GITHUB PAGES DEPLOYMENT
   ---------------------------------------------------------
   Static-only implementation.
   No Flask / Python / API endpoint is required.

   Dataset mapping:
   3G*  -> Datasets/Template_MP_Cell3G.xlsx
   4G*  -> Datasets/Template_MP_Cell4G.xlsx
   5G*  -> Datasets/Template_MP_Cell5G.xlsx
========================================================= */

const DATASET_FILES = Object.freeze({
    "3G": "Datasets/Template_MP_Cell3G.xlsx",
    "4G": "Datasets/Template_MP_Cell4G.xlsx",
    "5G": "Datasets/Template_MP_Cell5G.xlsx"
});

const workbookCache = new Map();

function getDatasetFile(system) {
    const key = String(system || "").toUpperCase();

    if (key.startsWith("3G")) return DATASET_FILES["3G"];
    if (key.startsWith("4G")) return DATASET_FILES["4G"];
    if (key.startsWith("5G")) return DATASET_FILES["5G"];

    throw new Error(`Unsupported system: ${system}`);
}

async function loadExcelFile(filePath) {
    if (workbookCache.has(filePath)) {
        return workbookCache.get(filePath);
    }

    if (typeof XLSX === "undefined") {
        throw new Error(
            "SheetJS failed to load. Check the SheetJS script in index.html."
        );
    }

    const response = await fetch(filePath, {
        method: "GET",
        cache: "no-cache"
    });

    if (!response.ok) {
        throw new Error(
            `Failed to load dataset (${response.status}): ${filePath}`
        );
    }

    const arrayBuffer = await response.arrayBuffer();

    if (!arrayBuffer.byteLength) {
        throw new Error(`Dataset is empty: ${filePath}`);
    }

    const workbook = XLSX.read(arrayBuffer, {
        type: "array",
        cellDates: false
    });

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error(`No worksheet found: ${filePath}`);
    }

    workbookCache.set(filePath, workbook);
    return workbook;
}

function getFirstSheet(workbook) {
    if (!workbook || !Array.isArray(workbook.SheetNames)) {
        throw new Error("Invalid Excel workbook.");
    }

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    if (!worksheet) {
        throw new Error(`Worksheet not found: ${firstSheetName}`);
    }

    return {
        name: firstSheetName,
        worksheet
    };
}

function getFirstSheetColumns(workbook) {
    const { worksheet } = getFirstSheet(workbook);

    const range = XLSX.utils.decode_range(
        worksheet["!ref"] || "A1"
    );

    const columns = [];

    for (
        let columnIndex = range.s.c;
        columnIndex <= range.e.c;
        columnIndex++
    ) {
        const cellAddress = XLSX.utils.encode_cell({
            r: range.s.r,
            c: columnIndex
        });

        const cell = worksheet[cellAddress];

        columns.push(
            cell && cell.v !== undefined
                ? String(cell.v).trim()
                : ""
        );
    }

    return columns;
}

function getFirstSheetData(workbook) {
    const { name, worksheet } = getFirstSheet(workbook);

    const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: true
    });

    return {
        name,
        rows
    };
}

function findHeaderIndex(headers, aliases) {
    const normalized = headers.map(
        (value) => String(value || "").trim().toUpperCase()
    );

    for (const alias of aliases) {
        const index = normalized.indexOf(
            String(alias).trim().toUpperCase()
        );

        if (index !== -1) return index;
    }

    return -1;
}

/*
    Build one deploy-time row from the selected template.

    Only values that are unambiguous from the existing UI are filled:
      SYSTEM
      SITE_CODE
      NODEB/ENODEB/GNODEB NAME

    Other template fields remain blank rather than inventing
    engineering values that are not present in the current frontend.
*/
function buildInputRow(headers, {
    system,
    siteCode,
    nodebName
}) {
    const row = new Array(headers.length).fill("");

    const mappings = [
        {
            aliases: ["SYSTEM *", "SYSTEM"],
            value: system
        },
        {
            aliases: ["SITE_CODE *", "SITE_CODE"],
            value: siteCode
        },
        {
            aliases: [
                "NODEB_NAME *",
                "NODEB_NAME",
                "ENODEB_NAME *",
                "ENODEB_NAME",
                "GNODEB_NAME *",
                "GNODEB_NAME"
            ],
            value: nodebName
        }
    ];

    for (const mapping of mappings) {
        const index = findHeaderIndex(
            headers,
            mapping.aliases
        );

        if (index !== -1) {
            row[index] = mapping.value;
        }
    }

    return row;
}

async function generateFromDataset(
    system,
    siteCode,
    nodebName,
    type
) {
    const filePath = getDatasetFile(system);
    const workbook = await loadExcelFile(filePath);
    const { name: sheetName, rows } = getFirstSheetData(workbook);

    const headers = rows.length
        ? rows[0].map((value) => String(value ?? "").trim())
        : [];

    if (!headers.length) {
        throw new Error(`Template has no header row: ${sheetName}`);
    }

    const row = buildInputRow(headers, {
        system,
        siteCode,
        nodebName
    });

    return {
        system,
        siteCode,
        nodebName,
        type,
        filePath,
        sheetName,
        headers,
        row
    };
}

/* Backward-compatible helper for diagnostics. */
async function autoGenerate() {
    const result = {};

    for (const filePath of Object.values(DATASET_FILES)) {
        try {
            const workbook = await loadExcelFile(filePath);

            result[filePath] = {
                sheetName: getFirstSheet(workbook).name,
                columns: getFirstSheetColumns(workbook)
            };
        } catch (error) {
            console.error(error);
            result[filePath] = {
                sheetName: "",
                columns: []
            };
        }
    }

    return result;
}

window.DATASET_FILES = DATASET_FILES;
window.loadExcelFile = loadExcelFile;
window.getDatasetFile = getDatasetFile;
window.getFirstSheetColumns = getFirstSheetColumns;
window.generateFromDataset = generateFromDataset;
window.autoGenerate = autoGenerate;
