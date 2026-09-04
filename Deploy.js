/* =========================================================
   AUTOGEN PARAMETERS - DEPLOY.JS
   GitHub Pages / Static Deployment Version

   Source of Truth:
   - Generation logic is ported 1:1 from RunLocal/Data.py
   - Excel templates are loaded client-side
   - No Flask / pandas / Python server is required

   Browser dependencies loaded by index.html:
   - ExcelJS
   - JSZip
========================================================= */

(() => {
    "use strict";

    const DATASET_FILES = {
        "3G": "Datasets/Template_MP_Cell3G.xlsx",
        "4G": "Datasets/Template_MP_Cell4G.xlsx",
        "5G": "Datasets/Template_MP_Cell5G.xlsx"
    };

    const RNC_3G2100_OPTIONS = [
        "3RNCAYA1H",
        "3RNCAYA3H",
        "3RNCAYA4H",
        "3RNCNPT1H",
        "3RNCNPT3H",
        "3RNCNPT4H"
    ];

    const BW_5G2600_OPTIONS = ["40", "60", "80", "100"];

    const CELL_COUNT_MIN = 1;
    const CELL_COUNT_MAX = 10;

    const TYPE_CODE_MAP = {
        "3G2100": { NODE: "W", DISTRIBUTED: "D" },
        "4G1800": { NODE: "L", DISTRIBUTED: "S" },
        "4G2100": { NODE: "L", DISTRIBUTED: "S" },
        "4G2600": { NODE: "L", DISTRIBUTED: "S" },
        "5G2600": { NODE: "N", DISTRIBUTED: "U" }
    };

    const TOWER_CODE_MICRO = {
        "1": "A", "2": "B", "3": "C", "4": "D", "5": "E",
        "6": "F", "7": "G", "8": "H", "9": "I", "10": "J"
    };

    const TOWER_CODE_MACRO = {
        "1": "1", "2": "2", "3": "3", "4": "4", "5": "5",
        "6": "6", "7": "7", "8": "8", "9": "9", "10": "0"
    };

    const CELL_NAME_MIDDLE = {
        "3G2100": "213",
        "4G1800": "181",
        "4G2100": "211",
        "5G2600": "261"
    };

    const TIME_OFFSET_BY_CELL_COUNT = {
        "1": "CHIP0", "2": "CHIP256", "3": "CHIP512", "4": "CHIP768",
        "5": "CHIP1024", "6": "CHIP1280", "7": "CHIP1536", "8": "CHIP1792",
        "9": "CHIP2048", "10": "CHIP2304"
    };

    const BW_5G2600_MAP = {
        "40": {
            FREQ_BAND: "41", DUPLEX: "TDD",
            UL_NARFCN: "504000", DL_NARFCN: "504000",
            UL_CENTERFREQUENCY: "2520", DL_CENTERFREQUENCY: "2520",
            SSBFREQPOS: "6333", "SSBARFCN(FOR 4G)": "506670",
            SSB_FREQUENCY: "2533.35"
        },
        "60": {
            FREQ_BAND: "41", DUPLEX: "TDD",
            UL_NARFCN: "506004", DL_NARFCN: "506004",
            UL_CENTERFREQUENCY: "2530.02", DL_CENTERFREQUENCY: "2530.02",
            SSBFREQPOS: "6333", "SSBARFCN(FOR 4G)": "506670",
            SSB_FREQUENCY: "2533.35"
        },
        "80": {
            FREQ_BAND: "41", DUPLEX: "TDD",
            UL_NARFCN: "508002", DL_NARFCN: "508002",
            UL_CENTERFREQUENCY: "2540.01", DL_CENTERFREQUENCY: "2540.01",
            SSBFREQPOS: "6333", "SSBARFCN(FOR 4G)": "506670",
            SSB_FREQUENCY: "2533.35"
        },
        "100": {
            FREQ_BAND: "41", DUPLEX: "TDD",
            UL_NARFCN: "510000", DL_NARFCN: "510000",
            UL_CENTERFREQUENCY: "2550", DL_CENTERFREQUENCY: "2550",
            SSBFREQPOS: "6333", "SSBARFCN(FOR 4G)": "506670",
            SSB_FREQUENCY: "2533.35"
        }
    };

    const CELL_264_FIX = {
        DL_EARFCN: "40392",
        UL_EARFCN: "40392"
    };

    const CELL_265_FIX = {
        DL_EARFCN: "40590",
        UL_EARFCN: "40590"
    };

    const COLUMN_ORDER = {
        "3G2100": [
            "SYSTEM", "CELL_NAME", "SITE_CODE", "NODEB_NAME", "TYPE",
            "TOWER_TYPE", "CELL_ID", "NODEB_ID", "LOCAL_CELLID", "RNC",
            "CELL_COUNT", "MCC", "MNC", "SAC", "PSC", "CPICHPWR",
            "MAX_TX_PWR", "BW", "FREQ_BAND", "DL_UARFCN", "UL_UARFCN",
            "CELL_TXRX", "CELL_RADIUS", "CARRIER_INDICATOR",
            "CN_OPERATOR_GROUP_INDEX", "LOCAL_AREA_ID",
            "SERVICE_PRIORITY_GROUP_INDEX", "TIME_OFFSET", "DUPLEX",
            "MULTI_TYPE", "CELL_STATUS", "ONSERVICE", "CELL_BARRED",
            "CELL_RESERVE", "REF_CODE_PHASE", "RRU_MODEL_1", "RRU_NUM_1"
        ],
        "4G1800": [
            "SYSTEM", "CELL_NAME", "SITE_CODE", "ENODEB_NAME", "TYPE",
            "TOWER_TYPE", "ENODEB_ID", "CELL_ID", "LOCAL_CELLID",
            "CELL_COUNT", "MCC", "MNC", "CN_OPERATOR_GROUP_INDEX",
            "LOCAL_AREA_ID", "BW", "DL_EARFCN", "UL_EARFCN", "FREQ_BAND",
            "DUPLEX", "RSI", "PCI", "RSPWR", "CELL_TXRX",
            "COVERAGE_SCENARIO", "PA", "PB", "CELL_RADIUS", "EMTC_FLAG",
            "MULTI_TYPE", "CELL_STATUS", "ONSERVICE", "CELL_BARRED",
            "CELL_RESERVE", "REF_CODE_PHASE", "RRU_MODEL_1", "RRU_NUM_1"
        ],
        "4G2100": [
            "SYSTEM", "CELL_NAME", "SITE_CODE", "ENODEB_NAME", "TYPE",
            "TOWER_TYPE", "ENODEB_ID", "CELL_ID", "LOCAL_CELLID",
            "CELL_COUNT", "MCC", "MNC", "CN_OPERATOR_GROUP_INDEX",
            "LOCAL_AREA_ID", "BW", "DL_EARFCN", "UL_EARFCN", "FREQ_BAND",
            "DUPLEX", "RSI", "PCI", "RSPWR", "CELL_TXRX",
            "COVERAGE_SCENARIO", "PA", "PB", "CELL_RADIUS", "EMTC_FLAG",
            "MULTI_TYPE", "CELL_STATUS", "ONSERVICE", "CELL_BARRED",
            "CELL_RESERVE", "REF_CODE_PHASE", "RRU_MODEL_1", "RRU_NUM_1"
        ],
        "4G2600": [
            "SYSTEM", "CELL_NAME", "SITE_CODE", "ENODEB_NAME", "TYPE",
            "TOWER_TYPE", "ENODEB_ID", "CELL_ID", "LOCAL_CELLID",
            "CELL_COUNT", "MCC", "MNC", "CN_OPERATOR_GROUP_INDEX",
            "LOCAL_AREA_ID", "BW", "DL_EARFCN", "UL_EARFCN", "FREQ_BAND",
            "DUPLEX", "RSI", "PCI", "RSPWR", "CELL_TXRX",
            "COVERAGE_SCENARIO", "PA", "PB", "CELL_RADIUS", "EMTC_FLAG",
            "MULTI_TYPE", "CELL_STATUS", "ONSERVICE", "CELL_BARRED",
            "CELL_RESERVE", "REF_CODE_PHASE", "RRU_MODEL_1", "RRU_NUM_1"
        ],
        "5G2600": [
            "SYSTEM", "CELL_NAME", "SITE_CODE", "GNODEB_NAME", "MCC",
            "MNC", "GNODEB_ID", "CELL_ID", "LOCAL_CELLID", "BW", "PRB",
            "UL_NARFCN", "UL_CENTERFREQUENCY", "DL_NARFCN",
            "DL_CENTERFREQUENCY", "SSBDESCMETHOD", "SSBFREQPOS",
            "SSBARFCN(FOR 4G)", "SSB_FREQUENCY", "FREQ_BAND",
            "SUBCARRIERSPACING", "SLOT_ASSIGNMENT", "SLOT_STRUCTURE",
            "STRUCTURE_TYPE", "SPECIAL_SUB_FRAME_RATIO", "DUPLEX", "RSI",
            "PCI", "RE_POWER", "MAX_TRANSMIT_POWER", "CELL_TXRX",
            "COVERAGE_SCENARIO", "SSB_BEAM_NUMBER", "NR_MODE_5G",
            "CELL_RADIUS", "MULTI_TYPE", "CELL_STATUS", "ONSERVICE",
            "CELL_BARRED", "CELL_RESERVE", "REF_CODE_PHASE",
            "RRU_MODEL_1", "RRU_NUM_1"
        ]
    };

    const FIX_3G2100 = {
        MCC: "520", MNC: "03", PSC: "0", CPICHPWR: "330",
        MAX_TX_PWR: "411", BW: "5", FREQ_BAND: "1",
        DL_UARFCN: "10713", UL_UARFCN: "9763", CELL_TXRX: "1T2R",
        CELL_RADIUS: "29000", CARRIER_INDICATOR: "3",
        CN_OPERATOR_GROUP_INDEX: "0", LOCAL_AREA_ID: "0",
        SERVICE_PRIORITY_GROUP_INDEX: "1", DUPLEX: "FDD",
        MULTI_TYPE: "NORMAL_CELL", CELL_STATUS: "NO", ONSERVICE: "NO",
        CELL_BARRED: "NO", CELL_RESERVE: "NO", RRU_NUM_1: "1"
    };

    const FIX_4G1800 = {
        MCC: "520", MNC: "03", CN_OPERATOR_GROUP_INDEX: "0", LOCAL_AREA_ID: "0",
        BW: "20", DL_EARFCN: "1450", UL_EARFCN: "19450", FREQ_BAND: "3",
        DUPLEX: "FDD", RSI: "-1", PCI: "-1", RSPWR: "164", CELL_TXRX: "2T2R",
        COVERAGE_SCENARIO: "NONE", PA: "-3", PB: "1", CELL_RADIUS: "9770",
        EMTC_FLAG: "FALSE", MULTI_TYPE: "NORMAL", CELL_STATUS: "NO",
        ONSERVICE: "NO", CELL_BARRED: "NO", CELL_RESERVE: "NO", RRU_NUM_1: "1"
    };

    const FIX_4G2100 = {
        MCC: "520", MNC: "03", CN_OPERATOR_GROUP_INDEX: "0", LOCAL_AREA_ID: "0",
        BW: "20", DL_EARFCN: "499", UL_EARFCN: "18499", FREQ_BAND: "1",
        DUPLEX: "FDD", RSI: "-1", PCI: "-1", RSPWR: "152", CELL_TXRX: "2T2R",
        COVERAGE_SCENARIO: "NONE", PA: "0", PB: "0", CELL_RADIUS: "9770",
        EMTC_FLAG: "FALSE", MULTI_TYPE: "NORMAL", CELL_STATUS: "NO",
        ONSERVICE: "NO", CELL_BARRED: "NO", CELL_RESERVE: "NO", RRU_NUM_1: "1"
    };

    const FIX_4G2600_COMMON = {
        MCC: "520", MNC: "03", CN_OPERATOR_GROUP_INDEX: "0", LOCAL_AREA_ID: "0",
        BW: "20", FREQ_BAND: "41", DUPLEX: "TDD", RSI: "-1", PCI: "-1",
        RSPWR: "9", CELL_TXRX: "64T64R", COVERAGE_SCENARIO: "NONE",
        PA: "-3", PB: "1", CELL_RADIUS: "9000", EMTC_FLAG: "FALSE",
        MULTI_TYPE: "NORMAL", CELL_STATUS: "NO", ONSERVICE: "NO",
        CELL_BARRED: "NO", CELL_RESERVE: "NO", REF_CODE_PHASE: "",
        RRU_MODEL_1: "AAU5639w", RRU_NUM_1: "1"
    };

    const FIX_5G2600_COMMON = {
        MCC: "520", MNC: "03", PRB: "162",
        SsbDescMethod: "SSB_DESC_TYPE_GSCN", SubcarrierSpacing: "30KHz",
        SLOT_ASSIGNMENT: "8_2_DDDDDDDSUU", SLOT_STRUCTURE: "SS54",
        STRUCTURE_TYPE: "Short_Structure", SPECIAL_SUB_FRAME_RATIO: "6:04:04",
        RSI: "-1", PCI: "-1", RE_POWER: "0", MAX_TRANSMIT_POWER: "335",
        CELL_TXRX: "64T64R", COVERAGE_SCENARIO: "NONE", SSB_BEAM_NUMBER: "8",
        NR_MODE_5G: "SA/NSA", CELL_RADIUS: "9000", MULTI_TYPE: "NORMAL",
        CELL_STATUS: "NO", ONSERVICE: "NO", CELL_BARRED: "NO",
        CELL_RESERVE: "NO", RRU_MODEL_1: "AAU5639w", RRU_NUM_1: "1"
    };

    function assertLibraries() {
        if (typeof window.ExcelJS === "undefined") {
            throw new Error("ExcelJS library is not loaded.");
        }
        if (typeof window.JSZip === "undefined") {
            throw new Error("JSZip library is not loaded.");
        }
    }

    function getDatasetFile(system) {
        const value = String(system || "").trim().toUpperCase();
        if (value.startsWith("3G")) return DATASET_FILES["3G"];
        if (value.startsWith("4G")) return DATASET_FILES["4G"];
        if (value.startsWith("5G")) return DATASET_FILES["5G"];
        throw new Error(`Unsupported system: ${value}`);
    }

    function normalizeColumnName(value) {
        let text = String(value ?? "").trim().toUpperCase();
        text = text.replace(/\*/g, "");
        text = text.replace(/[\s\-]+/g, "_");
        text = text.replace(/_+/g, "_");
        return text.replace(/^_+|_+$/g, "");
    }

    function safeCellCount(value, defaultValue = "1") {
        const text = String(value ?? "").trim();
        if (!/^[+-]?\d+$/.test(text)) return defaultValue;
        const number = Number(text);
        if (!Number.isFinite(number)) return defaultValue;
        if (number < CELL_COUNT_MIN || number > CELL_COUNT_MAX) return defaultValue;
        return String(number);
    }

    function getTypeCode(system, typeValue) {
        const codes = TYPE_CODE_MAP[system] || {};
        const key = String(typeValue || "").trim().toUpperCase();
        if (key.startsWith("NODE")) return codes.NODE || "";
        if (key.startsWith("DIST")) return codes.DISTRIBUTED || "";
        return "";
    }

    function getTowerCode(towerType, cellCount) {
        const key = String(towerType || "").trim().toUpperCase();
        const count = safeCellCount(cellCount);
        if (key.startsWith("MICRO")) return TOWER_CODE_MICRO[count] || "";
        if (key.startsWith("MACRO")) return TOWER_CODE_MACRO[count] || "";
        return "";
    }

    function normalizeDisplayId(value) {
        const text = String(value ?? "").trim();

        if (!/^\d+$/.test(text)) {
            return text;
        }

        // Normal rule for 3G/4G IDs and 5G GNODEB ID:
        // remove all leading zeros.
        const stripped = text.replace(/^0+/, "");

        return stripped === "" ? "0" : stripped;
    }

    function normalize5G2600CellId(value) {
        const text = String(value ?? "").trim();

        if (!/^\d+$/.test(text)) {
            return text;
        }

        // 5G2600 CELL ID special rule:
        // If the first two digits are 00, remove leading zeros.
        // If the second digit is not 0, keep the first zero.
        // Examples: 00123 -> 123, 00012 -> 12,
        //           01123 -> 01123, 01234 -> 01234, 09999 -> 09999.
        if (text.length >= 2 && text[0] === "0" && text[1] !== "0") {
            return text;
        }

        const stripped = text.replace(/^0+/, "");
        return stripped === "" ? "0" : stripped;
    }

    const ID_COLUMNS = new Set([
        "CELL_ID", "NODEB_ID", "ENODEB_ID", "GNODEB_ID", "LOCAL_CELLID",
        "SAC"
    ]);

    function normalizeGeneratedIdValue(key, value, system = "") {
        const normalizedKey = normalizeColumnName(key);
        const normalizedSystem = String(system || "").trim().toUpperCase();

        if (!ID_COLUMNS.has(normalizedKey)) {
            return value;
        }

        // Only 5G2600 CELL_ID / LOCAL_CELLID use the special leading-zero rule.
        if (normalizedSystem === "5G2600" &&
            (normalizedKey === "CELL_ID" || normalizedKey === "LOCAL_CELLID")) {
            return normalize5G2600CellId(value);
        }

        return normalizeDisplayId(value);
    }

    function sequenceNumericValue(baseValue, position, length) {
        const baseText = String(baseValue ?? "").trim();
        const posText = String(position ?? "").trim();
        if (!/^[+-]?\d+$/.test(baseText) || !/^\d+$/.test(posText)) return "";
        const base = Number(baseText);
        const pos = Number(posText);
        if (!Number.isFinite(base) || !Number.isFinite(pos)) return "";
        const rawValue = pos === CELL_COUNT_MAX ? base - 1 : base + (pos - 1);
        const value = Math.max(0, rawValue);
        return String(value).padStart(length, "0");
    }

    function rruModelForPosition(position, total) {
        const p = Number.parseInt(String(position), 10);
        const t = Number.parseInt(String(total), 10);
        if (!Number.isFinite(p) || !Number.isFinite(t)) return "";
        if (p < t) return "RRU5502";
        return t % 2 === 1 ? "RRU3962" : "RRU5502";
    }

    function getExportFilename(system, siteCode) {
        const cleanSystem = String(system || "").trim();
        const cleanSite = String(siteCode || "").trim().toUpperCase();
        if (!cleanSystem) return "export.xlsx";
        if (!cleanSite) return `${cleanSystem}.xlsx`;
        return `${cleanSystem}_${cleanSite}.xlsx`;
    }

    /* =========================================================
       DOWNLOAD TIMESTAMP

       The visible Results page keeps the original filename.
       Timestamping is applied only when the actual download
       is created.  For ZIP downloads one master timestamp is
       reused for the ZIP entries and their filenames.
    ========================================================= */

    function getMachineLocalDate() {
        const now = new Date();

        // JSZip 3.x serializes ZIP DOS date/time from UTC getters.
        // Shift the Date value by the machine's local timezone offset so
        // JSZip writes the machine-local wall-clock time into the ZIP.
        // No timezone (+7/-7) is hardcoded.
        return new Date(
            now.getTime() - (now.getTimezoneOffset() * 60 * 1000)
        );
    }

    function createDownloadTimestamp(date = new Date()) {
        const pad2 = (value) => String(value).padStart(2, "0");
        const dd = pad2(date.getDate());
        const mm = pad2(date.getMonth() + 1);
        const yyyy = String(date.getFullYear());
        const hh = pad2(date.getHours());
        const mi = pad2(date.getMinutes());
        const ss = pad2(date.getSeconds());

        return {
            // This Date is intentionally timezone-shifted for JSZip.
            // JSZip reads UTC components when writing ZIP metadata.
            date: getMachineLocalDateFrom(date),
            text: `${dd}${mm}${yyyy}_${hh}${mi}${ss}`
        };
    }

    function getMachineLocalDateFrom(date) {
        return new Date(
            date.getTime() - (date.getTimezoneOffset() * 60 * 1000)
        );
    }

    function getTimestampedExportFilename(system, siteCode, timestampText) {
        const base = getExportFilename(system, siteCode);
        if (!timestampText || !base.toLowerCase().endsWith(".xlsx")) {
            return base;
        }
        return `${base.slice(0, -5)}_${timestampText}.xlsx`;
    }

    function findHeader(headers, ...aliases) {
        if (aliases.length === 1 && Array.isArray(aliases[0])) aliases = aliases[0];
        const normalizedAliases = new Set(
            aliases.map(alias => String(alias).trim().toUpperCase())
        );
        for (let i = 0; i < headers.length; i++) {
            const normalizedHeader = String(headers[i] ?? "").trim().toUpperCase();
            if (normalizedAliases.has(normalizedHeader)) return i;
        }
        return -1;
    }

    const HEADER_MAPPINGS = {
        system: ["SYSTEM *", "SYSTEM"],
        site_code: ["SITE_CODE *", "SITE_CODE"],
        nodeb_name: [
            "NODEB_NAME *", "NODEB_NAME", "ENODEB_NAME *", "ENODEB_NAME",
            "GNODEB_NAME *", "GNODEB_NAME"
        ],
        type: ["TYPE *", "TYPE"],
        tower_type: ["TOWER TYPE *", "TOWER TYPE", "TOWER_TYPE *", "TOWER_TYPE"],
        cell_id: [
            "CELL ID **", "CELL ID *", "CELL ID",
            "CELL_ID **", "CELL_ID *", "CELL_ID"
        ],
        nodeb_id: ["NODEB_ID **", "NODEB_ID *", "NODEB_ID"],
        gnodeb_id: ["GNODEB_ID **", "GNODEB_ID *", "GNODEB_ID"],
        local_cellid: [
            "LOCAL_CELLID **", "LOCAL_CELLID *", "LOCAL_CELLID",
            "LOCAL CELLID **", "LOCAL CELLID *", "LOCAL CELLID"
        ],
        bw: [
            "BW **", "BW *", "BW",
            "BANDWIDTH **", "BANDWIDTH *", "BANDWIDTH"
        ],
        cell_count: [
            "CELL COUNT **", "CELL COUNT *", "CELL COUNT",
            "CELL_COUNT **", "CELL_COUNT *", "CELL_COUNT"
        ]
    };

    function cellValueToString(value) {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
            if (value.text !== undefined) return String(value.text);
            if (value.result !== undefined) return String(value.result);
            if (value.richText) {
                return value.richText.map(x => x.text || "").join("");
            }
        }
        return String(value);
    }

    async function readDataset(filePath) {
        assertLibraries();

        const response = await fetch(filePath, { cache: "no-store" });
        if (!response.ok) throw new Error(`Dataset not found: ${filePath}`);

        const arrayBuffer = await response.arrayBuffer();
        const workbook = new window.ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        if (!workbook.worksheets.length) {
            throw new Error("Dataset does not contain any worksheet.");
        }

        const worksheet = workbook.worksheets[0];
        const headers = [];
        const row = [];

        for (let column = 1; column <= worksheet.columnCount; column++) {
            headers.push(cellValueToString(worksheet.getCell(1, column).value));
            row.push(cellValueToString(
                worksheet.getRow(2).getCell(column).value
            ));
        }

        return { workbook, worksheet, sheetName: worksheet.name, headers, row };
    }

    function validateBasicParameters(params) {
        const required = {
            system: "System",
            site_code: "Site Code",
            nodeb_name: "NodeB Name",
            type: "Type"
        };
        for (const [key, label] of Object.entries(required)) {
            if (!params[key]) return { error: `${label} is required.` };
        }
        return null;
    }

    function validateRNC(params, is3G2100) {
        if (!is3G2100) return null;
        if (!params.rnc) return { error: "RNC is required for 3G2100." };
        if (!RNC_3G2100_OPTIONS.includes(params.rnc)) {
            return {
                error:
                    `Invalid RNC: ${params.rnc}. Please select a valid 3G2100 RNC.`,
                validRNC: RNC_3G2100_OPTIONS
            };
        }
        return null;
    }

    function validateCellParameters(params) {
        const system = String(params.system || "").trim().toUpperCase();
        const cellId = String(params.cell_id || "").trim();
        const localCellId = String(params.local_cellid || "").trim();
        if (!/^\d+$/.test(cellId)) return { error: "CELL ID must contain digits only." };

        const numericCellId = Number(cellId);
        if (!Number.isFinite(numericCellId)) return { error: "CELL ID must be a valid number." };

        if (system === "3G2100") {
            if (cellId.length !== 5) return { error: "CELL ID must be 5 digits for 3G2100." };
            if (numericCellId <= 0) return { error: "CELL ID must be greater than 0 for 3G2100." };
            if (!/^\d+$/.test(localCellId)) return { error: "LOCAL CELLID must contain digits only." };
            const maxLocal = String(params.type || "").trim().toUpperCase().startsWith("DIST") ? 999 : 99;
            const localNumber = Number(localCellId);
            if (!Number.isFinite(localNumber) || localNumber <= 0 || localNumber > maxLocal) {
                return { error: `LOCAL CELLID must be between 1 and ${maxLocal} for 3G2100.` };
            }
        } else if (system === "4G1800" || system === "4G2100") {
            if (cellId.length !== 3) return { error: `CELL ID must be 3 digits for ${system}.` };
            if (numericCellId <= 0) return { error: `CELL ID must be greater than 0 for ${system}.` };
        } else if (system === "4G2600") {
            if (cellId.length !== 3) return { error: "CELL ID must be 3 digits for 4G2600." };
            if (numericCellId < 10) return { error: "CELL ID must be greater than or equal to 10 for 4G2600." };
        } else if (system === "5G2600") {
            if (cellId.length < 1 || cellId.length > 5) return { error: "CELL ID must be 1-5 digits for 5G2600." };
            if (numericCellId <= 0) return { error: "CELL ID must be greater than 0 for 5G2600." };
        }
        return null;
    }

    function validate5G2600(params) {
        if (!params.gnodeb_id) return { error: "GNODEB ID is required for 5G2600." };
        if (!/^\d{6}$/.test(params.gnodeb_id)) return { error: "GNODEB ID must be 6 digits." };

        if (!params.cell_id) return { error: "CELL ID is required for 5G2600." };
        const cellId5G = String(params.cell_id).trim();
        if (!/^\d{1,5}$/.test(cellId5G)) {
            return { error: "CELL ID must be 1-5 digits for 5G2600." };
        }
        if (Number(cellId5G) <= 0) {
            return { error: "CELL ID must be greater than 0 for 5G2600." };
        }
        params.cell_id = cellId5G;
        params.local_cellid = cellId5G;

        if (!params.bw) return { error: "BW is required for 5G2600." };
        if (!BW_5G2600_OPTIONS.includes(params.bw)) {
            return {
                error: `Invalid BW: ${params.bw}. Please select 40, 60, 80, or 100.`,
                validBW: BW_5G2600_OPTIONS
            };
        }

        if (!params.cell_count) return { error: "CELL COUNT is required for 5G2600." };
        const cellCountValue = Number.parseInt(params.cell_count, 10);
        if (!Number.isFinite(cellCountValue)) return { error: "CELL COUNT must be a number." };
        if (cellCountValue < CELL_COUNT_MIN || cellCountValue > CELL_COUNT_MAX) {
            return { error: "CELL COUNT must be between 1 and 10." };
        }
        params.cell_count = String(cellCountValue);
        return null;
    }

    function validateAllCellCount(params, hasCellParameters) {
        if (!hasCellParameters) return null;
        if (!params.cell_count) return { error: "CELL COUNT is required." };
        const cellCountValue = Number.parseInt(params.cell_count, 10);
        if (!Number.isFinite(cellCountValue)) return { error: "CELL COUNT must be a number." };
        if (cellCountValue < CELL_COUNT_MIN || cellCountValue > CELL_COUNT_MAX) {
            return { error: "CELL COUNT must be between 1 and 10." };
        }
        params.cell_count = String(cellCountValue);
        return null;
    }

    function prepareContext(input) {
        const params = {};
        for (const key of [
            "system", "site_code", "nodeb_name", "type", "tower_type",
            "cell_id", "nodeb_id", "gnodeb_id", "local_cellid", "rnc",
            "bw", "cell_count"
        ]) {
            params[key] = String(input?.[key] ?? "").trim();
        }

        const system = params.system;
        const normalizedSystem = system.trim().toUpperCase();
        const is3G2100 = normalizedSystem === "3G2100";
        const is4G = normalizedSystem.startsWith("4G");
        const is5G2600 = normalizedSystem === "5G2600";
        const hasCellParameters = is3G2100 || is4G || is5G2600;

        const basicError = validateBasicParameters(params);
        if (basicError) throw new Error(basicError.error);

        const rncError = validateRNC(params, is3G2100);
        if (rncError) throw new Error(rncError.error);

        const cellError = validateCellParameters(params);
        if (cellError) throw new Error(cellError.error);

        if (is5G2600) {
            const fiveGError = validate5G2600(params);
            if (fiveGError) throw new Error(fiveGError.error);
        }

        const countError = validateAllCellCount(params, hasCellParameters);
        if (countError) throw new Error(countError.error);

        const filePath = getDatasetFile(system);
        const typeCode = getTypeCode(normalizedSystem, params.type);
        const safeCC = safeCellCount(params.cell_count);

        return {
            ...params,
            normalized_system: normalizedSystem,
            is_3g2100: is3G2100,
            is_4g: is4G,
            is_5g2600: is5G2600,
            is_4g2600: normalizedSystem === "4G2600",
            has_cell_parameters: hasCellParameters,
            file_path: filePath,
            type_code: typeCode,
            safe_cc: safeCC
        };
    }

    function buildTemplateRow(excelHeaders, baseRow, computedValues) {
        const normalized = {};
        for (const [key, value] of Object.entries(computedValues)) {
            const normalizedKey = normalizeColumnName(key);
            normalized[normalizedKey] = normalizeGeneratedIdValue(
                normalizedKey,
                value,
                computedValues.SYSTEM
            );
        }

        return excelHeaders.map((header, index) => {
            const key = normalizeColumnName(header);
            if (Object.prototype.hasOwnProperty.call(normalized, key)) {
                return String(normalized[key] ?? "");
            }
            return index < baseRow.length ? String(baseRow[index] ?? "") : "";
        });
    }

    function computeGeneratedValues(
        normalizedSystem, position, total, siteCode, typeCode,
        towerType, cellId, bw, localCellid = ""
    ) {
        const towerCode = getTowerCode(towerType, position);
        const values = {};

        if (Object.prototype.hasOwnProperty.call(CELL_NAME_MIDDLE, normalizedSystem)) {
            values.CELL_NAME =
                `${siteCode}${typeCode}${CELL_NAME_MIDDLE[normalizedSystem]}${towerCode}`;
        }

        values.SYSTEM = normalizedSystem;
        values.SITE_CODE = siteCode;
        values.TYPE = "";
        values.TOWER_TYPE = towerType;
        values.REF_CODE_PHASE = siteCode;

        if (normalizedSystem === "3G2100") {
            Object.assign(values, FIX_3G2100);
            values.CELL_ID = sequenceNumericValue(cellId, position, 5);
            const localLength = String(typeCode || "").trim().toUpperCase() === "D" ? 3 : 2;
            values.LOCAL_CELLID = sequenceNumericValue(localCellid, position, localLength);
            values.SAC = values.CELL_ID;
            values.TIME_OFFSET = TIME_OFFSET_BY_CELL_COUNT[String(position)] || "";
            values.RRU_MODEL_1 = rruModelForPosition(position, total);
        } else if (normalizedSystem === "4G1800") {
            Object.assign(values, FIX_4G1800);
            values.CELL_ID = sequenceNumericValue(cellId, position, 3);
            values.LOCAL_CELLID = values.CELL_ID;
            values.RRU_MODEL_1 = rruModelForPosition(position, total);
        } else if (normalizedSystem === "4G2100") {
            Object.assign(values, FIX_4G2100);
            values.CELL_ID = sequenceNumericValue(cellId, position, 3);
            values.LOCAL_CELLID = values.CELL_ID;
            values.RRU_MODEL_1 = rruModelForPosition(position, total);
        } else if (normalizedSystem === "5G2600") {
            Object.assign(values, FIX_5G2600_COMMON);
            Object.assign(values, BW_5G2600_MAP[String(bw)] || {});
            values.CELL_ID = sequenceNumericValue(cellId, position, 5);
            values.LOCAL_CELLID = values.CELL_ID;
        }

        return { values, towerCode };
    }

    function computePairValues(siteCode, typeCode, towerType, position, cellId) {
        const towerCode = getTowerCode(towerType, position);
        // 4G2600 input is the 265 reference (e.g. 181).
        // Generate 265 from the entered value first, then derive 264 by -10.
        let base265 = Number.parseInt(String(cellId ?? "").trim(), 10);
        if (!Number.isFinite(base265)) base265 = 0;

        const cell265Id = sequenceNumericValue(String(base265), position, 3);
        const cell264Id = sequenceNumericValue(String(base265 - 10), position, 3);

        const cell264Values = {
            ...FIX_4G2600_COMMON,
            ...CELL_264_FIX,
            CELL_NAME: `${siteCode}${typeCode}264${towerCode}`,
            CELL_ID: cell264Id,
            LOCAL_CELLID: cell264Id,
            REF_CODE_PHASE: siteCode
        };

        const cell265Values = {
            ...FIX_4G2600_COMMON,
            ...CELL_265_FIX,
            CELL_NAME: `${siteCode}${typeCode}265${towerCode}`,
            CELL_ID: cell265Id,
            LOCAL_CELLID: cell265Id,
            REF_CODE_PHASE: siteCode
        };

        return { cell264Values, cell265Values };
    }

    function buildPreviewResponse(ctx, dataset) {
        const { headers, row: safeRow } = dataset;
        const total = Number.parseInt(ctx.safe_cc, 10);
        const rows = [];
        const pairs = [];

        if (ctx.normalized_system === "4G2600") {
            for (let position = 1; position <= total; position++) {
                const { cell264Values, cell265Values } =
                    computePairValues(
                        ctx.site_code, ctx.type_code, ctx.tower_type,
                        position, ctx.cell_id
                    );

                for (const values of [cell264Values, cell265Values]) {
                    values.SYSTEM = ctx.normalized_system;
                    values.SITE_CODE = ctx.site_code;
                    values.ENODEB_NAME = ctx.nodeb_name;
                    values.TYPE = ctx.type;
                    values.TOWER_TYPE = ctx.tower_type;
                    values.ENODEB_ID = ctx.nodeb_id;
                    values.CELL_COUNT = String(total);
                }

                const row264 = buildTemplateRow(headers, safeRow, cell264Values);
                const row265 = buildTemplateRow(headers, safeRow, cell265Values);
                rows.push(row264, row265);

                pairs.push({
                    pairIndex: position,
                    cell264: { headers, row: row264 },
                    cell265: { headers, row: row265 }
                });
            }
        } else {
            for (let position = 1; position <= total; position++) {
                const { values } = computeGeneratedValues(
                    ctx.normalized_system, position, total,
                    ctx.site_code, ctx.type_code, ctx.tower_type,
                    ctx.cell_id, ctx.bw, ctx.local_cellid
                );

                values.TYPE = ctx.type;
                values.TOWER_TYPE = ctx.tower_type;
                values.CELL_COUNT = String(total);

                if (ctx.normalized_system === "3G2100") {
                    values.NODEB_NAME = ctx.nodeb_name;
                    values.NODEB_ID = ctx.nodeb_id;
                    values.RNC = ctx.rnc;
                } else if (
                    ctx.normalized_system === "4G1800" ||
                    ctx.normalized_system === "4G2100"
                ) {
                    values.ENODEB_NAME = ctx.nodeb_name;
                    values.ENODEB_ID = ctx.nodeb_id;
                } else if (ctx.normalized_system === "5G2600") {
                    values.GNODEB_NAME = ctx.nodeb_name;
                    values.GNODEB_ID = ctx.gnodeb_id;
                    values.BW = ctx.bw;
                }

                rows.push(buildTemplateRow(headers, safeRow, values));
            }
        }

        return {
            success: true,
            system: ctx.system,
            siteCode: ctx.site_code,
            nodebName: ctx.nodeb_name,
            type: ctx.type,
            towerType: ctx.tower_type,
            cellId: ctx.normalized_system === "5G2600"
                ? normalize5G2600CellId(ctx.cell_id)
                : normalizeDisplayId(ctx.cell_id),
            nodebId: normalizeDisplayId(ctx.nodeb_id),
            gnodebId: normalizeDisplayId(ctx.gnodeb_id),
            localCellid: ctx.normalized_system === "5G2600"
                ? normalize5G2600CellId(ctx.local_cellid)
                : normalizeDisplayId(ctx.local_cellid),
            rnc: ctx.rnc,
            rncOptions: RNC_3G2100_OPTIONS,
            bw: ctx.bw,
            bwOptions: BW_5G2600_OPTIONS,
            cellCount: total,
            filePath: ctx.file_path.split("/").pop(),
            sheetName: dataset.sheetName,
            headers,
            row: rows.length ? rows[0] : [],
            rows,
            isPaired: ctx.normalized_system === "4G2600",
            pairCount: ctx.normalized_system === "4G2600" ? total : null,
            pairs: ctx.normalized_system === "4G2600" ? pairs : null,
            fileName: getExportFilename(ctx.system, ctx.site_code)
        };
    }

    async function generate(params) {
        const ctx = prepareContext(params);
        const dataset = await readDataset(ctx.file_path);
        return buildPreviewResponse(ctx, dataset);
    }

    /* =========================================================
       EXCEL EXPORT DATATYPE HANDLING

       Keep blank cells as true Excel blanks (null), not empty
       strings.  The 3G import system validates a number of
       columns as INT, so those values must be written as real
       JavaScript numbers by ExcelJS.
    ========================================================== */

    const INTEGER_COLUMNS_3G2100 = new Set([
        "MCC", "CELL_ID", "NODEB_ID", "LOCAL_CELLID",
        "LAC", "RNC_ID", "RAC", "URA_ID1", "URA_ID2", "URA_ID3",
        "SAC", "PSC", "CPICHPWR", "MAX_TX_PWR", "BW", "FREQ_BAND",
        "DL_UARFCN", "UL_UARFCN", "SECTOR_QUANTITY", "CELL_RADIUS",
        "CARRIER_INDICATOR", "CN_OPERATOR_GROUP_INDEX", "LOCAL_AREA_ID",
        "SERVICE_PRIORITY_GROUP_INDEX", "TIME_OFFSET", "RRU_NUM_1",
        "RRU_NUM_2", "RTFMCSIDENTIFIER", "NRTFMCSIDENTIFIER",
        "HSDPAFMCSIDENTIFIER", "HSPAFMCSIDENTIFIER", "DCELLHSDPAFMCSID",
        "RTWITHHSDPAFMCSIDENTIFIER", "RTWITHHSPAFMCSIDENTIFIER",
        "RTFMCIIDENTIFIER", "NRTFMCIIDENTIFIER", "HSDPAFMCIIDENTIFIER",
        "RTWITHHSDPAFMCIIDENTIFIER", "RTFMCGIDENTIFIER",
        "NRTFMCGIDENTIFIER", "HSDPAFMCGIDENTIFIER",
        "RTWITHHSDPAFMCGIDENTIFIER", "CELLWEIGHTFORHSDPALAYERING",
        "CELLBARRED", "OBJECT_NUMBER", "TCELL", "RZ", "LCG",
        "TX_FREQUENCY(MHZ)", "RECEIVING_FREQUENCY(MHZ)"
    ]);

    const INTEGER_ID_COLUMNS = new Set([
        "CELL_ID", "NODEB_ID", "ENODEB_ID", "GNODEB_ID", "LOCAL_CELLID"
    ]);
    const INTEGER_COLUMNS_4G = new Set([
        "ENODEB_ID", "CELL_ID", "LOCAL_CELLID", "TAC", "LAC", "SBTS_ID",
        "POWER_INDEX", "SECTOR_EQUIPMENT_ID", "CN_OPERATOR_GROUP_INDEX", "LOCAL_AREA_ID",
        "FREQ_BAND", "CARRIER_INDICATOR", "DL_EARFCN", "UL_EARFCN", "BW", "RSI", "PCI",
        "RSPWR", "PA", "PB", "CELL_RADIUS", "RRU_NUM_1", "RRU_NUM_2", "RCN_ID",
        "PMAX", "PRACHCS", "ULCOMP_SET", "PRACH_CONFINDEX", "EXPECTED_CELLSIZE",
        "EXPECTED_CELLRANGE", "EUTRA_CELL_ID", "DLRSBOOST", "DIRECTION_INSTALLATION", "CA_POOL_ID"
    ]);

    function excelExportValue(normalizedKey, value, is3G2100 = false, is5G2600 = false, is4G = false) {
        if (value === null || value === undefined || value === "") return null;

        if (INTEGER_ID_COLUMNS.has(normalizedKey)) {
            const text = String(value).trim();
            if (text === "") return null;
            const formatted = (is5G2600 &&
                (normalizedKey === "CELL_ID" || normalizedKey === "LOCAL_CELLID"))
                ? normalize5G2600CellId(text)
                : normalizeDisplayId(text);

            // Keep a significant leading zero as text; otherwise export IDs as numbers.
            if (/^0\d+/.test(formatted)) return formatted;
            const numeric = Number(formatted);
            return Number.isFinite(numeric) ? numeric : formatted;
        }

        if ((is3G2100 && INTEGER_COLUMNS_3G2100.has(normalizedKey)) ||
            (is4G && INTEGER_COLUMNS_4G.has(normalizedKey))) {
            const text = String(value).trim();
            if (text === "") return null;
            const numeric = Number(text);
            return Number.isFinite(numeric) ? numeric : value;
        }

        return value;
    }

    function setWorksheetRowFromValues(worksheet, rowNumber, headers, sourceRow, templateHeaders) {
        const sourceValues = {};
        const normalizedTemplateKeys = templateHeaders.map(normalizeColumnName);
        const is3G2100 = normalizedTemplateKeys.includes("RTFMCSIDENTIFIER");
        const is5G2600 = normalizedTemplateKeys.includes("SSBDESCMETHOD") || normalizedTemplateKeys.includes("SSB_DESC_METHOD");
        const is4G = !is3G2100 && !is5G2600 && normalizedTemplateKeys.includes("ENODEB_NAME");

        for (let i = 0; i < headers.length; i++) {
            const key = normalizeColumnName(headers[i]);
            if (key) {
                sourceValues[key] = i < sourceRow.length ? sourceRow[i] : null;
            }
        }

        for (let column = 1; column <= templateHeaders.length; column++) {
            const templateKey = normalizeColumnName(templateHeaders[column - 1]);
            const cell = worksheet.getCell(rowNumber, column);

            if (templateKey && Object.prototype.hasOwnProperty.call(sourceValues, templateKey)) {
                cell.value = excelExportValue(
                    templateKey,
                    sourceValues[templateKey],
                    is3G2100,
                    is5G2600,
                    is4G
                );
            } else {
                cell.value = null;
            }
        }
    }

    async function createWorkbookForOrder(order) {
        const ctx = prepareContext(order);
        const dataset = await readDataset(ctx.file_path);
        const response = buildPreviewResponse(ctx, dataset);

        const workbook = dataset.workbook;
        const worksheet = dataset.worksheet;

        const templateHeaders = [];
        for (let column = 1; column <= worksheet.columnCount; column++) {
            templateHeaders.push(cellValueToString(worksheet.getCell(1, column).value));
        }

        if (worksheet.rowCount > 1) {
            worksheet.spliceRows(2, worksheet.rowCount - 1);
        }

        response.rows.forEach((sourceRow, index) => {
            setWorksheetRowFromValues(
                worksheet,
                index + 2,
                response.headers,
                sourceRow,
                templateHeaders
            );
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return { buffer, filename: getExportFilename(ctx.system, ctx.site_code), family: ctx.normalized_system.slice(0, 2) };
    }

    async function exportSingle(params) {
        const result = await createWorkbookForOrder(params);
        const timestamp = createDownloadTimestamp();
        return {
            blob: new Blob([result.buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }),
            filename: getTimestampedExportFilename(
                params.system,
                params.site_code,
                timestamp.text
            )
        };
    }

    async function exportBatch(orders) {
        if (!Array.isArray(orders) || !orders.length) {
            throw new Error("No orders to export.");
        }

        const families = new Map();
        const errors = [];

        for (const order of orders) {
            if (!order || typeof order !== "object" || Array.isArray(order)) continue;

            try {
                const ctx = prepareContext(order);
                const dataset = await readDataset(ctx.file_path);
                const response = buildPreviewResponse(ctx, dataset);
                const family = ctx.normalized_system.slice(0, 2);

                if (!families.has(family)) {
                    families.set(family, {
                        templatePath: ctx.file_path,
                        sheetName: dataset.sheetName,
                        orders: [],
                        filename: `${family}_Orders.xlsx`
                    });
                }

                families.get(family).orders.push({
                    ctx,
                    dataset,
                    response
                });
            } catch (error) {
                errors.push({
                    system: String(order.system || ""),
                    error: error && error.message
                        ? error.message
                        : "Invalid order."
                });
            }
        }

        if (!families.size) {
            throw new Error("No valid orders to export.");
        }

        // One master timestamp for the entire ZIP download.
        // Every Excel entry inside the ZIP uses exactly this same
        // timestamp and the same timestamp in its filename.
        const masterTimestamp = createDownloadTimestamp();
        const zip = new window.JSZip();

        for (const [family, familyData] of families.entries()) {
            // Data.py uses the first order in a family to select that family's
            // template, then appends all generated rows from the family.
            const firstDataset = await readDataset(familyData.templatePath);
            const workbook = firstDataset.workbook;
            const worksheet = firstDataset.worksheet;

            const templateHeaders = [];
            for (let column = 1; column <= worksheet.columnCount; column++) {
                templateHeaders.push(
                    cellValueToString(worksheet.getCell(1, column).value)
                );
            }

            if (worksheet.rowCount > 1) {
                worksheet.spliceRows(2, worksheet.rowCount - 1);
            }

            let rowNumber = 2;

            for (const item of familyData.orders) {
                for (const sourceRow of item.response.rows) {
                    setWorksheetRowFromValues(
                        worksheet,
                        rowNumber++,
                        item.response.headers,
                        sourceRow,
                        templateHeaders
                    );
                }
            }

            const buffer = await workbook.xlsx.writeBuffer();
            const timestampedFilename = `${family}_Orders_${masterTimestamp.text}.xlsx`;

            // JSZip stores this date in the ZIP entry metadata.  Therefore
            // extracted files inherit the same master timestamp as the ZIP
            // generation moment rather than the individual workbook build time.
            zip.file(timestampedFilename, buffer, {
                date: masterTimestamp.date,
                createFolders: false
            });
        }

        return {
            blob: await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE"
            }),
            filename: "Orders.zip",
            errors
        };
    }

    function downloadBlob(blob, filename) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    }

    window.AutoGenDeploy = Object.freeze({
        generate,
        exportSingle,
        exportBatch,
        getDatasetFile,
        getExportFilename,
        RNC_3G2100_OPTIONS: [...RNC_3G2100_OPTIONS],
        BW_5G2600_OPTIONS: [...BW_5G2600_OPTIONS],
        downloadBlob
    });
})();
