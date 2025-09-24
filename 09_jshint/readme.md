# JSHint Usage

npx jshint sample_bad.js → surfaces issues (missing semicolons + ==) thanks to the stricter rules in .jshintrc.

npx jshint sample_ok.js → exits cleanly when the code satisfies those rules.

npx jshint . → lints the whole folder while skipping node_modules/ via .jshintignore; current output highlights the same problems in sample_bad.js.