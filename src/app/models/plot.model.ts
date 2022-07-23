export interface Plot {
  id?: number;
  location: string;
  area: number;
  ownerName: string;
  nextIrragtionDate?: string;
  lastIrragtionDate?: string;
  plotAlerts?: any[];
  irrigationTransactions?: any[];
  plotConfigurations?: any[];
}
