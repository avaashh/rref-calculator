const renderMatrix = (matrix, operations, withArrow = false) => {
  var texMat = "";

  if (withArrow) texMat += "\\[{\\longrightarrow}\\begin{pmatrix}\n";
  else texMat += "\\[\\begin{pmatrix}\n";

  for (let row = 0; row < matrix.length; row++)
    texMat += matrix[row].join(" & ") + "\\\\";

  texMat += "\\end{pmatrix} \n \\quad \n \\begin{matrix} \n";

  for (let row = 0; row < matrix.length; row++)
    if (operations[row + 1] === undefined) texMat += "\\\\ \n";
    else texMat += `R_${row + 1} \\rightarrow ${operations[row + 1]} \\\\ \n`;

  texMat += "\\end{matrix} \\]";
  return texMat;
};

const texify = (steps) => {
  for (let i = 0; i < steps.length; i++) {
    const matrix = steps[i].matrix;
    for (let row = 0; row < matrix.length; row++)
      for (let col = 0; col < matrix[0].length; col++)
        matrix[row][col] = matrix[row][col].toTex();
  }

  var tex = "We use row operations to obtain reduced echelon form: \n";
  for (let i = 0; i < steps.length; i++) {
    tex += renderMatrix(steps[i].matrix, steps[i].operations, i !== 0);
  }

  return tex;
};
