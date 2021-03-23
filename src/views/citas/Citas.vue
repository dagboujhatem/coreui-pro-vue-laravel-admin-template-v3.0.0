<template>
  <CRow>
   <CCol sm="12">
    <CCard>
      <CCardHeader class="p-1">
      <h5 class="text-info ml-2 m-2"> Citas y Recordatorios </h5>
      <br>
      <CitasRecordatorios :citas="true" />
      </CCardHeader>
    </CCard>

 
    <CCard sm="">  
      <div class="card-header-actions ml-4 m-2">
        <CForm inline>
        <CSelect
          :options="['year', 'month', 'week']"
          :value.sync="displayPeriod"
          label="View"
          add-wrapper-classes="ml-2"
        />
        <h4 class="ml-auto my-auto">
          <CBadge v-if="message" color="primary">{{ message }}</CBadge>
        </h4>

        <CButton 
      shape='pill'  @click="nvocita = true"  class="mr-3" color="info">

      Nueva Cita 
         <CIcon name="cil-plus"/> 
        </CButton>
       </CForm>
       <CModal 
      size="lg"
      title="Nueva Citas y Recordatorios"
      color="dark"
      :show.sync="nvocita"
    > 
    <NvoCita/>
     <template #footer>
        <CButton  @click="nvocita= false" ><CIcon name="cilArrowThickToLeft"/> Cancelar</CButton>
        <CButton  color="success"> Guardar</CButton>
      </template>
    </CModal>
      </div>   

    <CCardBody>
      <CRow sm="">
        <CCol sm="8">
      <calendar-view
        id="calendar"
        :events="events"
        enable-drag-drop
        :show-date="showDate"
        :displayPeriodUom="displayPeriod"
        currentPeriodLabel="icons"
        :class="themeClasses"
        @click-date="onClickDay"
        @click-event="onClickEvent"
        @drop-on-date="onDrop"
        @show-date-change="setShowDate"
        ref="calendarView"
      >
        <calendar-view-header
					slot="header"
					slot-scope="{ headerProps }"
					:header-props="headerProps"
					@input="setShowDate"
				/>
      </calendar-view>
      </CCol>
      <CCol sm="">
       
            <CTabs add-tab-classes="mt-1">
              <CTab>
                <template slot="title">
                  <CIcon name="cil-bell"/> {{tabs[0]}}
                </template>
               

              </CTab>
              <CTab>
                <template slot="title">
                  <CIcon name="cil-calendar"/> {{tabs[1]}}
                </template>
                
              </CTab>
            </CTabs>
          
      </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      
    </CCardFooter>

   
  </CCard>
 </CCol>
  </CRow>
  
  
    
</template>

<script>
import {
    CalendarView, 
    CalendarViewHeader, 
    CalendarMathMixin 
}from 'vue-simple-calendar'
import 'vue-simple-calendar/static/css/default.css'
import 'vue-simple-calendar/static/css/holidays-us.css'
import axios from 'axios'
import CitasRecordatorios from './CitasRecordatorios'
import NvoCita from '../citas/NvoCita'

 const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();
   const sampleEvents = [];

export default {
  name: 'citas',
  mixins: [CalendarMathMixin],
  components: {
    NvoCita,
    CitasRecordatorios,
    CalendarView,
      CalendarViewHeader
  },
  data: function () {
      return {
        nvocita: false,
        message: '',
        showDate: currDate,
        displayPeriod: 'month',
        events: sampleEvents,
        useDefaultTheme: true,
        useHolidayTheme: true,
        tabs: [
        'Por Confirmar',
        'Para Hoy'
      ],
      activeTab: 1,
      }
    },
    computed: {
      themeClasses() {
        return {
          'theme-default': this.useDefaultTheme,
          'holiday-us-traditional': this.useHolidayTheme,
          'holiday-us-official': this.useHolidayTheme,
        }
      }
    },
    methods: {
      
    nvocita(){
    this.$router.push({path: '/nvocita'});
      },  
      setShowDate(d) {
        this.showDate = d;
      },
      onClickDay(d) {
        this.message = `You clicked: ${d.toLocaleDateString()}`
      },
      onClickEvent(e) {
        this.message = `You clicked: ${e.title}`
      },
      onDrop(event, date) {
        this.message = `Moved: ${event.title || event.id} to ${date.toLocaleDateString()}`
        // Determine the delta between the old start date and the date chosen,
        // and apply that delta to both the start and end date to move the event.
        const eLength = this.dayDiff(event.startDate, date)
        event.originalEvent.startDate = this.addDays(event.startDate, eLength)
        event.originalEvent.endDate = this.addDays(event.endDate, eLength)
      }
    },
  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';
  #calendar {
    color: $body-color;
    height: 63vh;
    margin-left: auto;
    margin-right: auto;
  }
  .theme-default .cv-event {
    background-color: #C8CED3;
    border-color: $table-border-color;
    color: $body-color;
  }
  .theme-default .cv-event.success {
    background-color: $success;
    border-color: lighten($success, 5%);
  }
  .theme-default .cv-event.danger {
    background-color: $danger;
  }
  .theme-default .cv-event.primary {
    background-color: #20A8D8;
  }
  .theme-default .cv-event.orange {
    background-color: #F8CB00;
    border-color: lighten(#F8CB00, 5%);
  }
  .theme-default .cv-day.today {
    background-color: $gray-300;
  }
  .theme-default .cv-day.today > .cv-day-number {
    background-color: #20A8D8;
    border-radius: 50%;
    position: absolute;
    left: 0;
  }
  .theme-default .cv-day.past {
     background-color: $body-bg;
  }
  .theme-default .cv-day.outsideOfMonth {
     background-color: $body-bg;
  }
  .theme-default .cv-weeks,
  .theme-default .cv-day {
    border-color: $table-border-color;
  }
  .theme-default .cv-header,
  .theme-default .cv-header-days,
  .theme-default .cv-header-day {
    background-color: #E4E5E6;
    border-color: $table-border-color;
    border-style: solid;
  }
  .theme-default .cv-header-nav > button {
    color: $body-color;
    background-color: $input-bg;
    border-color: $input-border-color;
  }
  .theme-default .cv-day.draghover {
    box-shadow: inset 0 0 0.2em 0.2em #321FDB;
  }
</style>

