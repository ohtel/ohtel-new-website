const sass = require('sass');
const fs = require('fs');
const path = require('path');

// ...existing code...

// Compile SCSS to CSS
const result = sass.renderSync({
  file: path.resolve(__dirname, 'src/styles/main.scss'),
  outFile: path.resolve(__dirname, 'dist/styles/main.css'),
  sourceMap: true,
  outputStyle: 'compressed'
});

// Write the compiled CSS to the output file
fs.writeFileSync(path.resolve(__dirname, 'dist/styles/main.css'), result.css);
fs.writeFileSync(path.resolve(__dirname, 'dist/styles/main.css.map'), result.map);

// ...existing code...
