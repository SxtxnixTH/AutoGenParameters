/* =========================================================
   AUTOGEN PARAMETERS - DEPLOY.JS
   GitHub Pages / Static Deployment Version

   Replaces:
   - Flask
   - pandas
   - /autogen API
   - Data.py

   Dataset:
   - 3G2100  -> Template_MP_Cell3G.xlsx
   - 4G      -> Template_MP_Cell4G.xlsx
   - 5G2600  -> Template_MP_Cell5G.xlsx

   Requires SheetJS:
   XLSX
========================================================= */


/* =========================================================
   DATASET FILES
========================================================= */

const DATASET_FILES = {

    "3G":
        "Datasets/Template_MP_Cell3G.xlsx",

    "4G":
        "Datasets/Template_MP_Cell4G.xlsx",

    "5G":
        "Datasets/Template_MP_Cell5G.xlsx"

};


/* =========================================================
   RNC - 3G2100 ONLY
========================================================= */

const RNC_3G2100_OPTIONS = [

    "3RNCAYA1H",
    "3RNCAYA3H",
    "3RNCAYA4H",
    "3RNCNPT1H",
    "3RNCNPT3H",
    "3RNCNPT4H"

];


/* =========================================================
   5G2600 BW OPTIONS
========================================================= */

const BW_5G2600_OPTIONS = [

    "40",
    "60",
    "80",
    "100"

];


/* =========================================================
   CELL COUNT
========================================================= */

const DEPLOY_CELL_COUNT_MIN = 1;
const DEPLOY_CELL_COUNT_MAX = 10;


/* =========================================================
   GET DATASET FILE
========================================================= */

function getDatasetFile(system) {

    const value =
        String(system || "")
            .trim()
            .toUpperCase();


    if (value.startsWith("3G")) {

        return DATASET_FILES["3G"];

    }


    if (value.startsWith("4G")) {

        return DATASET_FILES["4G"];

    }


    if (value.startsWith("5G")) {

        return DATASET_FILES["5G"];

    }


    throw new Error(
        `Unsupported system: ${value}`
    );

}


/* =========================================================
   SYSTEM CHECK
========================================================= */

function is3G2100DeploySystem(system) {

    return (
        String(system || "")
            .trim()
            .toUpperCase() ===
        "3G2100"
    );

}


function is4GDeploySystem(system) {

    return String(system || "")
        .trim()
        .toUpperCase()
        .startsWith("4G");

}


function is5G2600DeploySystem(system) {

    return (
        String(system || "")
            .trim()
            .toUpperCase() ===
        "5G2600"
    );

}


function hasCellParametersDeploy(system) {

    return (
        is3G2100DeploySystem(system) ||
        is4GDeploySystem(system) ||
        is5G2600DeploySystem(system)
    );

}


/* =========================================================
   GET PARAMETERS FROM URL / OBJECT
========================================================= */

function normalizeDeployParams(params = {}) {

    return {

        system:
            String(
                params.system || ""
            ).trim(),

        site_code:
            String(
                params.site_code || ""
            ).trim(),

        nodeb_name:
            String(
                params.nodeb_name || ""
            ).trim(),

        type:
            String(
                params.type || ""
            ).trim(),

        tower_type:
            String(
                params.tower_type || ""
            ).trim(),

        cell_id:
            String(
                params.cell_id || ""
            ).trim(),

        nodeb_id:
            String(
                params.nodeb_id || ""
            ).trim(),

        gnodeb_id:
            String(
                params.gnodeb_id || ""
            ).trim(),

        local_cellid:
            String(
                params.local_cellid || ""
            ).trim(),

        rnc:
            String(
                params.rnc || ""
            ).trim(),

        bw:
            String(
                params.bw || ""
            ).trim(),

        cell_count:
            String(
                params.cell_count || ""
            ).trim()

    };

}


/* =========================================================
   FIND HEADER
========================================================= */

function findHeader(
    headers,
    ...aliases
) {

    if (
        aliases.length === 1 &&
        Array.isArray(aliases[0])
    ) {

        aliases =
            aliases[0];

    }


    const normalizedAliases =
        new Set(

            aliases.map(
                (alias) =>
                    String(alias)
                        .trim()
                        .toUpperCase()
            )

        );


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
            normalizedAliases.has(
                normalizedHeader
            )
        ) {

            return index;

        }

    }


    return -1;

}


/* =========================================================
   HEADER MAPPING
========================================================= */

