# AutoGenParameters — GitHub Pages

This package is the static deployment version of AutoGenParameters.

## Files

- `index.html` — application entry point
- `Deploy.js` — static Excel loader and dataset generator
- `static/Data.js` — UI, validation, and AutoGen flow
- `static/Data.css` — UI styles
- `static/ICON.png` — favicon
- `Datasets/Template_MP_Cell3G.xlsx`
- `Datasets/Template_MP_Cell4G.xlsx`
- `Datasets/Template_MP_Cell5G.xlsx`
- `.nojekyll` — keeps GitHub Pages from applying Jekyll processing

## GitHub Pages

Upload the contents of this folder to the repository root, then enable:

**Settings → Pages → Deploy from a branch → `main` → `/ (root)`**

The application is frontend-only. It does not require Flask, Python, `Data.py`, a server, or an `/autogen` endpoint.

## Dataset loading

The browser loads the appropriate Excel template:

- 3G → `Template_MP_Cell3G.xlsx`
- 4G → `Template_MP_Cell4G.xlsx`
- 5G → `Template_MP_Cell5G.xlsx`

SheetJS is loaded from the SheetJS CDN by `index.html`.

## Important scope

The current ZIP did not contain the former `Data.py` implementation. Therefore this deployment package does **not invent the missing engineering formulas/parameter rules**. AutoGen loads the real selected Excel template and fills the unambiguous UI inputs (`SYSTEM`, `SITE_CODE`, and `NODEB/ENODEB/GNODEB NAME`) into matching template columns. Other template parameters remain blank until their original generation rules are available.
