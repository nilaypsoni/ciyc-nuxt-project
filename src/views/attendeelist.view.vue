
<template>
<div class="padding-left-right mt-4">
  <div class="pt-2 d-flex flex-wrap justify-content-between">
    <div >
      <p class="h2 text-secondary__color mb-3">Attendee list</p>
    </div>
    <div class="selectdiv">
      <i class="fa fa-caret-down downcls event-none" aria-hidden="true" ></i>
      <select class="form-control inersect"  v-model="filters.eventId" @change="()=>getattendedData()">
        <option value="">All Event</option>
        <option :value="item._id"  v-for="(item) in data">{{ item.title }}</option>
      </select>
    </div>
    
 
  </div>
   
    <table class="table">
      <thead class="heddingclass">
        <tr class="p-10">
          <th scope="col" class="p-4 font-normal text-white text-lg text-left">Event Name</th>
          <th scope="col" class="p-4 font-normal text-white text-lg text-left">Name</th>
          <th scope="col" class="p-4 font-normal text-white text-lg text-left">Booking Date</th>
          <th scope="col" class="p-4 font-normal text-white text-lg text-left">Event Start Date</th>
          <th scope="col" class="p-4 font-normal text-white text-lg text-left">Email</th>
        </tr>
      </thead>
      <tbody  v-for="(data) in attendData">
        <tr>
          <td>{{ data.title }}</td>
          <td v-if="data.guest_details">{{ data.guest_details.email }}</td>
          <td v-if="!data.guest_details">{{ data.firstName }} {{ data.lastName }}</td>

          <td>{{new Date(data.attendDate).toLocaleString() }}</td>
          <td>{{new Date(data.eventstartDateTime).toLocaleString() }}</td>
          <td v-if="data.guest_details">{{ data.guest_details.email }}</td>
          <td v-if="!data.guest_details">{{ data.email }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>


<style>
thead.heddingclass {
       --tw-bg-opacity: 1;
    background-color: rgb(69 106 135 / var(--tw-bg-opacity));  
}

.selectdiv {
    position: relative;
}
.downcls{
    position: absolute;
    top: 11px;
    right: 15px;
}
select.form-control.inersect {
    padding-right: 30px;
}
</style>
<script setup>
import ApiClient from "@/methods/apiclient";
import TokenService from "@/services/token.service";
import tokenService from "@/services/token.service";
import {ref,reactive} from "vue";



const userData = TokenService.getUser()
const attendData=ref('')
const data = ref([])
const loading = ref(false)
const filters = reactive({
  page:1,
  limit:100,
  eventId:''
})
console.log(data,"data");
const getattendedData=()=>{
  ApiClient.get('event/attendents',{userId:userData?._id,...filters}).then(res=>{
    attendData.value=res.data
    console.log(attendData.value,"Here is the response");
  })
}
getattendedData()

const getData=(loader=false)=>{
  if(loader) loading.value=true
 
  
  const userId = tokenService.getUser()?._id
  ApiClient.get('event/my',{userId:userId,...filters,isPublished:true}).then(res=>{
    if(res.data){
      data.value=res.data
    }
    loading.value=false
  })
}
getData(true)

</script>

