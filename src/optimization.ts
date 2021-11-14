import { solve } from "./MaxProfitMinFlowRateAlgo";
export interface Point {
  flowPerDay: number,
  dollarsPerDay: number,
}
interface WaterOperation {
  name: string,
  id: string,
  revenueStructure: Point[],
}

export interface ServerRequest {
  flowRateIn: number;
  operations: WaterOperation[];
  type: "CURRENT_STATE";
};

export interface ServerResponse {
  incrementalRevenue: number,
  revenuePerDay: number,
  flowRateIn: number,
  flowRateToOperations: number,
  type: "OPTIMATION_RESULT",
  currentPitVolume?: number,
  maximumPitVolume?: number,
}

export type ClientResponse = {
  operationId: string,
  flowRate: number,
}[];

// You should do better!
export function processRequest(request: ServerRequest): ClientResponse {
  const evenDistribution = request.flowRateIn / request.operations.length;
  const revenueStructures = request.operations.map(operation => {
    return operation.revenueStructure;
  })
  const optimium = solve(revenueStructures, request.flowRateIn);
  console.log(optimium);

  return request.operations.map((operation, index) => {
    return {
      operationId: operation.id,
      flowRate: optimium[index].flowPerDay
    }
  })
}