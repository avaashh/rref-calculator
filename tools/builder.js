const buildMatrix = () => {
  const rowSize = document.getElementById("row-size").value;
  const colSize = document.getElementById("col-size").value;

  if (rowSize === "" || colSize === "") return;

  // Build matrix of required size
  let matrixHtml = `<div class="matrix">`;
  for (let r = 0; r < rowSize; r++) {
    matrixHtml += `<div class="row">`;
    for (let c = 0; c < colSize; c++)
      matrixHtml += `<div class="element"><input type="number" id="m-${r}-${c}" /></div>`;
    matrixHtml += `</div>`;
  }
  matrixHtml += `</div>`;

  document.getElementById("matrixInput").innerHTML = matrixHtml;
};

document.getElementById("row-size").addEventListener("input", buildMatrix);
document.getElementById("col-size").addEventListener("input", buildMatrix);

buildMatrix();
