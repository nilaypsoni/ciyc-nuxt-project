<template>
<!--  <div class="flex items-center h-[626px] bg-[url('@/assets/japan/japanBG.png')] bg-contain bg-center bg-no-repeat">-->
<!--    <div class="text-[#FFFFFF] mobile:mx-14 mobileS:mx-7">-->
<!--      <h1 class="font-bold tabletS:text-6xl mobile:text-5xl mobileS:text-4xl leading-[75px]">Japan</h1>-->
<!--      <p class="font-semibold mt-2 tabletS:text-2xl mobile:text-[22px] mobileS:text-xl leading-9">Land of the Rising Sun</p>-->
<!--    </div>-->
<!--  </div>-->
  <div class="h-full">
    <div class="h-full relative">
      <hero-slider-content
          :button-click-handler="()=>{}"
          title="Japan"
          :image-source="japanBG"
      />
    </div>
  </div>
  <div class="grid grid-cols-2 gap-10 bg-[#E5E5E5] px-container pt-10 pb-5">
<!--    <div class="flex tablet:flex-row mobileS:flex-col laptop:max-w-[1320px] tablet:max-w-[930px] min-w-min my-3.5 mx-5 gap-3">-->
<!--      -->
<!--    </div>-->
    <div class="laptop:max-w-[650px] tablet:max-w-[450px] min-w-min mobileS:max-w-[950px]">
      <h2 class="text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Geography & Demographics</h2>
      <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">Japan is an archipelago, or string of islands, on the eastern edge of Asia. There are four main islands: Hokkaido, Honshu, Shikoku, and Kyushu. There are also nearly 4,000 smaller islands! Japan's nearest mainland neighbors are the Siberian region of Russia in the north and Korea and China farther south. Tokyo, which is the biggest city in Japan with over 13 million inhabitants. 126.5 million people live in Japan. A majority of the inhabitants are Buddhists or Shintoists.</p>
    </div>
    <div class="laptop:max-w-[650px] tablet:max-w-[450px] min-w-min mobileS:max-w-[950px]">
      <h2 class="text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Customs & Traditions</h2>
      <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">In Japan, people greet by bowing to one another. A bow can range from a small nod of the head to a deep bend at the waist. Gift giving is a conventional part of Japanese culture. Different types of gifts are given on depending on the occasion. How the present is wrapped is essential. The most important table etiquette in Japan is saying customary phrases before and after a meal. It is traditional for Japanese people to say "itadaki-masu" (meaning “I humbly receive” or “let’s eat”) before a meal and "gochisou-sama" after a meal. Shoes are never worn in someone's home or on Japanese tatami flooring (mats).</p>
    </div>
<!--    <div class="flex tablet:flex-row mobileS:flex-col laptop:max-w-[1320px] tablet:max-w-[930px] min-w-min my-3.5 mx-5 gap-3">-->
<!--     -->
<!--    </div>-->
    <div class="laptop:max-w-[650px] tablet:max-w-[450px] min-w-min mobileS:max-w-[950px]">
      <h2 class="size-3 text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Art & Popular Culture</h2>
      <p class="size-4 text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">The arts are an important part of Japanese life. A number of schools and colleges offer students training and preparation for careers in performance and art. The Ministry of Education is protective of Japan’s great works of art which include paintings, sculptures and architecture. Traditional arts and crafts such as the tea ceremony, flower arranging and dance that express Japan’s cultural heritage are greatly valued and designated as ‘living national treasures’. Japan’s history has been defined too by its literature and poetry. The ‘Tale of the Genji’ for instance, is a great classic work written by a noblewoman, Murasaki Shikibu at the beginning of the 11th Century. Comic books and animation are a popular form of art which has reached an international audience.</p>
    </div>
    <div class="laptop:max-w-[650px] tablet:max-w-[450px] min-w-min mobileS:max-w-[950px]">
      <h2 class="text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Food</h2>
      <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">Whilst Japan has its own identity of traditional cuisine there are early influences from Korea, China and South East Asia. White rice is a staple element of almost all meals and other ingredients include soy products, grilled or raw fish, thinly sliced stir-fried pork with bean sprouts and vegetables. Miso soup is a popular dish made from miso paste (fermented soya beans and barley) and containing various accoutrements such as tofu and/or vegetables. Sushi is also a popular Japanese meal which involves vinegared rice with seafood, raw fish or vegetables. A typical Japanese meal usually involves a number of dishes on the table rather than a main course.</p>
    </div>
  </div>
  <div class="flex items-center justify-center pt-3.5 px-container bg-[#F6F5F0]">
    <div class="laptop:w-[1320px] tablet:w-[930px] mobileS:w-full my-3.5">
      <div class="mb-5">
        <h2 class="text-[#456A87] font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Photos</h2></div>
      <div class="flex tablet:flex-row mobileS:flex-col !flex-row items-center justify-between gap-3 mt-1">
        <div class="mobile:w-[426px] mobileS:w-[280px] h-56"><img class="mobile:w-[426px] mobileS:w-[280px] h-56" src="@/assets/japan/photo1.png"/></div>
        <div class="mobile:w-[426px] mobileS:w-[280px] h-56"><img class="mobile:w-[426px] mobileS:w-[280px] h-56" src="@/assets/japan/photo2.png"/></div>
        <div class="mobile:w-[426px] mobileS:w-[280px] h-56"><img class="mobile:w-[426px] mobileS:w-[280px] h-56" src="@/assets/japan/photo3.png"/></div>
      </div>
    </div>
  </div>
