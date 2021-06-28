export const defaultTransition = [
  {property: "left", surroundingStrings: ["", "%"], previous: -80, current: 0, next: 100},
  {property: "opacity", surroundingStrings: ["", "%"], previous: 0, current: 100, next: 0},
  {property: "width", surroundingStrings: ["", "%"], previous: 80, current: 100, next: 80},
  {property: "height", surroundingStrings: ["", "%"], previous: 80, current: 100, next: 80}
];

export const plainTransition = [
  {property: "left", surroundingStrings: ["", "%"], previous: -100, current: 0, next: 100}
];

export const cinematicTransition = [
  {property: "transform", surroundingStrings: ["rotate3d(1, 1, 1, ", "deg)"], previous: -90, current: 0, next: 90},
  {property: "opacity", surroundingStrings: ["", "%"], previous: 0, current: 100, next: 0},
  {property: "left", surroundingStrings: ["", "%"], previous: -100, current: 0, next: 100},
  {property: "top", surroundingStrings: ["", "%"], previous: -100, current: 0, next: 100}
];

export const threeDSpinTransition = [
  {property: "transform", surroundingStrings: ["rotate3d(0, 1, 0, ", "deg)"], previous: -90, current: 0, next: 90},
  {property: "opacity", surroundingStrings: ["", "%"], previous: 0, current: 100, next: 0}
];

export const twoDSpinTransition = [
  {property: "transform", surroundingStrings: ["rotate3d(0, 0, 1, ", "deg)"], previous: -90, current: 0, next: 90},
  {property: "opacity", surroundingStrings: ["", "%"], previous: 0, current: 100, next: 0}
];

export const diagonalTransition = [
  {property: "top", surroundingStrings: ["", "%"], previous: -100, current: 0, next: 100},
  {property: "left", surroundingStrings: ["", "%"], previous: -100, current: 0, next: 100}
];

export const verticalTransition = [
  {property: "top", surroundingStrings: ["", "%"], previous: -100, current: 0, next: 100}
];

export const scaleDownTransition = [
  {property: "transform", surroundingStrings: ["scale(", ", " , ")"], previous: 0.2, current: 1, next: 0.2},
  {property: "opacity", surroundingStrings: ["", "%"], previous: 0, current: 100, next: 0}
];
