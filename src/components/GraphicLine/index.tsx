import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts'
import moment from 'moment';

import tasklist_api from '../../services/tasklist_api';
import { Container } from './styles'

/*########################################################## 
***Version

    220905  LVM                 Initial Version
    221219  MAM                 Fix some bugs

***Description***

    component GraphicLine
        Shows the user week progress chart

***Props***
    day                         Today's day
    day_worked                  Return day worked
    task_done                   Task performed

##########################################################*/

interface GraphicLineData {
    day: number
    day_worked: string
    task_done: number

}

export function GraphicLine() {
    const { t } = useTranslation()
    const [dataGraphic, setDataGraphic] = useState<Array<GraphicLineData>>([])

    // create the list of categories, the axis X
    const categories = () => {
        var array = [] as any

        for (let i = 0; i < 7; i++) {
            let day = moment().add(i, 'days').format('dddd')
            day = day.slice(0, 3)
            array.push(t(`${day}`))
        }

        return array
    }

    const data = () => {

        var arrayEmpy = [] as any

        for (let i = 0; i < dataGraphic.length; i++) {
            //If day worked
            if (dataGraphic[i].day_worked === '1' || dataGraphic[i].task_done > 0) {
                arrayEmpy.push(dataGraphic[i].task_done)
            } else {
                //if the day is in the middle of the graphic
                if (i !== 0 && i !== dataGraphic.length - 1) {
                    //if the next and previous day were worked
                    if(dataGraphic[i + 1]?.day_worked == '1' && dataGraphic[i - 1]?.day_worked == '1'){

                        arrayEmpy.push((dataGraphic[i + 1]?.task_done + dataGraphic[i - 1]?.task_done) / 2 - 0.01)

                    //if the next day is a day off
                    }else if(dataGraphic[i + 1]?.day_worked == '0' && dataGraphic[i - 1]?.day_worked == '1'){
                        //if the next day is the last day of the graphic
                        if(dataGraphic[i] == dataGraphic[dataGraphic.length - 2 ]){
                            arrayEmpy.push(dataGraphic[i - 1]?.task_done - 0.01)
                        }else{
                            arrayEmpy.push((dataGraphic[i + 2]?.task_done/2 + dataGraphic[i - 1]?.task_done/2)- 0.01)
                        }
                        
                    //if the previous day is a day off
                    }else if(dataGraphic[i + 1]?.day_worked == '1' && dataGraphic[i - 1]?.day_worked == '0'){
                        //if the previous day is the first day of the graphic
                        if(dataGraphic[i] == dataGraphic[1]){
                            arrayEmpy.push(0)
                        }else{
                            
                            arrayEmpy.push((dataGraphic[i + 1]?.task_done + dataGraphic[i - 2]?.task_done) / 2 - 0.01)
                        }
                    
                    //if both the previous and the next days are days off
                    }else if(dataGraphic[i + 1]?.day_worked == '0' && dataGraphic[i - 1]?.day_worked == '0'){
                        if(dataGraphic[i] == dataGraphic[1]){
                            dataGraphic[i - 1]?.task_done > 0 && dataGraphic[i + 2]?.task_done > 0?
                                arrayEmpy.push((dataGraphic[i - 1]?.task_done/ 2 + dataGraphic[i + 2]?.task_done/ 2) - 0.01)
                            :
                                arrayEmpy.push(dataGraphic[i + 2]?.task_done)
                        }else if(dataGraphic[i] == dataGraphic[dataGraphic.length - 2 ]){
                            dataGraphic[i +1]?.task_done > 0 && dataGraphic[i - 2]?.task_done > 0?
                                arrayEmpy.push((dataGraphic[i - 2]?.task_done/ 2 + dataGraphic[i +1]?.task_done/ 2) - 0.01)
                            :
                                arrayEmpy.push(dataGraphic[i - 2]?.task_done)
                        }else{
                            arrayEmpy.push(dataGraphic[i].task_done)
                        }
                    }

                } else {
                    //if the day is the first of the graphic
                    if (i == 0) {
                        arrayEmpy.push(0)
                    //if the day is the last of the graphic
                    } else {
                        if(dataGraphic[i - 1]?.day_worked == '1'){
                            arrayEmpy.push(dataGraphic[i - 1]?.task_done - 0.01)
                        }else{
                            arrayEmpy.push(dataGraphic[i - 2]?.task_done - 0.01)
                        }
                    }
                }
            }

        }
        return arrayEmpy
    }

    const series : ApexAxisChartSeries = [
        {
            name: t('Tasks'),
            data: data()
        },
    ];

    const options : ApexOptions = {
        chart: {
            id: 'line',
            toolbar:{
                show:false
            },
            zoom: {
                enabled: false
            }
        },
        tooltip: {
            y: {

                formatter: function (value: any) { //Set the correct formatting value accord to the employee day worked value
                    const comparingArray: Array<number> = []
                    dataGraphic.map(data => comparingArray.push(Number(data.task_done)))
                    if (comparingArray.includes(Number(value))) {
                        return value
                    } else {
                        return t('Day off')
                    }
                }
            },
            style:{
                fontSize:'1rem',
            }
        },
        xaxis: {
            categories: categories(),
            labels: {
                style: {
                    colors: dataGraphic.map((dg, i) => dg.day_worked === '1' || dg.task_done > 0? '#000000' : '#D9D9D9'),
                    fontSize: '1rem'
                }
            },
        },
        yaxis: {
            min: 0,
            forceNiceScale: true,
            decimalsInFloat: 0,
            labels:{
                style:{
                    fontSize:'1rem'
                }
            }
        },
        title: {
            text: t('Tasks done'),
            align: 'center',
            floating: true,
            margin: 100,
            style: {
                fontSize: '1.5rem',
                fontFamily: 'Ubuntu',
                color: '#000000'
            }
        },
        stroke: {
            curve: 'smooth',
            colors: ['var(--primary-color)']
        },
        dataLabels: {
            enabled: false,
            style:{
                fontSize: '1rem'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
                
            },
        },
        responsive:[{
            breakpoint: 1921,
            options:{
                title: {
                    margin: 50
                }
            }
        }]


    };

    useEffect(() => {
        tasklist_api.post('/get_user_week_tasks').then((res) => {
            setDataGraphic(res.data)
        })
        
    }, [])

    return (
        <Container>
            {dataGraphic ?
                <Chart
                    options={options}
                    series={series}
                    type='line'
                    height={300}
                />
                :
                null
            }
        </Container>

    )
}