<!--  <div class="flex items-center justify-center pt-3.5 pb-7 bg-[#F6F5F0]">-->
<!--    <div class="laptop:w-[1320px] tablet:w-[930px] mobileS:w-full my-3.5 mx-5">-->
<!--      <div class="mb-5"><h2 class="text-[#456A87] font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Organizers</h2></div>-->
<!--      <div class="flex tablet:flex-row mobileS:flex-col mobileS:items-center tablet:items-start mobileS:justify-center tablet:justify-start gap-3 mt-1">-->
<!--        <div class="mobile:w-[315px] mobileS:w-[280px] rounded-md bg-[#F4F1DE] shadow-3xl">-->
<!--          <div class="flex items-center justify-center h-[105px] bg-[#FFFFFF] rounded-t-md"><img src="@/assets/japan/center.png"/></div>-->
<!--          <div class="py-3 px-2.5">-->
<!--            <p class="text-[#353535] mb-1 font-semibold tabletS:text-lg mobile:text-base mobileS:text-sm leading-6">Japanese Culture Center</p>-->
<!--            <p class="text-[#E07A5F] font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs leading-5">See all events ></p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mobile:w-[315px] mobileS:w-[280px] rounded-md bg-[#F4F1DE] shadow-3xl">-->
<!--          <div class="flex items-center justify-center h-[105px] bg-[#FFFFFF] rounded-t-md"><img src="@/assets/japan/food.png"/></div>-->
<!--          <div class="py-3 px-2.5">-->
<!--            <p class="text-[#353535] mb-1 font-semibold tabletS:text-lg mobile:text-base mobileS:text-sm leading-6">Japanese Food Culture Association</p>-->
<!--            <p class="text-[#E07A5F] font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs leading-5">See all events ></p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mobile:w-[315px] mobileS:w-[280px] rounded-md bg-[#F4F1DE] shadow-3xl">-->
<!--          <div class="flex items-center justify-center h-[105px] bg-[#FFFFFF] rounded-t-md"><img src="@/assets/japan/travel.png"/></div>-->
<!--          <div class="py-3 px-2.5">-->
<!--            <p class="text-[#353535] mb-1 font-semibold tabletS:text-lg mobile:text-base mobileS:text-sm leading-6">Travel Japan</p>-->
<!--            <p class="text-[#E07A5F] font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs leading-5">See all events ></p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mobile:w-[315px] mobileS:w-[280px] rounded-md bg-[#F4F1DE] shadow-3xl">-->
<!--          <div class="flex items-center justify-center h-[105px] bg-[#FFFFFF] rounded-t-md"><img src="@/assets/japan/taste.png"/></div>-->
<!--          <div class="py-3 px-2.5">-->
<!--            <p class="text-[#353535] mb-1 font-semibold tabletS:text-lg mobile:text-base mobileS:text-sm leading-6">Taste of Japan</p>-->
<!--            <p class="text-[#E07A5F] font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs leading-5">See all events ></p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="flex items-center justify-center pt-1 bg-[#E5E5E5]">-->
<!--    <div class="laptop:w-[1320px] tablet:w-[930px] my-3.5 mx-5">-->
<!--      <div class="flex items-center justify-center flex-col mb-7">-->
<!--        <div><h2 class="text-[#456A87] mb-2 font-semibold tabletS:text-4xl mobile:text-3xl mobileS:text-[28px] leading-[49px]">Events Near You</h2></div>-->
<!--        <div class="h-1.5 w-[125px] bg-[#F2CC8F]"></div>-->
<!--      </div>-->
<!--      <div class="flex tablet:flex-row mobileS:flex-col mb-12 gap-3">-->
<!--        <div class="mobile:w-[427px] mobileS:w-[280px]">-->
<!--          <div class="h-80 bg-[url('@/assets/japan/Picture1.png')] bg-[cover] bg-no-repeat pt-2.5">-->
<!--            <div class="flex items-center justify-center w-[91px] ml-auto py-1.5 px-4 text-[#111111] bg-[#FFFFFF] mr-2.5 rounded-[100px]"><p class="font-normal mobile:text-[13px] mobileS:text-xs">Japanese</p></div>-->
<!--          </div>-->
<!--          <div class="bg-[#F8F8F5] p-2.5 shadow-3xl">-->
<!--            <p class="font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs mb-2.5 text-[#5C5C5C]">Sat, March 21, 2021  |  10:00 AM PST</p>-->
<!--            <p class="font-semibold tabletS:text-2xl mobile:text-[22px] mobileS:text-xl leading-8 text-[#111111] mb-10">Ramen Festival: Slurp Your Way Through a Japanese Cuisine</p>-->
<!--            <p class="font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs mb-2.5 text-[#5C5C5C]">Japantown | San Francisco, CA</p>-->
<!--            <p class="font-semibold text-[#E07A5F] tabletS:text-sm mobile:text-[13px] mobileS:text-xs">Free</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mobile:w-[427px] mobileS:w-[280px]">-->
<!--          <div class="h-80 bg-[url('@/assets/japan/Picture2.png')] bg-[cover] bg-no-repeat pt-2.5">-->
<!--            <div class="flex items-center justify-center w-[91px] ml-auto py-1.5 px-4 text-[#111111] bg-[#FFFFFF] mr-2.5 rounded-[100px]"><p class="font-normal mobile:text-[13px] mobileS:text-xs">Japanese</p></div>-->
<!--          </div>-->
<!--          <div class="bg-[#F8F8F5] p-2.5 shadow-3xl">-->
<!--            <p class="font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs mb-2.5 text-[#5C5C5C]">Sat, April 12, 2021  |  11:00 AM PST</p>-->
<!--            <p class="font-semibold tabletS:text-2xl mobile:text-[22px] mobileS:text-xl leading-8 text-[#111111] mb-10">Cherry Blossom Festival: Experience Japanese Springtime</p>-->
<!--            <p class="font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs mb-2.5 text-[#5C5C5C]">Japantown | San Francisco, CA</p>-->
<!--            <p class="font-semibold text-[#E07A5F] tabletS:text-sm mobile:text-[13px] mobileS:text-xs">From $5.00</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mobile:w-[427px] mobileS:w-[280px]">-->
<!--          <div class="h-80 bg-[url('@/assets/japan/Picture3.png')] bg-[cover] bg-no-repeat pt-2.5">-->
<!--            <div class="flex items-center justify-center w-[91px] ml-auto py-1.5 px-4 text-[#111111] bg-[#FFFFFF] mr-2.5 rounded-[100px]"><p class="font-normal mobile:text-[13px] mobileS:text-xs">Japanese</p></div>-->
<!--          </div>-->
<!--          <div class="bg-[#F8F8F5] p-2.5 shadow-3xl">-->
<!--            <p class="font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs mb-2.5 text-[#5C5C5C]">Fri, Aug 21, 2021  |  3:00 PM PST</p>-->
<!--            <p class="font-semibold tabletS:text-2xl mobile:text-[22px] mobileS:text-xl leading-8 text-[#111111] mb-10">Sumo Wrestling: Blood, Sweat, & Tears - A Warriors Game</p>-->
<!--            <p class="font-normal tabletS:text-sm mobile:text-[13px] mobileS:text-xs mb-2.5 text-[#5C5C5C]">Bill Graham Civic Auditorium | San Francisco, CA</p>-->
<!--            <p class="font-semibold text-[#E07A5F] tabletS:text-sm mobile:text-[13px] mobileS:text-xs">From $20.00</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import HeroSliderContent from "@/components/presentational/home/hero-slider-content";
import japanBG from "@/assets/japan/japanBG.png"


</script>

<style scoped>

</style>
