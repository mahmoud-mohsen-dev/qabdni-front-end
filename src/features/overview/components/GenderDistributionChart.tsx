import { EChart } from '@kbox-labs/react-echarts';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LegendComponent, TooltipComponent } from 'echarts/components';
import { LabelLayout } from 'echarts/features';

function GenderDistributionChart() {
  return (
    <div className="flex-grow">
      <EChart
        use={[PieChart, CanvasRenderer, LabelLayout, TooltipComponent, LegendComponent]}
        renderer={'svg'}
        style={{
          height: '100%',
          width: '100%',
          padding: 0
        }}
        tooltip={{ trigger: 'item' }}
        legend={{
          top: '85%',
          left: 'center',
          icon: 'circle',
          // orient: 'vertical',
          textStyle: {
            fontSize: '13px',
            fontFamily: 'Libre Franklin, sans-serif',
            fontWeight: 500
          }
        }}
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
        series={[
          {
            name: 'Gender Distribution',
            type: 'pie',
            radius: ['55%', '80%'],
            center: ['50%', '72%'],
            // adjust the start and end angle
            startAngle: 180,
            endAngle: 360,
            data: [
              {
                value: 2,
                name: 'Female',
                itemStyle: { color: '#FAAB3C' },
                label: {
                  show: true,
                  formatter: (data) => data.percent?.toString().split('.')[0] + '%',
                  fontWeight: 'bold'
                }
              },
              {
                value: 10,
                name: 'Male',
                itemStyle: { color: '#23EB31' },
                label: {
                  show: true,
                  formatter: (data) => data.percent?.toString().split('.')[0] + '%',
                  fontWeight: 'bold'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}

export default GenderDistributionChart;
