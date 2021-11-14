import { Point } from "./optimization";

let ansMaxFlow: number;
let ansMaxProfitPoints: Point[];

// Question Variables
let points: Point[][];
let rows: number;
let cols: number;

export function solve(pointList: Point[][], targetSum: number): Point[] {
    rows = pointList.length;
    cols = pointList[0].length;

    points = pointList;
    ansMaxFlow = Number.MIN_VALUE;

    backtrack(-1, 0, 0, targetSum, []);
    console.log("Max Flow Possible" + ansMaxFlow);
    return ansMaxProfitPoints;
}

export function backtrack(processIndex: number, pointIndex: number, profit: number, currSum: number, path: Point[]) {

    if (processIndex >= rows || pointIndex >= cols) return;
    if (currSum < 0) return;

    if (processIndex === rows - 1) {
        if (profit > ansMaxFlow) {
            ansMaxFlow = profit;
            let newPath: Point[] = Object.assign([], path);
            ansMaxProfitPoints = newPath;
        }
        return;
    }

    for (let c = 0; c < cols; c++) {
        if (processIndex + 1 < rows) {
            path.push(points[processIndex + 1][c]);

            backtrack(
                    processIndex + 1, c, profit + points[processIndex + 1][c].dollarsPerDay, currSum - points[processIndex + 1][c].flowPerDay, path);

            path.pop();
        }
    }
}