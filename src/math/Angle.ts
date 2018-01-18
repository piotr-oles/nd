
export namespace Angle {
  export const RAD_TO_DEG = 180 / Math.PI;
  export const DEG_TO_RAD = Math.PI / 180;

  export function degrees(radians: number): number {
    return radians * RAD_TO_DEG;
  }

  export function radians(degrees: number): number {
    return degrees * DEG_TO_RAD;
  }
}
