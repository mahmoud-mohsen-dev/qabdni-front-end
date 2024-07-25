import { EChart } from '@kbox-labs/react-echarts';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

const labelOption = {
  show: true,
  position: 'insideBottom',
  distance: 10,
  align: 'left',
  verticalAlign: 'middle',
  rotate: 90,
  //   formatter: '{c}',
  formatter: '{c} - {name|{a}}',
  fontSize: 10,
  rich: {
    name: {}
  }
} as const;

function AgeDistributionChart() {
  return (
    <EChart
      use={[TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]}
      style={{
        width: '100%',
        height: '100%'
      }}
      tooltip={{
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }}
      legend={{
        data: ['<20 years', '<30 years', '<40 years', '<50 years', '<60 years'],
        bottom: '0'
      }}
      grid={{
        left: '0%',
        right: '0%',
        bottom: '20%',
        top: '25',
        containLabel: true
      }}
      xAxis={[
        {
          type: 'category',
          axisTick: { show: false },
          data: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jul']
        }
      ]}
      yAxis={[
        {
          type: 'value'
        }
      ]}
      series={[
        {
          name: '<20 years',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 450]
        },
        {
          name: '<30 years',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 20]
        },
        {
          name: '<40 years',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 10]
        },
        {
          name: '<50 years',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [98, 77, 101, 99, 40, 60]
        },
        {
          name: '<60 years',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 100]
        }
      ]}
      stateAnimation={{ duration: 300, easing: 'cubicOut' }}
      animation={true}
      animationDuration={1000}
      animationDurationUpdate={500}
      animationEasing="cubicInOut"
      animationEasingUpdate="cubicInOut"
      animationThreshold={2000}
      progressiveThreshold={3000}
      progressive={400}
      hoverLayerThreshold={3000}
      animationDelay={600}
    />
  );
}

export default AgeDistributionChart;
