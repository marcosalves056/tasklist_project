import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

import tasklist_api from '../../services/tasklist_api'
import { AppContext } from '../../services/context'
import { Container } from './styles'

/*########################################################## 
***Version

    220905  LVM                 Initial Version

***Description***

    component Graphic
        Show the user overall chart

***Props***
    tasks_done                  Number of finished tasks
    tasks_in_process            Number of tasks being done
    tasks_late                  Number of tasks overdue

##########################################################*/

interface GraphicBarChartsStackedData {
    tasks_done: string
    tasks_in_process: string
    tasks_late: string

}

export function GraphicBarChartsStacked() {
    
    const { t } = useTranslation()
    const navigate  = useNavigate()
    const { setAtmFlag } = useContext(AppContext)
    const [dataGraphic, setDataGraphic] = useState<GraphicBarChartsStackedData>({tasks_done: '0', tasks_in_process:'0', tasks_late:'0' })
    const series : ApexAxisChartSeries = [
        {
            name: t('Done'),
            data: [Number(dataGraphic.tasks_done)]
        }, {
            name: t('Working on it'),
            data: [Number(dataGraphic.tasks_in_process)]
        }, {
            name: t('Stuck'),
            data: [Number(dataGraphic.tasks_late)]
        }
    ]

    const options :ApexOptions = {
        colors: ['#00E396', '#FEB019', '#FF4560', '#008FFB', '#775DD0'],
        chart: {
            id: 'bar',
            toolbar:{
                show:false
            },
            height: 350,
            stacked: true,
            width: '100%',
            events: {
                click: function(event:any, chartContext:any, config:any) {
                    if(config.config.series[config.seriesIndex].name == t('Done')){
                        /* API call [Filter: status == closed] */
                        setAtmFlag(1)
                        navigate(`/tasksAssignedToMe`, {replace: true})
                    } else if(config.config.series[config.seriesIndex].name == t('Working on it')) {
                        /* API call [Filter: status == open] */
                        setAtmFlag(2)
                        navigate(`/tasksAssignedToMe`, {replace: true})
                    } else if(config.config.series[config.seriesIndex].name == t('Stuck')){
                        /* API call [Filter: dateDate < currentDate && status == open] */
                        setAtmFlag(3)
                        navigate(`/tasksAssignedToMe`, {replace: true})
                    }
                } 
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            categories: [],
            labels:{
                show: false
            },
            axisBorder:{
                show: false
            },
            axisTicks:{
                show: false
            },
            
        },
        yaxis: {
            show:false
            
        },
        title: {
            text: t('Tasks On Active Projects'),
            align: 'center',
            floating: true,
            margin: 60,
            style: {
                fontSize:  '1.5rem',
                fontFamily:  'Ubuntu',
                color:  '#000000'
            }
        },
        dataLabels: {
            enabled: true,
            style:{
                fontSize:'1rem'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'left',
            offsetX: 0,
            fontSize:'12.5rem'
        }
    };
    
    useEffect(()=>{
        tasklist_api.post('/get_user_overall_tasks_process').then((res)=>{
            setDataGraphic(res.data[0])
        })
    },[])
    
    return (
        <Container>
            
            {dataGraphic ?
                <>
                    <Chart
                        options={options}
                        series={series}
                        type='bar'
                        //height={'100%'}
                    />
                </>
                
                :
                null
            }
        </Container>
    )
}