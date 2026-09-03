# AutoGenParameters — GitHub Pages

Static GitHub Pages build of the current `RunLocal` version.

## Logic
- `Deploy.js` is the browser-side replacement for `RunLocal/Data.py`.
- Generation rules, fixed parameters, CELL ID sequencing, 4G2600 264/265 pairing,
  RRU logic, BW mapping, template-column mapping, and export grouping are
  ported from the current RunLocal logic.
- `static/Data.js` and `static/Data.css` are based on the current RunLocal files.
- `index.html` is the current RunLocal page converted from Flask template paths
  to GitHub Pages relative paths.

## Files
- `index.html`
- `Deploy.js`
- `static/Data.js`
- `static/Data.css`
- `static/ICON.png`
- `Datasets/Template_MP_Cell3G.xlsx`
- `Datasets/Template_MP_Cell4G.xlsx`
- `Datasets/Template_MP_Cell5G.xlsx`
- `.nojekyll`

## GitHub Pages
Upload the contents to the repository root and enable GitHub Pages from the
desired branch and `/ (root)`.

The browser loads ExcelJS 4.4.0 and JSZip 3.10.1 from jsDelivr. No Flask,
Python, or local server is required.
