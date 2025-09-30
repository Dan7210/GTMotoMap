//Silly little component which uses methods from ol/coordinates.js but flip the y and x.

export function format(coordinate, template, fractionDigits) {
  if (coordinate) {
    return template
      .replace('{x}', coordinate[0].toFixed(fractionDigits))
      .replace('{y}', coordinate[1].toFixed(fractionDigits));
  }
  return '';
}

export function toStringYX(coordinate, fractionDigits) {
  return format(coordinate, '{y}, {x}', fractionDigits);
}

export function createStringYX(fractionDigits) {
  return (
    function (coordinate) {
      return toStringYX(coordinate, fractionDigits);
    }
  );
}