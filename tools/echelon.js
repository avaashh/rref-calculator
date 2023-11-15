const matrixDeepCopy = (matrix) => {
  const res = [];

  for (let r = 0; r < matrix.length; r++) {
    res.push([]);
    for (let c = 0; c < matrix[0].length; c++)
      res[res.length - 1].push(matrix[r][c]);
  }

  return res;
};

const echelonSolve = (steps, rowSize, colSize) => {
  const currMatrix = matrixDeepCopy(steps[steps.length - 1].matrix);

  // row echelon form
  for (let i = 0; i < Math.min(rowSize, colSize); i++) {
    let pivotRow = i;

    for (let j = i + 1; j < rowSize; j++) {
      if (
        currMatrix[j][i].value() !== 0 &&
        currMatrix[j][i].abs().greaterThan(currMatrix[pivotRow][i].abs())
      ) {
        pivotRow = j;
      }
    }

    if (currMatrix[pivotRow][i].value() === 0) {
      // Check if any row below has a non-zero value in the current column
      let swap = false;
      for (let j = pivotRow + 1; j < rowSize; j++) {
        if (currMatrix[j][i].value() !== 0) {
          swap = true;
          break;
        }
      }

      if (swap) {
        [currMatrix[i], currMatrix[pivotRow]] = [
          currMatrix[pivotRow],
          currMatrix[i],
        ];

        if (pivotRow !== i)
          steps.push({
            matrix: matrixDeepCopy(currMatrix),
            operations: {
              [pivotRow + 1]: `R_${i + 1}`,
              [i + 1]: `R_${pivotRow + 1}`,
            },
          });
      } else {
        continue; // Skip if pivot element is zero and no non-zero values below
      }
    }

    for (let j = i + 1; j < rowSize; j++) {
      const factor = currMatrix[j][i]
        .divide(currMatrix[i][i])
        .multiply(new Fraction(-1));

      for (let k = i; k < colSize; k++) {
        currMatrix[j][k] = currMatrix[j][k].add(
          currMatrix[i][k].multiply(factor)
        );
      }

      if (factor.value() !== 0)
        steps.push({
          matrix: matrixDeepCopy(currMatrix),
          operations: {
            [j + 1]: `R_${j + 1} + (${factor.toTex()}) \\times R_${i + 1}`,
          },
        });
    }
  }

  // Back-substitution
  for (let i = rowSize - 1; i >= 0; i--) {
    if (currMatrix[i][i].value() !== 0) {
      for (let j = i - 1; j >= 0; j--) {
        const factor = currMatrix[j][i]
          .divide(currMatrix[i][i])
          .multiply(new Fraction(-1));

        for (let k = colSize - 1; k >= i; k--) {
          currMatrix[j][k] = currMatrix[j][k].add(
            currMatrix[i][k].multiply(factor)
          );
        }

        if (factor.value() !== 0)
          steps.push({
            matrix: matrixDeepCopy(currMatrix),
            operations: {
              [j + 1]: `R_${j + 1} + (${factor.toTex()}) \\times R_${i + 1}`,
            },
          });
      }
    }
  }

  // Normalize pivot elements to 1
  for (let i = 0; i < rowSize; i++) {
    if (currMatrix[i][i].value() !== 0) {
      const factor = new Fraction(1).divide(currMatrix[i][i]);

      for (let j = i; j < colSize; j++) {
        currMatrix[i][j] = currMatrix[i][j].multiply(factor);
      }

      if (factor.value() !== 0)
        steps.push({
          matrix: matrixDeepCopy(currMatrix),
          operations: {
            [i + 1]: `(${factor.toTex()}) \\times R_${i + 1}`,
          },
        });
    }
  }

  // move all 0s to bottom row
  var do_till = rowSize;
  for (let row = 0; row < do_till; row++) {
    let all_zeros = true;
    for (let col = 0; all_zeros && col < colSize; col++) {
      if (currMatrix[row][col].value() !== 0) all_zeros = false;
    }

    if (all_zeros) {
      let tmpRow = currMatrix[row];

      let _operations = {};
      for (let r = row + 1; r < do_till; r++) {
        currMatrix[r - 1] = currMatrix[r];
        _operations[r] = `R_${r + 1}`;
      }
      currMatrix[currMatrix.length - 1] = tmpRow;
      _operations[currMatrix.length] = `R_${row + 1}`;

      steps.push({
        matrix: matrixDeepCopy(currMatrix),
        operations: _operations,
      });

      do_till -= 1;
    }
  }

  return steps;
};

const processMatrix = () => {
  const rowSize = document.getElementById("row-size").value;
  const colSize = document.getElementById("col-size").value;

  if (rowSize === "" || colSize === "") return;

  const matrix = new Array(rowSize);
  // initialize matrix
  for (var i = 0; i < rowSize; i++) {
    matrix[i] = new Array(colSize);
  }

  for (let r = 0; r < rowSize; r++) {
    for (let c = 0; c < colSize; c++) {
      const element = document.getElementById(`m-${r}-${c}`).value;
      if (element === "") return;

      matrix[r][c] = new Fraction(parseFloat(element));
    }
  }

  const steps = [{ matrix: matrixDeepCopy(matrix), operations: {} }];
  openPDFPopup(texify(echelonSolve(steps, matrix.length, matrix[0].length)));
};
