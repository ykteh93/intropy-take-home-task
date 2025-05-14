import { Layout } from 'react-grid-layout';

export type ChartData = {
  [key: string]: ChartDataEntry;
};

export type ChartDataEntry = {
  title: string | undefined;
  chartType: string;
  options: Highcharts.Options;
};
export interface LayoutContextType {
  layouts: Layout[];
  chartData: ChartData;
  updateLayouts: (newLayouts: Layout[]) => void;
  updateChartData: (id: string, data: ChartDataEntry) => void;
  addChart: () => void;
  removeChart: (id: string) => void;
}
