
export namespace Compare {
  export function nearlyEqual(a: number, b: number): boolean {
    const aAbs = Math.abs(a);
    const bAbs = Math.abs(b);
    let d = Math.abs(a - b);
    let dM = Math.min(aAbs, bAbs);
    let epsilon = 0.000000119209290;

    return (
      a === b ||
      d < epsilon ||
      d < (dM * epsilon)
    );
  }
}