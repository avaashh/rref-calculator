// Function to open PDF popup
function openPDFPopup(tex) {
  // Create a new window
  const pdfWindow = window.open("", "_blank");

  // Write the PDF content to the new window
  pdfWindow.document.write(
    "<html><head><title>AB - Echelon Form Calculator</title></head><body style='display:flex; justify-content:center;margin-top:50px'>"
  );
  pdfWindow.document.write(
    `<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script type="text/javascript" id="MathJax-script" async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
    </script>`
  );
  pdfWindow.document.write(
    `<div id="pdfContainer" style="width:80%; max-width: 400px">

        ${tex}

    </div>`
  );
  pdfWindow.document.write("</body></html>");

  // Close the writing mode
  pdfWindow.document.close();
}
