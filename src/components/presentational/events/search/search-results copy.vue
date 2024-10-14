
<template>
  <div class="rightEvents rightEvents-list">
    <div class="mt-3 mb-3 listing w-full">
        <ul style="width: 100%" class="custom-ul flex">
          
          <li v-bind:class="organizationProfileType == 'events' || organizationProfileType == '' ? 'active' : '' " @click="changeOrganizationProfileType('events')">
            <label style="width: 90%">Events</label>
          </li>

          <li v-bind:class="organizationProfileType == item  ? 'active' : '' " v-for="item of businessTypes" @click="changeOrganizationProfileType(item)">
            <label style="width: 90%">{{ item }}</label>
          </li>

          <!-- <li  v-bind:class="organizationProfileType == 2  ? 'active' : '' " @click="changeOrganizationProfileType(2)">
            <label style="width: 90%">Museum</label>
            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px" viewBox="0 0 50 60" >
            
             
              <path d="m 30.300505,14.494251 8.99625,5.19375 -17.9925,0 8.99625,-5.19375 z m 16.71625,5.19375 -16.71625,-9.65 -16.71625,9.65 -3.8700003,0 0,3.85875 41.1712503,0 0,-3.85875 -3.86875,0" style="fill-opacity:1;fill-rule:nonzero;stroke:none"/>
              <path d="m 17.803004,28.093001 c 0,-0.0125 -0.0025,-0.02875 -0.0025,-0.04375 0,-0.71125 0.57625,-1.28625 1.285,-1.28625 l 0.27875,0 0,-1.93 -7.075,0 0,1.93 0.2775,0 c 0.70875,0 1.28625,0.575 1.28625,1.28625 0,0.015 -0.0013,0.03125 -0.0013,0.04375 l -0.5725,16.36125 -1.3125,0 0,2.25125 7.72,0 0,-2.25125 -1.3125,0 -0.57125,-16.36125" style="fill-opacity:1;fill-rule:nonzero;stroke:none"/>
              <path d="m 27.451754,28.093001 c 0,-0.0125 -0.0013,-0.02875 -0.0013,-0.04375 0,-0.71125 0.575,-1.28625 1.28625,-1.28625 l 0.27625,0 0,-1.93 -7.07625,0 0,1.93 0.2775,0 c 0.71,0 1.2875,0.575 1.2875,1.28625 0,0.015 -0.0012,0.03125 -0.0037,0.04375 l -0.57125,16.36125 -1.31,0 0,2.25125 7.71875,0 0,-2.25125 -1.3125,0 -0.57125,-16.36125" style="fill-opacity:1;fill-rule:nonzero;stroke:none"/>
              <path d="m 37.101755,28.093001 c -0.0012,-0.0125 -0.0037,-0.02875 -0.0037,-0.04375 0,-0.71125 0.57875,-1.28625 1.2875,-1.28625 l 0.27875,0 0,-1.93 -7.07625,0 0,1.93 0.275,0 c 0.7125,0 1.2875,0.575 1.2875,1.28625 0,0.015 -0.0025,0.03125 -0.0025,0.04375 l -0.57,16.36125 -1.3125,0 0,2.25125 7.71875,0 0,-2.25125 -1.3125,0 -0.57,-16.36125" style="fill-opacity:1;fill-rule:nonzero;stroke:none"/>
              <path d="m 47.321756,44.454252 -0.57125,-16.36125 c -0.0012,-0.0125 -0.0025,-0.02875 -0.0025,-0.04375 0,-0.71125 0.57625,-1.28625 1.28625,-1.28625 l 0.2775,0 0,-1.93 -7.07625,0 0,1.93 0.27875,0 c 0.71,0 1.285,0.575 1.285,1.28625 0,0.015 -0.0012,0.03125 -0.0012,0.04375 l -0.5725,16.36125 -1.31125,0 0,2.25125 7.72,0 0,-2.25125 -1.3125,0" style="fill-opacity:1;fill-rule:nonzero;stroke:none"/>
              <path d="m 9.714253,47.991753 0,1.92875 41.171253,0 0,-1.92875 -41.171253,0 z" style="fill-opacity:1;fill-rule:nonzero;stroke:none"/>
            </svg>
           
          </li>

          <li v-bind:class="organizationProfileType == 3  ? 'active' : '' "  @click="changeOrganizationProfileType(3)">
            <label style="width: 90%">Hotel</label>
            
            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px" viewBox="0 0 24 24">
              <path
                d="M14.798 5.141L17.47 2.47l1.06 1.06-2.671 2.672c-.679.679-1.055 1.462-1.12 2.199-.043.5.054 1.003.327 1.472L19.97 4.97l1.06 1.06-4.906 4.906c.473.281.974.387 1.466.354.718-.047 1.467-.394 2.096-1.023A905.812 905.812 0 0022.24 7.7l.226-.228 1.067 1.055-.228.23a1012.001 1012.001 0 01-2.559 2.57c-.849.849-1.927 1.384-3.057 1.459a4.027 4.027 0 01-2.647-.768l-1.231 1.231 7.72 7.72-1.061 1.06-5.97-5.97-3 3-1.75-1.75-4.72 4.72-1.06-1.06 4.72-4.72-4.392-4.391a4.75 4.75 0 010-6.718L5 4.44l7.75 7.75 1.232-1.232a3.971 3.971 0 01-.737-2.686c.1-1.147.67-2.246 1.553-3.13zM13.439 15L5.028 6.588a3.25 3.25 0 00.33 4.21L11.5 16.94 13.44 15z"
                clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
          </li>

          <li v-bind:class="organizationProfileType == 4  ? 'active' : '' "  @click="changeOrganizationProfileType(4)">
            <label style="width: 90%">Restaurant</label>
            
            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px" viewBox="0 0 24 24">
              <path
                d="M14.798 5.141L17.47 2.47l1.06 1.06-2.671 2.672c-.679.679-1.055 1.462-1.12 2.199-.043.5.054 1.003.327 1.472L19.97 4.97l1.06 1.06-4.906 4.906c.473.281.974.387 1.466.354.718-.047 1.467-.394 2.096-1.023A905.812 905.812 0 0022.24 7.7l.226-.228 1.067 1.055-.228.23a1012.001 1012.001 0 01-2.559 2.57c-.849.849-1.927 1.384-3.057 1.459a4.027 4.027 0 01-2.647-.768l-1.231 1.231 7.72 7.72-1.061 1.06-5.97-5.97-3 3-1.75-1.75-4.72 4.72-1.06-1.06 4.72-4.72-4.392-4.391a4.75 4.75 0 010-6.718L5 4.44l7.75 7.75 1.232-1.232a3.971 3.971 0 01-.737-2.686c.1-1.147.67-2.246 1.553-3.13zM13.439 15L5.028 6.588a3.25 3.25 0 00.33 4.21L11.5 16.94 13.44 15z"
                clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
          </li>

          <li v-bind:class="organizationProfileType == 5  ? 'active' : '' " @click="changeOrganizationProfileType(5)">
            <label style="width: 90%">Shop/Vendor</label>
            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px"  viewBox="0 0 64 64" >
              <g>
                <path  d="M59,0H5C2.789,0,1,1.789,1,4v20c0,2.22,1.208,4.152,3,5.19V60c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4   V29.19c1.792-1.038,3-2.971,3-5.19V4C63,1.789,61.211,0,59,0z M51,2v22c0,2.209-1.791,4-4,4s-4-1.791-4-4V2H51z M41,2v22   c0,2.209-1.791,4-4,4s-4-1.791-4-4V2H41z M31,2v22c0,2.209-1.791,4-4,4s-4-1.791-4-4V2H31z M21,2v22c0,2.209-1.791,4-4,4   s-4-1.791-4-4V2H21z M3,4c0-1.104,0.896-2,2-2h6v22c0,2.209-1.791,4-4,4s-4-1.791-4-4V4z M12,62V38h12v10h-1c-0.553,0-1,0.447-1,1   s0.447,1,1,1h1v12H12z M58,60c0,1.104-0.896,2-2,2H26V37c0-0.516-0.447-1-1-1H11c-0.553,0-1,0.447-1,1v25H8c-1.104,0-2-0.896-2-2   V29.91C6.326,29.965,6.658,30,7,30c2.088,0,3.926-1.068,5-2.687C13.074,28.932,14.912,30,17,30s3.926-1.068,5-2.687   C23.074,28.932,24.912,30,27,30s3.926-1.068,5-2.687C33.074,28.932,34.912,30,37,30s3.926-1.068,5-2.687   C43.074,28.932,44.912,30,47,30s3.926-1.068,5-2.687C53.074,28.932,54.912,30,57,30c0.342,0,0.674-0.035,1-0.09V60z M57,28   c-2.209,0-4-1.791-4-4V2h6c1.104,0,2,0.896,2,2v20C61,26.209,59.209,28,57,28z"/>
                <path  d="M53,36H29c-0.553,0-1,0.447-1,1v20c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1V37   C54,36.447,53.553,36,53,36z M52,56H30V38h22V56z"/>
                <path  d="M48.293,42.707C48.488,42.902,48.744,43,49,43s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414   l-1-1c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L48.293,42.707z"/>
                <path  d="M48.293,47.707C48.488,47.902,48.744,48,49,48s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414   l-6-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L48.293,47.707z"/>
              </g>
            </svg>
           
          </li>

          <li v-bind:class="organizationProfileType == 6  ? 'active' : '' " @click="changeOrganizationProfileType(6)">
            <label style="width: 90%">Wellness/Yoga</label>
            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px"  viewBox="0 0 31.262 31.262" >
              <g>
                <g>
                  <path d="M15.284,5.535c0-1.727,0.347-3.126,0.347-3.126s0.347,1.399,0.347,3.126c0,0.366-0.018,0.712-0.043,1.038    c0.476-0.548,1.344-1.735,1.344-3.122C17.279,1.545,15.631,0,15.631,0s-1.647,1.545-1.647,3.451c0,1.386,0.868,2.573,1.342,3.122    C15.302,6.247,15.284,5.901,15.284,5.535z"/>
                  <path d="M15.979,25.727c0,1.728-0.347,3.127-0.347,3.127s-0.347-1.399-0.347-3.127c0-0.365,0.017-0.712,0.042-1.037    c-0.475,0.547-1.342,1.734-1.342,3.121c0,1.906,1.647,3.451,1.647,3.451s1.648-1.545,1.648-3.451c0-1.386-0.869-2.572-1.344-3.121    C15.961,25.015,15.979,25.361,15.979,25.727z"/>
                  <path d="M10.935,7.883c-0.116-0.171-0.235-0.355-0.352-0.557c-0.547-0.947-0.799-1.824-0.799-1.824s0.633,0.658,1.181,1.604    c0.115,0.201,0.215,0.396,0.305,0.583c0.087-0.452,0.187-1.378-0.251-2.138c-0.605-1.046-1.998-1.372-1.998-1.372    s-0.415,1.37,0.188,2.415C9.648,7.356,10.501,7.732,10.935,7.883z"/>
                  <path d="M20.328,23.38c0.117,0.171,0.234,0.354,0.352,0.558c0.547,0.946,0.801,1.823,0.801,1.823s-0.637-0.657-1.182-1.604    c-0.117-0.201-0.217-0.396-0.307-0.584c-0.086,0.453-0.186,1.379,0.254,2.138c0.604,1.046,1.998,1.372,1.998,1.372    s0.414-1.37-0.191-2.415C21.613,23.906,20.762,23.529,20.328,23.38z"/>
                  <path d="M6.572,15.438c-0.348-0.301-1.101-0.85-1.978-0.851c-1.208,0-2.187,1.043-2.187,1.043s0.979,1.044,2.186,1.044    c0.879,0,1.631-0.549,1.979-0.85c-0.207,0.015-0.426,0.025-0.658,0.025c-1.094,0-1.98-0.22-1.98-0.22s0.887-0.22,1.98-0.22    C6.147,15.411,6.365,15.422,6.572,15.438z"/>
                  <path d="M24.689,15.824c0.348,0.301,1.1,0.85,1.977,0.85c1.209,0,2.188-1.043,2.188-1.043s-0.979-1.043-2.188-1.043    c-0.877,0-1.629,0.549-1.977,0.85c0.207-0.016,0.426-0.025,0.656-0.025c1.096,0,1.982,0.22,1.982,0.22s-0.887,0.222-1.982,0.22    C25.115,15.851,24.896,15.84,24.689,15.824z"/>
                  <path d="M10.963,24.154c-0.546,0.946-1.181,1.604-1.181,1.604s0.253-0.877,0.799-1.825c0.118-0.2,0.237-0.385,0.354-0.556    c-0.435,0.15-1.287,0.527-1.727,1.288c-0.604,1.046-0.19,2.415-0.19,2.415s1.394-0.326,1.998-1.37    c0.439-0.761,0.339-1.688,0.253-2.14C11.18,23.758,11.08,23.953,10.963,24.154z"/>
                  <path d="M20.299,7.107c0.547-0.947,1.182-1.606,1.182-1.606S21.229,6.38,20.68,7.327c-0.113,0.201-0.234,0.385-0.352,0.556    c0.436-0.15,1.287-0.527,1.725-1.287c0.605-1.045,0.191-2.416,0.191-2.416s-1.395,0.327-1.998,1.372    c-0.439,0.761-0.34,1.686-0.252,2.138C20.084,7.502,20.184,7.307,20.299,7.107z"/>
                  <path d="M5.905,8.114C4.256,7.161,2.093,7.815,2.093,7.815s0.515,2.2,2.165,3.153c1.202,0.693,2.663,0.535,3.375,0.398    c-0.295-0.142-0.604-0.3-0.92-0.482C5.217,10.02,4.179,9.02,4.179,9.02s1.386,0.399,2.881,1.263    c0.316,0.183,0.607,0.372,0.877,0.556C7.701,10.152,7.108,8.807,5.905,8.114z"/>
                  <path d="M27.004,20.295c-1.203-0.693-2.662-0.536-3.375-0.398c0.293,0.143,0.604,0.299,0.918,0.482    c1.496,0.863,2.535,1.863,2.535,1.863s-1.385-0.398-2.881-1.262c-0.316-0.183-0.607-0.371-0.877-0.556    c0.236,0.687,0.832,2.03,2.033,2.724c1.65,0.952,3.811,0.299,3.811,0.299S28.652,21.247,27.004,20.295z"/>
                  <path d="M4.179,22.242c0,0,1.039-1.002,2.534-1.865c0.317-0.182,0.625-0.339,0.921-0.482c-0.712-0.137-2.175-0.295-3.375,0.399    c-1.651,0.952-2.166,3.151-2.166,3.151s2.162,0.653,3.812-0.299c1.202-0.693,1.796-2.039,2.033-2.724    c-0.271,0.185-0.561,0.372-0.876,0.556C5.565,21.842,4.179,22.242,4.179,22.242z"/>
                  <path d="M27.082,9.019c0,0-1.039,1-2.533,1.864c-0.316,0.183-0.625,0.341-0.92,0.482c0.713,0.138,2.174,0.295,3.373-0.398    c1.652-0.954,2.166-3.152,2.166-3.152s-2.16-0.653-3.811,0.299c-1.203,0.694-1.795,2.038-2.033,2.723    c0.27-0.183,0.561-0.372,0.877-0.554C25.697,9.419,27.082,9.019,27.082,9.019z"/>
                  <path d="M15.631,14.893c0,0-4.119-3.736-6.75-3.409c5.057,2.655,6.75,12.456,6.75,12.456s0.497-8.806,6.75-12.456    C19.039,10.873,15.631,14.893,15.631,14.893z"/>
                  <circle cx="15.631" cy="11.421" r="1.693"/>
                </g>
              </g>
            </svg>
            
          </li>

          <li v-bind:class="organizationProfileType == 7  ? 'active' : '' " @click="changeOrganizationProfileType(7)">
            <label style="width: 90%">Business Service</label>

            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px" viewBox="0 0 1024 1024" >
              <path d="M749.7 548.7l-164.6 91.4V823l164.6 91.4L914.3 823V640.1l-164.6-91.4zM841.1 780l-91.4 50.8-91.4-50.8v-96.8l91.4-50.8 91.4 50.8V780z"/>
              <path d="M713.600831 737.455926a36.6 36.6 0 1 0 72.255718-11.719698 36.6 36.6 0 1 0-72.255718 11.719698Z" />
              <path d="M688.7 479.8c-12.7-6.2-25.7-11.8-38.9-16.6 49.8-40.3 81.6-101.8 81.6-170.6 0-121-98.4-219.4-219.4-219.4s-219.4 98.4-219.4 219.4c0 68.9 31.9 130.5 81.7 170.7-154.2 56.4-264.6 204.5-264.6 378h73.1c0-181.5 147.7-329.1 329.1-329.1 50.7 0 99.3 11.2 144.5 33.3l32.3-65.7zM512 146.3c80.7 0 146.3 65.6 146.3 146.3S592.7 438.9 512 438.9s-146.3-65.6-146.3-146.3S431.4 146.3 512 146.3z" />
            </svg>
            
          </li>

          <li v-bind:class="organizationProfileType == 8  ? 'active' : '' " @click="changeOrganizationProfileType(8)">
            <label style="width: 90%">Professional</label>
            <svg style="width: 10%" class="d Vb UmNoP" height="24px" width="24px"  viewBox="0 0 512 512" >

                    <g id="Layer_1"/>

                    <g id="Layer_2">

                    <g>

                    <path class="st0" d="M448.49,157.26H387.4V80.94c0-24.91-20.27-45.18-45.18-45.18H169.77c-24.91,0-45.18,20.27-45.18,45.18v76.32    H63.51c-19.85,0-36.01,16.15-36.01,36v246.97c0,19.85,16.15,36,36.01,36h384.99c19.85,0,36.01-16.15,36.01-36V193.27    C484.5,173.41,468.35,157.26,448.49,157.26z M156.6,80.94c0-7.27,5.91-13.18,13.18-13.18h172.46c7.27,0,13.18,5.91,13.18,13.18    v76.32H156.6V80.94z M63.51,189.26h77.09H371.4h77.09c2.21,0,4.01,1.8,4.01,4v85.01h-57.1h-59.92H176.51H116.6H59.5v-85.01    C59.5,191.06,61.3,189.26,63.51,189.26z M351.49,310.28h27.92v10.21c0,7.7-6.26,13.96-13.96,13.96s-13.96-6.26-13.96-13.96V310.28    z M132.6,310.28h27.92v10.21c0,7.7-6.26,13.96-13.96,13.96s-13.96-6.26-13.96-13.96V310.28z M448.49,444.24H63.51    c-2.21,0-4.01-1.8-4.01-4V310.28h41.1v10.21c0,25.34,20.62,45.96,45.96,45.96s45.96-20.62,45.96-45.96v-10.21h126.98v10.21    c0,25.34,20.62,45.96,45.96,45.96s45.96-20.62,45.96-45.96v-10.21h41.1v129.95C452.5,442.44,450.7,444.24,448.49,444.24z"/>

                    </g>

                    </g>
            </svg>
          </li> -->
        </ul>
    </div>
    <div class="flex items-center justify-between md__mobile:flex-col md__mobile:gap-2.5">
      <h3>Search Results</h3>

      <div class="flex items-center justify-between md__mobile:flex-col md__mobile:gap-2.5">
        <p class="location">
          {{ searchedAddress ? searchedAddress : latLngToAddress ? latLngToAddress : 'EveryWhere' }}
          <i class="fa fa-times crose text-icon__color m-1" v-if="latLngToAddress" v-on:click="clearaddress()"></i>
          <span class="location_icon">
            <svg class="svg-inline--fa fa-location-dot text-icon__color m-2.5" aria-hidden="true" focusable="false"
              data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512" data-v-7e4cf5ea="">
              <path class="" fill="currentColor"
                d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z">
              </path>
            </svg>
          </span>
        </p>
        <Button v-if="!isOrganizer" button-text="All" is-background-color
          :custom-classes="`border border-secondary__color rounded-r-none border-r-0
                                                                            ${activeEventsLocation === '' ? `bg-site__blue ` : `bg-transparent !text-secondary__color`}`"
          :click-handler="() => changeEventLocationFilter('')" />
        <Button v-if="!isOrganizer" button-text="Online" is-background-color
          :custom-classes="`border border-secondary__color rounded-none border-l-0
                                                                                                                        ${activeEventsLocation === '1' ? `bg-site__blue ` : `bg-transparent !text-secondary__color`}`"
          :click-handler="() => changeEventLocationFilter('1')" />
        <Button v-if="!isOrganizer" button-text="In-Person" is-background-color
          :custom-classes="`border border-secondary__color rounded-l-none border-l-0
                                                                                                                                                                ${activeEventsLocation === '2' ? `bg-site__blue ` : `bg-transparent !text-secondary__color`}`"
          :click-handler="() => changeEventLocationFilter('2')" />
      </div>
      
    </div>
    <div>
      <primary-loader :is-loading="isLoading" />
      <div class="mt-4 grid gap-3 mb-11 grid-cols-1" v-if="!isLoading && eventData?.length > 0">
        <live-events-card  :is-organizer="isOrganizer" :is-landscape="screenWidth > 600" v-for="(event, index) in eventData" :key="index"
          :event-data="event" />
      </div>
      <div class="mt-10" v-if="!isLoading && eventData?.length <= 0">
        <h2 v-if="isOrganizer" class="text-secondary__color font-semibold text-xl lg__mobile:text-xl text-center">Sorry, no {{ organizationProfileType.toLowerCase() }} found from
          your search criteria</h2>

        <h2 v-if="!isOrganizer" class="text-secondary__color font-semibold text-xl lg__mobile:text-xl text-center">Sorry, no event found from
          your search criteria, You can also explore below events</h2>

        <div  class="mt-4 grid gap-3 mb-11 grid-cols-1" v-if="!isOrganizer && prevData?.length > 0">
          <live-events-card  :is-landscape="screenWidth > 600" v-for="(event, index) in prevData" :key="index"
            :event-data="event" />
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import Button from "@/components/common/buttons/button";
import { reactive, ref, watch, watchEffect,onMounted } from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import LiveEventsCard from "@/components/common/card/live-events-card";
import ApiClient from "@/methods/apiclient";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import { useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";

const props = defineProps({
  isLoading: Boolean,
  eventData: Array,
  query: String,
  searchedAddress:String
})
const emit = defineEmits(['handle-event-category-filter','hande-is-organizer-profile'])
const screenWidth = screen.width
const prevData = ref('')

const organizationProfileType = ref('events');
const isOrganizer = ref(false)
const businessTypes = ref([]);

const changeOrganizationProfileType = async (e) => {
  
  organizationProfileType.value = e;

  if(organizationProfileType.value == 'events' || organizationProfileType.value == ''){
      isOrganizer.value = false
      
  }else{
    isOrganizer.value = true
  }

 
  emit('hande-is-organizer-profile', {isOrganizer:isOrganizer.value,organizationProfileType:organizationProfileType.value} )
  // getData({ page: 1 });
};

const getProfileTypeByType = (type) =>{
  
  var profileType = '';

  if(type == 1){
    profileType = 'Events';
  }else if(type == 2){
    profileType = 'Museum';

  }else if(type == 3){
    profileType = 'Hotel';

  }else if(type == 4){
    profileType = 'Restaurant';

  }else if(type == 5){
    profileType = 'Shop/Vendor';

  }else if(type == 6){
    profileType = 'Wellness/Yoga';

  }else if(type == 7){
    profileType = 'Business Service';

  }else if(type == 8){
    profileType = 'Professional';

  }

  return profileType;
}

const activeEventsLocation = ref('')
const changeEventLocationFilter = (activeTab) => {
  activeEventsLocation.value = activeTab
  emit('handle-event-category-filter', activeTab)
}





const allData = () => {
  const lng = localStorage.getItem('alng')
  const lat = localStorage.getItem('alat')
  let parms = {
    limit: 20,
    page: 1,
    all: true,
    dateFilter: 1,
    category: 1,
    searchQuery: '',
    is_event_not_found: true,
  }

  if (lat) {
    parms.latitude = lat
    parms.longitude = lng
  }
  ApiClient.get('event/browse', parms).then(res => {
    prevData.value = res.data
  })
}

const getBusinessType = () => {
  ApiClient.get('business-type/all', { page: 1, limit: 9999999, search: '' }).then(res => {
    let arr = res.data.map(itm => {
      return itm.businessType
    }).sort()

    businessTypes.value = arr.map(itm => {
      return itm.trim()
    })

    console.log('businessTypes',businessTypes)
  })
}



allData()
getBusinessType();

watch(() => props.eventData, () => {
  allData()
}, [])

const longitude = ref(0)
const latitude = ref(0)
const patchLatng = () => {
  latitude.value = Number(localStorage.getItem('alat') || 0)
  longitude.value = Number(localStorage.getItem('alng') || 0)
  console.log("latitude events", latitude.value);
  console.log("longitude events", longitude.value);
}
patchLatng()

const address = ref({ lat: 0, lng: 0 })

const latLngToAddress = ref('')
watchEffect(async () => {
  let addressData = await useReverseGeocoding(latitude.value, longitude.value)
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
})

const router = useRouter()





// let fieldValues = reactive({
//   events: ""
// })


const searchEvent = () => {
  let parms = {
    lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
    lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
    q: ''
  }
  if (!address?.value?.lat && latLngToAddress.value) return
  router.push({ name: ROUTES.SEARCH, query: parms })


}

const clearaddress = () => {

  latLngToAddress.value = ''
  // address.value = ''
  localStorage.setItem('alat', '')
  localStorage.setItem('alng', '')
  localStorage.setItem('aplace', '')
  // fieldValues.events=''
  searchEvent()
}

</script>

<style scoped>
h3 {
  font-size: 20px;
  font-weight: 600;
}

p.location {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}


/* 5Jul23 */
ul.custom-ul li {
  margin-right: 18px;
  background: transparent;
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;
  font-size: 15px;
  border: 1px solid;
  border-radius: 5px;
  color: black;
  font-weight: 500;
  display: flex;
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  cursor: pointer;
}

ul.custom-ul li:hover {
  background: #3b5998;
  color: white;
  cursor: pointer;
  fill: white;
}
ul.custom-ul li.active {
    background: #3b5998;
    color: white;
    cursor: pointer;
    fill: white;
}

ul.custom-ul li > * {
    cursor: pointer;
}
</style>