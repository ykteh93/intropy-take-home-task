import { useState } from 'react';

export const useMockAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateChartFromPrompt = async (prompt: string): Promise<any> => {
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Parse the prompt for keywords to determine chart type
      const promptLower = prompt.toLowerCase();
      
      // Default chart type is line
      let chartType = 'line';
      let title = 'Generated Chart';
      let series: any[] = [];
      let categories: string[] = [];
      
      // Extract chart type from prompt
      if (promptLower.includes('bar') || promptLower.includes('column')) {
        chartType = 'column';
      } else if (promptLower.includes('pie')) {
        chartType = 'pie';
      } else if (promptLower.includes('area')) {
        chartType = 'area';
      }
      
      // Extract time period keywords
      if (promptLower.includes('month')) {
        categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        title = 'Monthly Data';
      } else if (promptLower.includes('quarter')) {
        categories = ['Q1', 'Q2', 'Q3', 'Q4'];
        title = 'Quarterly Data';
      } else if (promptLower.includes('year') || promptLower.includes('annual')) {
        categories = ['2019', '2020', '2021', '2022', '2023'];
        title = 'Annual Data';
      } else if (promptLower.includes('week')) {
        categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        title = 'Weekly Data';
      } else {
        categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      }
      
      // Extract data type keywords for title
      if (promptLower.includes('revenue')) {
        title = `${title} - Revenue`;
      } else if (promptLower.includes('sales')) {
        title = `${title} - Sales`;
      } else if (promptLower.includes('profit')) {
        title = `${title} - Profit`;
      } else if (promptLower.includes('user') || promptLower.includes('visitor')) {
        title = `${title} - User Activity`;
      }
      
      // Generate random data points based on prompt
      if (chartType === 'pie') {
        series = [{
          name: 'Data',
          colorByPoint: true,
          data: [
            { name: 'Category A', y: Math.floor(Math.random() * 30) + 10 },
            { name: 'Category B', y: Math.floor(Math.random() * 30) + 10 },
            { name: 'Category C', y: Math.floor(Math.random() * 30) + 10 },
            { name: 'Category D', y: Math.floor(Math.random() * 30) + 10 },
            { name: 'Category E', y: Math.floor(Math.random() * 30) + 10 }
          ]
        }];
      } else {
        // For non-pie charts, generate time series data
        const dataSeries1 = categories.map(() => Math.floor(Math.random() * 100) + 20);
        const dataSeries2 = categories.map(() => Math.floor(Math.random() * 100) + 20);
        
        series = [
          { name: 'Series 1', data: dataSeries1 },
          { name: 'Series 2', data: dataSeries2 }
        ];
      }
      
      // Return Highcharts configuration
      return {
        chart: {
          type: chartType,
          style: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          }
        },
        title: {
          text: title
        },
        subtitle: {
          text: `Generated from: "${prompt}"`
        },
        xAxis: chartType === 'pie' ? {} : {
          categories
        },
        yAxis: chartType === 'pie' ? {} : {
          title: {
            text: 'Values'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        credits: {
          enabled: false
        },
        series
      };
    } catch (error) {
      console.error('Error generating chart:', error);
      return {
        chart: { type: 'line' },
        title: { text: 'Error Generating Chart' },
        series: [{ data: [0, 0, 0] }]
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateChartFromPrompt,
    isLoading
  };
};