
<template>
  
       <div class="d-ticket-order d-ticket-order-page dashboard-g-col bg-white p-3 organizer-h-w-l">
          <div class="d-col-top d-flex justify-content-between" v-if="showSearch">
              <div class="d-g-search d-flex">
                <span class="position-relative  profile-g-f profile-g-btn export-ticket-order-span">
                  <button type="button"  @click="exportToExcel" class="d-flex justify-content-between align-items-center gap-2  f-g-btn pe-2 ps-2">Export to Excel <span><img :src="exportBtnSvg" /></span></button>
                </span>

                <span class="position-relative me-5">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <input type="text" @keyup="search" placeholder="Search...">
                </span>

                <span class="position-relative ticket-order-filter-dropdown ">
                  <select class="form-control flex items-end form-select all-event-dropdown" v-model="filter.eventId" @change="getData()">
                    <option value="">All Events</option>
                    <option :value="item._id" v-for="item of events">{{ (item.title != '') ? item.title : 'Untitled Event' }}</option>
                  </select>
                </span>
              </div>
          </div>
          <div class="d-col-top d-flex justify-content-between" v-if="showViewAllOption">
              <div class="d-g-title d-flex">
                <span>Ticket Orders</span>
              </div>
              <div class="d-g-btn-link">
                <router-link :to="{ name: ROUTES.TICKET_ORDERS}">
                  View All
                </router-link>
              </div>
          </div>
          <div class="d-col-col-m d-flex justify-content-between mt-3">
            <div class="d-ticket-order-t d-page-max-h d-globel-t d-flex gap-3 flex-wrap justify-content-between">
              <table class="table table-striped">
                <thead>
              <tr>
                <th
                        v-for="(header,index) in tableHeader"
                        :key="header"
                        scope="col"
                        
                >
                      {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ticket,index) in tableData" :key="ticket._id" :class="index % 2 !== 0 ? 'bg-site__light__gray' : ''">
                <td>
                  {{ `#${index+1}` }}
                </td>
                <td >
                  <router-link :to="{ name:ROUTES.EVENT,params:{eventTitle:createSeoFriendlyUrl(ticket?.event?.title)} }" class="text-primary__color font-light hover:text-heading__color">
                    {{ ticket?.event?.title }}
                  </router-link>
                </td>
                <td >
                  {{ !ticket?.isGuest ? `${ticket?.seeker?.firstName} ${ticket?.seeker?.lastName}` : `${ticket?.guest?.email}`}}
                </td>
                <td >
                  {{ datepipe(ticket?.event?.startDateTime?.split("T")[0]) }}
                </td>
                <td> {{ dateModel.date2(ticket?.createdAt) }}</td>
                <td>
                  {{ (!ticket?.event?.isCancelled ? (ticket?.isConfirmed ? "Booking Confirmed" : "Confirmation Pending") : 'Event Cancelled'   ) }}
                </td>
                
                <td>
                  {{ !ticket?.isAbsorbFee ? (ticket?.ticketPrice * ticket?.tickets ).toFixed(2) : ((ticket?.ticketPrice * ticket?.tickets ) - ticket?.platformFee - ticket?.stripeFee).toFixed(2)}}
                </td>
                <td>
                  {{ `${ticket?.tickets} for $${ticket?.totalAmount.toFixed(2)}` }}
                </td>
              </tr>
              
            </tbody>
          
            </table>                 
          </div>
          </div>
       </div>
</template>
  
  <script setup>
  import {reactive,ref} from "vue";
  import {ROUTES} from "@/utils/constants/routes";
  import dateModel from "@/models/date.model";
  import ApiClient from "@/methods/apiclient";
  import tokenService from "@/services/token.service";
  import { createSeoFriendlyUrl } from "@/utils/helpers";
  import ExcelJS from 'exceljs';
  import exportBtnSvg from "@/assets/icon-park.svg";
  
  const role = localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization'; //HERE
  
  const user=ref(tokenService.getUser())
  const events=ref([])
  const ticketOrdersList=ref([])
  const tableData=ref([])
  const isLoading=ref(false)
  
  const props = defineProps({
    showSearch:Boolean,
    showViewAllOption:Boolean,
    dataLimit:String
  })

  const filter=reactive({
    page:1,
    limit:props.dataLimit ? props.dataLimit : 9999999,
    eventId:''
  })
  
  const datepipe=(p)=>{
    return dateModel.date2(p)
  }
  
  const tableHeader = reactive(['Order#','Event','Buyer','Start Date','Purchase Date','Status','Amount Received','Total'])
  
  const getEvents=()=>{
    ApiClient.get('event/my',{role:role,userId:user.value._id,page:1,limit:100,isPublished:true}).then(res=>{
      if(res.data){
        events.value=res.data
      }
    })
  }
  getEvents()
  const getData=()=>{
    ApiClient.get('booking/orders',{role:role,organizerId:user.value._id,...filter}).then(res=>{
      if(res.data){
        ticketOrdersList.value=res.data
        tableData.value=res.data
      }
    })
  }
  getData()
  const filteredTicketsList = ref([]);

  const search = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filteredTicketsList.value = ticketOrdersList.value.filter((ticket) => {
      // Combine firstName and lastName for searching
      let status = (ticket.event.isCancelled ? 'Event Cancelled' : (ticket.isConfirmed ? 'Booking Confirmed' : 'Confirmation Pending'));
      let amountReceived = (!ticket.isAbsorbFee ? (ticket.ticketPrice * ticket.tickets ).toFixed(2) : ((ticket.ticketPrice * ticket.tickets ) - ticket.platformFee - ticket.stripeFee).toFixed(2));
      
      let seekerUserName = '';
      if (ticket.isGuest) {
        seekerUserName = ticket.guest.email;
      } else {
        seekerUserName = ticket.seeker.firstName + ' ' + ticket.seeker.lastName;
      }


      // Implement your filtering logic here based on the search term
      // For example, you can check if the title or any other property includes the searchTerm
      return (
        ticket.event.title.toLowerCase().includes(searchTerm) ||
        seekerUserName.toLowerCase().includes(searchTerm) ||
        status.toLowerCase().includes(searchTerm) ||
        amountReceived.toLowerCase().includes(searchTerm)
      );
    });
    tableData.value = filteredTicketsList.value

  };

  const exportToExcel = () => {

    // You need to implement the logic for exporting data to Excel here.
    // You can use a library like ExcelJS or implement a custom solution.

    // For example, using ExcelJS:
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ticket Orders');

    // Add headers
    worksheet.addRow(tableHeader);
    // Add data rows
    ticketOrdersList.value.forEach((ticket,ticketIndex) => {
      console.log('ticketIndex',ticketIndex)
      const rowData = [
        `#${ticketIndex + 1}`,
        ticket?.event?.title,
        !ticket?.isGuest ? `${ticket?.seeker?.firstName} ${ticket?.seeker?.lastName}` : `${ticket?.guest?.email}`,
        datepipe(ticket?.event?.startDateTime?.split("T")[0]),
        ticket?.isConfirmed ? "Booking Confirmed" : "Confirmation Pending",
        !ticket?.isAbsorbFee ? (ticket?.ticketPrice * ticket?.tickets).toFixed(2) : ((ticket?.ticketPrice * ticket?.tickets) - ticket?.platformFee - ticket?.stripeFee).toFixed(2),
        `${ticket?.tickets} for $${ticket?.totalAmount.toFixed(2)}`
      ];
      worksheet.addRow(rowData);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ticket_orders.xlsx';
      
      // Trigger a click on the link to start the download
      a.click();
      window.URL.revokeObjectURL(url);
    });
    };

</script>