const HEADER_MAPPINGS = {

    system: [

        "SYSTEM *",
        "SYSTEM"

    ],

    site_code: [

        "SITE_CODE *",
        "SITE_CODE"

    ],

    nodeb_name: [

        "NODEB_NAME *",
        "NODEB_NAME",

        "ENODEB_NAME *",
        "ENODEB_NAME",

        "GNODEB_NAME *",
        "GNODEB_NAME"

    ],

    type: [

        "TYPE *",
        "TYPE"

    ],

    tower_type: [

        "TOWER TYPE *",
        "TOWER TYPE",

        "TOWER_TYPE *",
        "TOWER_TYPE"

    ],

    cell_id: [

        "CELL ID **",
        "CELL ID *",
        "CELL ID",

        "CELL_ID **",
        "CELL_ID *",
        "CELL_ID"

    ],

    nodeb_id: [

        "NODEB_ID **",
        "NODEB_ID *",
        "NODEB_ID"

    ],

    gnodeb_id: [

        "GNODEB_ID **",
        "GNODEB_ID *",
        "GNODEB_ID"

    ],

    local_cellid: [

        "LOCAL_CELLID **",
        "LOCAL_CELLID *",
        "LOCAL_CELLID",

        "LOCAL CELLID **",
        "LOCAL CELLID *",
        "LOCAL CELLID"

    ],

    bw: [

        "BW **",
        "BW *",
        "BW",

        "BANDWIDTH **",
        "BANDWIDTH *",
        "BANDWIDTH"

    ],

    cell_count: [

        "CELL COUNT **",
        "CELL COUNT *",
        "CELL COUNT",

        "CELL_COUNT **",
        "CELL_COUNT *",
        "CELL_COUNT"

    ]

};


/* =========================================================
   READ XLSX
========================================================= */

async function readDataset(filePath) {

    if (
        typeof XLSX === "undefined"
    ) {

        throw new Error(
            "SheetJS XLSX library is not loaded."
        );

    }


    const response =
        await fetch(
            filePath
        );


    if (!response.ok) {

        throw new Error(
            `Dataset not found: ${filePath}`
        );

    }


    const arrayBuffer =
        await response.arrayBuffer();


    const workbook =
        XLSX.read(
            arrayBuffer,
            {
                type: "array"
            }
        );


    if (
        !workbook.SheetNames ||
        !workbook.SheetNames.length
    ) {

        throw new Error(
            "Dataset does not contain any worksheet."
        );

    }


    const sheetName =
        workbook.SheetNames[0];


    const worksheet =
        workbook.Sheets[
            sheetName
        ];


    const rows =
        XLSX.utils.sheet_to_json(
            worksheet,
            {
                header: 1,
                defval: ""
            }
        );


    if (!rows.length) {

        return {

            sheetName,
            headers: [],
            row: []

        };

    }


    const headers =
        Array.isArray(rows[0])
            ? rows[0].map(
                (header) =>
                    String(
                        header ?? ""
                    )
            )
            : [];


    const row =
        rows.length > 1 &&
        Array.isArray(rows[1])
            ? [...rows[1]]
            : Array(
                headers.length
            ).fill("");


    while (
        row.length <
        headers.length
    ) {

        row.push("");

    }


    return {

        sheetName,
        headers,
        row

    };

}


/* =========================================================
   VALIDATE BASIC PARAMETERS
========================================================= */

function validateBasicParameters(
    params
) {

    const required = {

        system:
            "System",

        site_code:
            "Site Code",

        nodeb_name:
            "NodeB Name",

        type:
            "Type"

    };


    for (
        const [key, label]
        of Object.entries(required)
    ) {

        if (!params[key]) {

            return {

                error:
                    `${label} is required.`

            };

        }

    }


    return null;

}


/* =========================================================
   VALIDATE RNC
========================================================= */

function validateRNC(
    params,
    is3G2100
) {

    if (!is3G2100) {

        return null;

    }


    if (!params.rnc) {

        return {

            error:
                "RNC is required for 3G2100."

        };

    }


    if (
        !RNC_3G2100_OPTIONS.includes(
            params.rnc
        )
    ) {

        return {

            error:
                `Invalid RNC: ${params.rnc}. ` +
                "Please select a valid " +
                "3G2100 RNC.",

            validRNC:
                RNC_3G2100_OPTIONS

        };

    }


    return null;

}


/* =========================================================
   VALIDATE 5G2600
========================================================= */

