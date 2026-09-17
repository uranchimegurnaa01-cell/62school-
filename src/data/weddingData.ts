import { StorySlide, ScheduleItem, WeddingRequestItem, GuestWish } from '../types';

export const WEDDING_DATA = {
  groom: '50 жил',
  bride: '',
  weddingDate: '2026-10-07T17:00:00',
  formattedDate: '2026 . 10 . 07',
  formattedTime: '17:00',
  venueName: 'The Corporate',
  locationCity: 'Улаанбаатар хот, Монгол',
  venueAddress: 'Хан-Уул дүүрэг, 15-р хороо,The Corporate',
  googleMapsUrl: 'Mahatma Gandhi street-39, Khan-Uul district 15th khoroo, Ulaanbaatar, Mongolia, 17013',
  contactPhoneGroom: '+976 90059016',
  contactPhoneBride: '+976 88056804',

  // Google Sheets Webhook URL for RSVP synchronization
  // If provided, all RSVPs will automatically be sent to your Google Sheet!
  googleSheetsWebhookUrl: '',

  // Cover & Invitation poem from video
  invitationPoem: [
    'Мэдлэгийн их далайд хөлөг онгоц шиг аялж,',
    'Мөрөөдлийн цэнхэр алсад далавч дэлгэн нисэхэд',
    'Эрдмийн түлхүүр атгуулсан ачтай сайхан сургууль минь,',
    'Эх дэлхийд намайг хүн болгосон өргөө минь',
    '',
    'Энэхүү мөчийг',
    'Эрхэм таньтай хамт хуваалцахыг урьж',
    'байна.'
  ],

  // Story Slides
  storySlides: [
    {
      id: '1',
      date: '1975.09.01',
      title: 'Бидний анхны сургалтын үйл ажиллагаа',
      description: 'Анхны сургуулийн нээлтээс хойш 50 жил өнгөрчээ...',
      image: 'https://lh3.googleusercontent.com/d/1RZHn7xeFu45OOl7AZcExcmFoXtXmo3_I',
    },
    {
      id: '2',
      date: '1985.09.01',
      title: 'Амжилт бүтээл арвин',
      description: 'Хамтдаа хөгжсөн туршлага бүхэн арвин.',
      image: 'https://lh3.googleusercontent.com/d/1kfaCAXdMygKexfjt1S27Q7_rWgF9Iwva',
    },
    {
      id: '3',
      date: '1995.09.01',
      title: 'Бидний амжилт бүтээл',
      description: 'Бидний хөгжлийн түүчээ болсон сурагчид.',
      image: 'https://lh3.googleusercontent.com/d/1vFUuilV4S82nJ4cGg9A8MPy6Q-2oHrnk',
    },
    {
      id: '4',
      date: '2005.09.01',
      title: 'Бидний сургууль',
      description: '"Бидний сургууль" - "Бидний түүх"',
      image: 'https://lh3.googleusercontent.com/d/1evosK0Sn83g1I5gHa37R-aMjVE5glczL',
    },
    {
      id: '5',
      date: '2015.09.01',
      title: 'Бидний сургалт',
      description: 'Ээлтэй сургууль ирээдүй гэрэл гэгээ...',
      image: 'https://lh3.googleusercontent.com/d/16558bT2lC-c16CtShbLfhEgOgHIwprao',
    }
  ] as StorySlide[],

  // Schedule Timeline for 50th Anniversary
  schedule: [
    {
      id: '1',
      time: '17:00',
      title: 'Зочид хүлээн авах',
      subtitle: 'Эрхэм багш нар, төгсөгчдийг угтан авах'
    },
    {
      id: '2',
      time: '18:00',
      title: 'Дурсгалын зураг татуулах',
      subtitle: 'Түүхт 50 жилийн хүндэтгэлийн зураг авалт'
    },
    {
      id: '3',
      time: '19:00',
      title: 'Ойн баярын нээлтийн ёслол',
      subtitle: 'Төрийн дуулал, туг залах, хүндэтгэлийн нээлт'
    },
    {
      id: '4',
      time: '20:00',
      title: 'Хүндэтгэлийн концерт & Шагнал гардуулах',
      subtitle: 'Сургуулийн бахархалт багш, төгсөгчдийг шагнах'
    },
    {
      id: '5',
      time: '21:00',
      title: 'Үе үеийн төгсөгчдийн уулзалт',
      subtitle: 'Дурсамж дэлгэх чөлөөт уулзалт'
    },
    {
      id: '6',
      time: '22:00',
      title: 'Ойн баярын бялууны ёслол',
      subtitle: '50 жилийн хүндэтгэлийн ёслол'
    }
  ] as ScheduleItem[],

  // Anniversary Requests / Guidelines
  requests: [
    {
      id: 'dress',
      title: 'Дресс код',
      detail: 'Баярын / Албан',
      iconName: 'shirt'
    },
    {
      id: 'flower',
      title: 'Цэцэг',
      detail: 'Талархлын цэцэг',
      iconName: 'flower'
    },
    {
      id: 'child',
      title: 'Төгсөгчид',
      detail: 'Үе үеийнхэн',
      iconName: 'baby'
    },
    {
      id: 'gift',
      title: 'Дурсамж',
      detail: 'Сэтгэгдэл & зураг',
      iconName: 'gift'
    }
  ] as WeddingRequestItem[],

  guidelineCards: [
    {
      title: 'Хүндэтгэлийн хүлээн авалт',
      text: 'Ойн баярын нээлтийн үйл ажиллагаа эхлэхээс өмнө ирж, анги хамт олон, багш нартайгаа дурсгалын зураг татуулахыг урьж байна'
    },
    {
      title: 'Цаг баримтлах',
      text: 'Баярын ёслол эхлэхээс 30 минутын өмнө хүрэлцэн ирж суудлаа эзэлнэ үү'
    }
  ],

  // Initial wishes
  initialWishes: [] as GuestWish[]
};
