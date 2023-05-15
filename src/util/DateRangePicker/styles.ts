import styled from 'styled-components';

interface DateRangePickerProps {
    insideModal?:boolean
}

export const Container = styled.div<DateRangePickerProps>`
    max-width: 100%;
    box-shadow: 0 0.0625rem 0.125rem 0 rgba(35, 57, 66, 0.21);
    border-radius: 4px;
    max-width: 200px;
    z-index: 2;
    position: ${props => !props.insideModal? 'fixed' : 'relative'};
    div {
        //contains the inputs and the selects
        background-color: white;
        border: none;
        z-index: 2;
        max-height: 2.5rem;
        select {
            //it does nothing (apparently)
            border-radius: 4px;
            .rdrMonthPicker{
                //this is the select month and year
                max-width: 1.125rem;
            }
            option {
                //this is the select month and year
                border-radius: 4px;
                color: var(--text-blue-primary);
            }
            ::-webkit-scrollbar{
                width: 0.3125rem;
                height: 0.3125rem;
                justify-content: center;
                align-items: center;
                padding: none;
                margin: none;
                border-radius: 4px;
                }
            ::-webkit-scrollbar-track{
                background-color: var(--color-grey-secundary);
                height: 0.4375rem;
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb{
                background-color: var(--primary-color);
                border-radius: 4px;
            }
        }
        .rdrMonths{
        //it does nothing (apparently)
        }
        .rdrWeekDays{
            //this is the calendar header
            display: inline-table;
            background-color: white;
            //background-color: var(--color-grey-primary);
            span{
                //this is the calendar span
                background-color: transparent;
                font-size: 0.825rem;
                margin: 0.1rem;
            }
        }
                .rdrDays{
                //this is the calendar background (behind the buttons)
                    min-width: 184px;
                    width: 200px;
                    max-width: 200px;
                    display: inline-table;
                    background-color: white;
                    padding-left: 0.375rem;
                    button{
                        //these are the buttons
                        background-color: white;
                        padding-left: 0.625rem;
                        width: 1.2rem;
                        border-color: transparent;
                        border-radius: 4px;
                        margin: 0.26rem;
                        align-items: center ;
                        .rdrDayNumber{
                            //are the numbers of the days (inside the button)
                            display: flex;
                            width: 100%;
                            color: var(--text-blue-primary);
                            justify-content: flex-end;
                        }
                            .rdrSelected{
                                //it does nothing (apparently)
                            }
                            .rdrInRange{
                                //it does nothing (apparently)
                            }
                            .rdrStartEdge{
                                //it does nothing (apparently)
                            }
                            .rdrEndEdge{
                                //it does nothing (apparently)
                            }
                            .rdrSelected{
                                //it does nothing (apparently)
                            }
                        &:hover{
                            //this is the hover on top of the buttons
                            background-color: var(--color-blue-primary);
                            span{
                                //this is the hover on top of the text
                                color: var(--text-white-primary);
                            }
                        }
                    }
                }
                .rdrCalendarWrapper{
                //it does nothing (apparently)
                }
                .rdrDateDisplayWrapper{
                //this is background from both inputs
                    margin-bottom: none;
                    max-height: 4.6875rem;
                }
                .rdrDateDisplay{
                    //these are the two inputs together
                    top: 0;
                    margin: 0.8rem;
                    outline: none;
                }
                .rdrDateDisplayItem{
                    //these are the two inputs separately
                    margin-bottom: 0.2rem;
                    outline: none;
                    border-radius: 4px;
                    box-shadow: 0 0.0625rem 0.125rem 0 rgba(35, 57, 66, 0.21);
                    border: 1px solid transparent;
                }
                .rdrDateDisplayItem input{
                    //it does nothing (apparently)
                    border: 0.0625rem;
                    background: transparent;
                    width: 100%;
                    color: var(--text-grey-primary);
                }
                .rdrDateDisplayItemActive{
                    //the first input (from above)
                    list-style: none;
                    border-radius: 4px;
                    border-color: 0.25rem var(--color-blue-primary);
                }
                .rdrDateDisplayItemActive input{
                    //inside the first input (from the top)
                    color: var(--primary-color);
                    outline: none;
                }
                .rdrMonthAndYearWrapper {
                    //all month and year
                    background-color: white;
                    align-items: center;
                    height: 3.125rem;
                    padding-left: 0.25rem;
                    color: var(--primary-color);
                }
                .rdrMonthAndYearPickers{
                    //a little more inside the whole month and year
                    font-weight: 900;
                }
                .rdrMonthAndYearPickers select{
                    //I finally found the color range!!!!! THE RANGE IS HERE!!!
                    -moz-appearance: none;
                    appearance: none;
                    -webkit-appearance: none;
                    border: 0;
                    background: transparent;
                    padding: 0.625rem 1.875rem 0.625rem 0.625rem;
                    border-radius: 4px;
                    outline: 0;
                    color: var(--text-blue-primary);
                    cursor: pointer;
                    text-align: center;
                    background-position: right 0.5rem center;
                }
                .rdrMonthAndYearPickers select:hover{
                    //it does nothing (apparently)
                    background-color: rgba(0,0,0,0.07);
                }
                .rdrMonthPicker, .rdrYearPicker{
                    //it does nothing (apparently)
                    margin: 0 0.3125rem;
                    select {
                        option{
                        }
                    }
                }
                .rdrNextPrevButton {
                    //this one is previous month's button
                    visibility: hidden ;
                    display: block;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin: 0 0.833em;
                    padding: 0;
                    border: 0;
                    border-radius: 5px;
                    background: var(--text-on-brand-color);
                }
                .rdrNextPrevButton:hover{
                    //this one is hover of the previous month button
                    visibility: hidden ;
                    background: var(--text-on-brand-color);
                }
                .rdrNextPrevButton i {
                    //these are properties of the previous month button
                    visibility: hidden;
                    display: block;
                    width: 0;
                    height: 0;
                    padding: 0;
                    text-align: center;
                    border-style: solid;
                    margin: auto;
                    transform: translate(-3px, 0px);
                }
                .rdrPrevButton i {
                    //here the icon inside the button is changed
                    border-color: transparent rgb(52, 73, 94) transparent transparent;
                    transform: translate(-3px, 0px);
                }
                .rdrNextButton i {
                    //here are properties of the next month button
                    margin: 0 0 0 0.4375rem;
                    border-width: 0.25rem 0.25rem 0.25rem 0.375rem;
                    border-color: transparent transparent transparent rgb(52, 73, 94);
                    transform: translate(3px, 0px);
                }
                    .rdrWeekDays {
                        //takes the properties of every day of the week
                        display: table;
                        max-width: 100%;
                        max-height: 6.25rem;
                        background-color: transparent;
                    }
                    .rdrMonth{
                        //this is the padding of the weekdays table
                        padding: 0;
                    }
                    .rdrMonth .rdrWeekDays {
                        //apparently nothing here
                        padding: 0;
                    }
                    .rdrMonths.rdrMonthsVertical .rdrMonth:first-child .rdrMonthName{
                        //apparently nothing here
                        display: none;
                    }
                    .rdrWeekDay {
                        //this is the text of the days of the week (literally)
                        background-color: transparent;
                        font-weight: 400;
                        line-height: 2.667em;
                        padding-right: 0.1125rem;
                        padding-left: 0.1125rem;
                        color: var(--text-blue-primary);
                    }
                    .rdrDay {
                        //everything here is for RANGE!!! IMPORTANT!!!
                        background: transparent;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        border: 0;
                        padding: 0;
                        line-height: 3.000em;
                        height: 2rem;
                        color: var(--text-blue-primary);
                    }
                    .rdrDay:focus {
                        //I still don't understand that
                        outline: 0;
                    }
                    .rdrDayNumber {
                        //here it messes with some of the 
                        //properties of light blue... 
                        //but I still don't quite understand
                        outline: 0;
                        font-weight: 300;
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        top: 0.3125rem;
                        bottom: 0.3125rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .rdrDayToday .rdrDayNumber span{
                        //here is for changing properties of the current day
                        font-weight: 500;
                        color: var(--text-blue-primary);
                    }
                    .rdrDayToday .rdrDayNumber span:after{
                        //it moves a little trace on the current day
                        content: '';
                        position: absolute;
                        bottom: 0.25rem;
                        left: 50%;
                        transform: translate(-50%, 0);
                        width: 1.125rem;
                        height: 0;
                        border-radius: 0.125rem;
                        background: var(--text-blue-alternative);
                    }
                    .rdrDayToday:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span:after,.rdrDayToday:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span:after,.rdrDayToday:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span:after,.rdrDayToday:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span:after{
                        //does nothing
                        background: var(--color-white-primary);
                    }
                    .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,.rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,.rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span,.rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span{
                        //is the color of the numbers after clicked
                        color: rgba(255, 255, 255, 0.85);
                    }
                    .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge{
                        //here it changes the range part a lot!!! it is important!!!
                        background: currentColor;
                        position: absolute;
                        top: 0.375rem;
                        left: 0;
                        right: 0;
                        bottom: 0.3125rem;
                    }
                    .rdrSelected{
                        //does nothing here
                        left: 0.125rem;
                        right: 0.125rem;
                    }
                    .rdrInRange{
                        //here messes with the range properties (intermediate)
                        border-radius: 4px;
                    }
                    .rdrStartEdge{
                        //here are the properties of the range hover (start)
                        border-radius: 4px;
                        //border-top-left-radius: 0.5em;
                        //border-bottom-left-radius: 0.5em;
                        //left: 2px;
                    }
                    .rdrEndEdge{
                        border-radius: 4px;
                        //here are the properties of the range hover (end)
                        //border-top-right-radius: 0.5em;//1.042em;
                        //border-bottom-right-radius: 0.5em;//1.042em;
                        //right: 2px;
                    }
                    .rdrSelected{
                        border-radius: 4px;
                        //border-radius: 1.042em;
                    }
                    .rdrDayStartOfMonth .rdrInRange, .rdrDayStartOfMonth .rdrEndEdge, .rdrDayStartOfWeek .rdrInRange, .rdrDayStartOfWeek .rdrEndEdge{
                        //border-top-left-radius: 1.042em;
                        //border-bottom-left-radius: 1.042em;
                        //left: 2px;
                        border-radius: 4px;
                    }
                    .rdrDayEndOfMonth .rdrInRange,  .rdrDayEndOfMonth .rdrStartEdge,  .rdrDayEndOfWeek .rdrInRange,  .rdrDayEndOfWeek .rdrStartEdge{
                        //border-top-right-radius: 1.042em;
                        //border-bottom-right-radius: 1.042em;
                        //right: 2px;
                        border-radius: 4px;
                    }
                    .rdrDayStartOfMonth .rdrDayInPreview, .rdrDayStartOfMonth .rdrDayEndPreview, .rdrDayStartOfWeek .rdrDayInPreview, .rdrDayStartOfWeek .rdrDayEndPreview{
                        //border-top-left-radius: 1.333em;
                        //border-bottom-left-radius: 1.333em;
                        //border-left-width: 1px;
                        //left: 0px;
                        border-radius: 4px;
                    }
                    .rdrDayEndOfMonth .rdrDayInPreview, .rdrDayEndOfMonth .rdrDayStartPreview, .rdrDayEndOfWeek .rdrDayInPreview, .rdrDayEndOfWeek .rdrDayStartPreview{
                        //border-top-right-radius: 1.333em;
                        //border-bottom-right-radius: 1.333em;
                        //border-right-width: 1px;
                        //right: 0px;
                        border-radius: 4px;
                    }
                    .rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview{
                        //here you can change properties of the range border (dotted)
                        background: rgba(255, 255, 255, 0.09);
                        position: absolute;
                        top: 0.3125rem;
                        left: 0;
                        right: 0;
                        bottom: 0.3125rem;
                        pointer-events: none;
                        border: 0px solid currentColor;
                        z-index: 2;
                    }
                    .rdrDayStartPreview{
                        //here is the dotted line of the range! (the start)
                        border-top-width: 0.0625rem;
                        border-left-width: 0.0625rem;
                        border-bottom-width: 0.0625rem;
                        border-top-left-radius: 0.25rem;//1.333em;
                        border-bottom-left-radius: 0.25rem;//1.333em;
                        left: 0;
                    }
                    .rdrDayInPreview{
                        //here is the dotted line of the range! (in the middle)
                        border-top-width: 0.0625rem;
                        border-bottom-width: 0.0625rem;
                    }
                    .rdrDayEndPreview{
                        //here is the dotted line of the range! (the end)
                        border-top-width: 0.0625rem;
                        border-right-width: 0.0625rem;
                        border-bottom-width: 0.0625rem;
                        border-top-right-radius: 0.25rem;//1.333em;
                        border-bottom-right-radius: 0.25rem;//1.333em;
                        right: 0.125rem;
                        right: 0;
                    }
                    .rdrDefinedRangesWrapper{
                        //does nothing here
                        font-size: 0.75rem;
                        width: 14.125rem;
                        border-right: solid 1px #eff2f7;
                        background: var(--color-white-primary);
                    }
                    .rdrDefinedRangesWrapper .rdrStaticRangeSelected{
                        //does nothing here
                        color: currentColor;
                        font-weight: 600;
                    }
                    .rdrStaticRange{
                        //does nothing here
                        border: 0;
                        cursor: pointer;
                        display: block;
                        outline: 0;
                        border-bottom: 1px solid #eff2f7;
                        padding: 0;
                        background: var(--color-white-primary);
                    }
                    .rdrStaticRange:hover .rdrStaticRangeLabel,.rdrStaticRange:focus .rdrStaticRangeLabel{
                        //does nothing here
                        background: var(--color-white-primary);
                    }
                    .rdrStaticRangeLabel{
                        //does nothing here
                        display: block;
                        outline: 0;
                        line-height: 1.125rem;
                        padding: 0.625rem 1.25rem;
                        text-align: center;
                    }
                    .rdrInputRanges{
                        //does nothing here
                        padding: 0.625rem 0;
                    }
                    .rdrInputRange{
                        //does nothing here
                        align-items: center;
                        padding: 0.3125rem 1.25rem;
                    }
                    .rdrInputRangeInput{
                        //does nothing here
                        width: 1.875rem;
                        height: 1.875rem;
                        line-height: 1.875rem;
                        border-radius: 0.25rem;
                        text-align: center;
                        border: solid 0.0625rem rgb(222, 231, 235);
                        margin-right: 0.625rem;
                        color: rgb(108, 118, 122)
                    }
                    .rdrInputRangeInput:focus, .rdrInputRangeInput:hover{
                        //does nothing here
                        border-color: rgb(180, 191, 196);
                        outline: 0;
                        color: #333;
                    }
                    .rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after{
                        //does nothing here
                        content: '';
                        border: 1px solid currentColor;
                        border-radius: 1.333em;
                        position: absolute;
                        top: -0.125rem;
                        bottom: -0.125rem;
                        left: 0;
                        right: 0;
                        background: transparent;
                    }
                    .rdrDayPassive{
                        //does nothing
                        pointer-events: none;
                    }
                    .rdrDayPassive .rdrDayNumber span{
                        //color of days of other months
                        color: var(--text-grey-secundary);
                    }
                    .rdrDayPassive .rdrInRange, .rdrDayPassive .rdrStartEdge, .rdrDayPassive .rdrEndEdge, .rdrDayPassive .rdrSelected, .rdrDayPassive .rdrDayStartPreview, .rdrDayPassive .rdrDayInPreview, .rdrDayPassive .rdrDayEndPreview{
                        //does nothing
                        display: none;
                    }
                    .rdrDayDisabled {
                        //does nothing
                    }
                    .rdrDayDisabled .rdrDayNumber span{
                        //does nothing
                        color: var(--color-grey-primary);
                    }
                    .rdrDayDisabled .rdrInRange, .rdrDayDisabled .rdrStartEdge, .rdrDayDisabled .rdrEndEdge, .rdrDayDisabled .rdrSelected, .rdrDayDisabled .rdrDayStartPreview, .rdrDayDisabled .rdrDayInPreview, .rdrDayDisabled .rdrDayEndPreview{
                        //does nothing
                        filter: grayscale(100%) opacity(60%);
                    }                        
                    .rdrMonthName{
                        //does nothing
                        background-color: red;
                        text-align: left;
                        font-weight: 600;
                        color: var(--text-grey-secundary);
                        padding: 0.833em;
                    }
                    .rdrNextPrevButton {
                        //again is the month back button (but does nothing)
                        box-sizing: inherit;
                        cursor: pointer;
                        outline: none;
                    }
                    .rdrPrevButton {
                        //does nothing
                    }
                    .rdrNextButton {
                        //does nothing
                    }
                    .rdrMonths{
                        //here is for messing with the calendar header
                        display: flex;
                    }
                    .rdrMonthsVertical{
                        //here is for messing with the calendar header too
                        flex-direction: column;
                    }
                    .rdrMonthsHorizontal > div > div > div{
                        //does nothing
                        display: flex;
                        flex-direction: row;
                    }
                    .rdrMonth{
                        //here is for messing with the calendar header too
                        width: 27.667em;
                        max-width: 100%;
                    }
                    .rdrWeekDays{
                        //does nothing
                        display: table;
                        background-color: transparent;
                    }
                    .rdrWeekDay {
                        //does nothing
                        flex-basis: calc(100% / 7);
                        box-sizing: inherit;
                        text-align: center;
                    }
                    .rdrDays{
                        //it's the bottom of the calendar!
                        display: table;
                        flex: 1;
                        max-width: 100%;
                        height: 0.25rem;
                        flex-wrap: wrap;
                    }
                    .rdrDateDisplayWrapper{
                        //is the background of the dates
                    }
                    .rdrMonthName{
                        //does nothing
                    }
                    .rdrInfiniteMonths{
                        //does nothing
                        overflow: auto;
                    }
                    .rdrDateRangeWrapper{
                        //does nothing
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    .rdrDateInput {
                        //that's both inputs!!! (again)
                        position: relative;
                        max-width: 100%;
                        width: 12.5rem;
                    }
                    .rdrDateInput input {
                        //inside of the input!!
                        outline: none;
                    }
                    .rdrDateInput .rdrWarning {
                        //nothing here
                        position: absolute;
                        font-size: 1.6em;
                        line-height: 1.6em;
                        top: 0;
                        right: .25em;
                        color: var(--color-red-primary);
                    }
                    .rdrDay {
                        //nothing here
                        box-sizing: inherit;
                        width: calc(100% / 7);
                        position: relative;
                        font: inherit;
                        cursor: pointer;
                    }
                    .rdrDayNumber {
                        //here is important! it's the position of the text inside the range
                        display: table-row-group;
                        position: relative;
                        padding-bottom: 0.625rem;
                        padding-right: 0.125rem;
                        height: 0.125rem;
                    }
                    .rdrDayNumber span{
                        //here finally is the text (the date)!!
                        color: var(--text-blue-primary);
                    }
                    .rdrDayDisabled {
                        //nothing here
                        cursor: not-allowed;
                    }
                    @supports (-ms-ime-align: auto) {
                    .rdrDay {
                        //nothing here
                        flex-basis: 14.285% !important;
                        }
                    }
                    .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge{
                        //nothing here
                        pointer-events: none;
                    }
                    .rdrInRange{
                        //nothing here
                    }
                    .rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview{
                        //nothing here
                        pointer-events: none;
                    }
                    .rdrDayHovered{
                        //nothing here
                    }
                    .rdrDayActive{
                        //nothing here
                    }
                    .rdrDateRangePickerWrapper{
                        //nothing here
                        display: inline-flex;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    .rdrDefinedRangesWrapper{
                    //nothing here
                    }
                    .rdrStaticRanges{
                        //nothing here
                        display: flex;
                        flex-direction: column;
                    }
                    .rdrStaticRange{
                        //nothing here
                        font-size: inherit;
                    }
                    .rdrStaticRangeLabel{
                        //nothing here
                    }
                    .rdrInputRanges{
                        //nothing here
                    }
                    .rdrInputRange{
                        //nothing here
                        display: flex;
                    }
                    .rdrInputRangeInput{
                        //nothing here
                    }
                    ::-webkit-scrollbar{
                    height: 0.3125rem;
                    justify-content: center;
                    align-items: center;
                    padding: none;
                    margin: none;
                    border-radius: 4px;
                    }
                    ::-webkit-scrollbar-track{
                        background-color: var(--color-grey-secundary);
                        height: 0.4375rem;
                        border-radius: 4px;
                    }
                    ::-webkit-scrollbar-thumb{
                        background-color: var(--primary-color);
                        border-radius: 4px;
                    }
                }
`