function validate5G2600(
    params
) {

    /* GNODEB ID */

    if (!params.gnodeb_id) {

        return {

            error:
                "GNODEB ID is required for 5G2600."

        };

    }


    if (
        !/^\d{6}$/.test(
            params.gnodeb_id
        )
    ) {

        return {

            error:
                "GNODEB ID must be 6 digits."

        };

    }


    /* CELL ID */

    if (!params.cell_id) {

        return {

            error:
                "CELL ID is required for 5G2600."

        };

    }


    if (
        !/^\d{5}$/.test(
            params.cell_id
        )
    ) {

        return {

            error:
                "CELL ID must be 5 digits."

        };

    }


    /* LOCAL CELLID */

    params.local_cellid =
        params.cell_id;


    /* BW */

    if (!params.bw) {

        return {

            error:
                "BW is required for 5G2600."

        };

    }


    if (
        !BW_5G2600_OPTIONS.includes(
            params.bw
        )
    ) {

        return {

            error:
                `Invalid BW: ${params.bw}. ` +
                "Please select " +
                "40, 60, 80, or 100.",

            validBW:
                BW_5G2600_OPTIONS

        };

    }


    /* CELL COUNT */

    if (!params.cell_count) {

        return {

            error:
                "CELL COUNT is required for 5G2600."

        };

    }


    const cellCount =
        Number(
            params.cell_count
        );


    if (
        !Number.isInteger(
            cellCount
        )
    ) {

        return {

            error:
                "CELL COUNT must be a number."

        };

    }


    if (
        cellCount <
            DEPLOY_CELL_COUNT_MIN ||
        cellCount >
            DEPLOY_CELL_COUNT_MAX
    ) {

        return {

            error:
                "CELL COUNT must be between 1 and 10."

        };

    }


    params.cell_count =
        String(cellCount);


    return null;

}


/* =========================================================
   WRITE STANDARD PARAMETERS
========================================================= */

function writeStandardParameters(
    params,
    headers,
    row,
    systemInfo
) {

    const {

        is3G2100,
        is5G2600,
        hasCellParameters

    } = systemInfo;


    for (
        const [key, aliases]
        of Object.entries(
            HEADER_MAPPINGS
        )
    ) {

        /* 5G uses GNODEB ID */

        if (
            key === "nodeb_id" &&
            is5G2600
        ) {

            continue;

        }


        /* GNODEB ID only for 5G2600 */

        if (
            key === "gnodeb_id" &&
            !is5G2600
        ) {

            continue;

        }


        /* BW only for 5G2600 */

        if (
            key === "bw" &&
            !is5G2600
        ) {

            continue;

        }


        /* CELL COUNT only when supported */

        if (
            key === "cell_count" &&
            !hasCellParameters
        ) {

            continue;

        }


        const index =
            findHeader(
                headers,
                aliases
            );


        if (
            index === -1
        ) {

            continue;

        }


        if (
            key === "cell_count"
        ) {

            if (
                params.cell_count
            ) {

                row[index] =
                    params.cell_count;

            }

            continue;

        }


        row[index] =
            params[key];

    }

}


/* =========================================================
   5G2600 - GNODEB ID
========================================================= */

function write5GGNodeBId(
    params,
    headers,
    row
) {

    const index =
        findHeader(

            headers,

            "GNODEB_ID **",
            "GNODEB_ID *",
            "GNODEB_ID",

            "GNODEB ID **",
            "GNODEB ID *",
            "GNODEB ID"

        );


    if (index !== -1) {

        row[index] =
            params.gnodeb_id;

    }

}


/* =========================================================
   5G2600 - CELL ID
========================================================= */

function write5GCellId(
    params,
    headers,
    row
) {

    const index =
        findHeader(

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
            params.cell_id;

    }

}


/* =========================================================
   5G2600 - LOCAL CELLID
========================================================= */

function write5GLocalCellId(
    params,
    headers,
    row
) {

    const index =
        findHeader(

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
            params.local_cellid;

    }

}


/* =========================================================
   5G2600 - BW
========================================================= */

function write5GBW(
    params,
    headers,
    row
) {

    const index =
        findHeader(

            headers,

            "BW **",
            "BW *",
            "BW",

            "BANDWIDTH **",
            "BANDWIDTH *",
            "BANDWIDTH"

        );


    if (index !== -1) {

        row[index] =
            params.bw;

    }

}


/* =========================================================
   5G2600 - CELL COUNT
========================================================= */

function write5GCellCount(
    params,
    headers,
    row
) {

    const index =
        findHeader(

            headers,

            "CELL COUNT **",
            "CELL COUNT *",
            "CELL COUNT",

            "CELL_COUNT **",
            "CELL_COUNT *",
            "CELL_COUNT"

        );


    if (index !== -1) {

        row[index] =
            params.cell_count;

    }

}


/* =========================================================
   RNC - 3G2100 ONLY
========================================================= */

function writeRNC(
    params,
    headers,
    row,
    is3G2100
) {

    if (!is3G2100) {

        return;

    }


    const index =
        findHeader(

            headers,

            "RNC *",
            "RNC",

            "RNC_NAME *",
            "RNC_NAME",

            "RNC NAME *",
            "RNC NAME"

        );


    if (index !== -1) {

        row[index] =
            params.rnc;

    }

}


/* =========================================================
   SAFE ROW
========================================================= */

function convertRowToSafeValues(
    row
) {

    return row.map(
        (value) => {

            if (
                value === null ||
                value === undefined
            ) {

                return "";

            }


            if (
                typeof value === "number" &&
                Number.isNaN(value)
            ) {

                return "";

            }


            return String(value);

        }
    );

}


/* =========================================================
   AUTO GENERATE
========================================================= */

async function autoGenerate(
    inputParams
) {

    const params =
        normalizeDeployParams(
            inputParams
        );


    /* =====================================================
       SYSTEM
    ===================================================== */

    const normalizedSystem =
        params.system
            .trim()
            .toUpperCase();


    const is3G2100 =
        normalizedSystem ===
        "3G2100";


    const is4G =
        normalizedSystem.startsWith(
            "4G"
        );


    const is5G2600 =
        normalizedSystem ===
        "5G2600";


    const hasCellParameters =
        is3G2100 ||
        is4G ||
        is5G2600;


    const systemInfo = {

        normalizedSystem,
        is3G2100,
        is4G,
        is5G2600,
        hasCellParameters

    };


    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    const basicError =
        validateBasicParameters(
            params
        );


    if (basicError) {

        return basicError;

    }


    /* =====================================================
       RNC
    ===================================================== */

    const rncError =
        validateRNC(
            params,
            is3G2100
        );


    if (rncError) {

        return rncError;

    }


    /* =====================================================
       5G2600
    ===================================================== */

    if (is5G2600) {

        const error =
            validate5G2600(
                params
            );


        if (error) {

            return error;

        }

    }


    /* =====================================================
       DATASET
    ===================================================== */

    let filePath;


    try {

        filePath =
            getDatasetFile(
                params.system
            );

    } catch (error) {

        return {

            error:
                error.message

        };

    }


    /* =====================================================
       READ EXCEL
    ===================================================== */

    let dataset;


    try {

        dataset =
            await readDataset(
                filePath
            );

    } catch (error) {

        return {

            error:
                `Failed to read dataset: ${error.message}`

        };

    }


    const headers =
        dataset.headers;


    const row =
        dataset.row;


    /* =====================================================
       WRITE STANDARD PARAMETERS
    ===================================================== */

    writeStandardParameters(

        params,

        headers,

        row,

        systemInfo

    );


    /* =====================================================
       5G2600
    ===================================================== */

    if (is5G2600) {

        write5GGNodeBId(
            params,
            headers,
            row
        );


        write5GCellId(
            params,
            headers,
            row
        );


        write5GLocalCellId(
            params,
            headers,
            row
        );


        write5GBW(
            params,
            headers,
            row
        );


        write5GCellCount(
            params,
            headers,
            row
        );

    }


    /* =====================================================
       RNC
    ===================================================== */

    if (is3G2100) {

        writeRNC(
            params,
            headers,
            row,
            is3G2100
        );

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
    ===================================================== */

    const cleanSiteCode =
        params.site_code
            .trim()
            .toUpperCase();


    const fileName =
        cleanSiteCode

            ? `${normalizedSystem}_${cleanSiteCode}.xlsx`

            : `${normalizedSystem}.xlsx`;


    /* =====================================================
       RETURN RESULT
    ===================================================== */

    return {

        success:
            true,

        system:
            params.system,

        siteCode:
            params.site_code,

        nodebName:
            params.nodeb_name,

        type:
            params.type,

        towerType:
            params.tower_type,

        cellId:
            params.cell_id,

        nodebId:
            params.nodeb_id,

        gnodebId:
            params.gnodeb_id,

        localCellid:
            params.local_cellid,

        rnc:
            params.rnc,

        rncOptions:
            RNC_3G2100_OPTIONS,

        bw:
            params.bw,

        bwOptions:
            BW_5G2600_OPTIONS,

        cellCount:
            params.cell_count,

        filePath:
            filePath
                .split("/")
                .pop(),

        fileName:
            fileName,

        sheetName:
            dataset.sheetName,

        headers:
            headers,

        row:
            safeRow

    };

}


/* =========================================================
   GLOBAL API
========================================================= */

window.AutoGenDeploy = {

    generate:
        autoGenerate,

    getDatasetFile:
        getDatasetFile,

    readDataset:
        readDataset,

    RNC_OPTIONS:
        RNC_3G2100_OPTIONS,

    BW_OPTIONS:
        BW_5G2600_OPTIONS,

    CELL_COUNT_MIN:
        DEPLOY_CELL_COUNT_MIN,

    CELL_COUNT_MAX:
        DEPLOY_CELL_COUNT_MAX

};


/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

window.autogen =
    autoGenerate;

