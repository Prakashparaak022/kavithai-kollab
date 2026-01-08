import { Poem } from "@/types/poem";

export const poems: Poem[] = [
  {
    id: 1,
    slug: "mazhai-varugai",
    title: "Mazhai varugai",
    content: "Mazhai vandhu en manadhai sutham seythathu",
    author: "@arunpoet",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1686388793418-d86246be4f97?fm=jpg&q=60&w=3000",
    likes: 12,
    comments: [
      {
        id: 101,
        name: "@user1",
        content:
          "Arputham! Indha varigal mazhaiyai vida adhigamaaga manadhai nanaiya vaithathu. Padiththa pin oru amaidhi thonriyathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        id: 102,
        name: "@poetrylover",
        content:
          "Sukhamana varigal! Ovvoru solum mazhai thuligal pola idhayathil vizhundhadhu.",
        imageUrl: "https://randomuser.me/api/portraits/women/21.jpg",
      },
    ],
    collaborations: [
      {
        id: 1001,
        author: "@kavithai_fan",
        content:
          "Andha mazhai thuligalil, en ninaivugalum serndhu nanainthana. Oru kaalam marandha unarvugal meendum uyir petra neram idhu. Mazhaiyin kulir, en nenjil urakkamaana kanavugalai ezhuppiyathu. Andha nodigalil, naan ennaiyum ennaalum marandhu mazhaiyudan serndhu nadandhen.",
        imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        id: 1002,
        author: "@rain_soul",
        content:
          "Mazhaiyin osai, manadhin amaidhiyai meendum ezhuthiyathu. Ullathil peyyum mazhai indha varigal.",
        imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
      },
      {
        id: 1003,
        author: "@silent_words",
        content:
          "Kanneerai pola mazhaiyum, oru naal manadhai kaathal seyyum. Indha kavithai adhai unarthugiradhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/13.jpg",
      },
    ],
  },

  {
    id: 2,
    slug: "paarvai-thuligal",
    title: "Paarvai thuligal",
    content:
      "Kannil vizhum thuligalukku, naangal marandha pandhangalai meendum suvaasikkirom.",
    author: "@kavivisionary",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhEjIIrQZbGWFeIz7p1i7augJ1YWZMTI9OlA&s",
    likes: 15,
    comments: [
      {
        id: 201,
        name: "@poetess",
        content:
          "Uyarntha kavithai! Paarvaiyin ganniyathai romba azhagaaga solliyirukkirirgal.",
        imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
      },
    ],
    collaborations: [
      {
        id: 2001,
        author: "@vizhi_kavignar",
        content:
          "Andha paarvaigal, sollaadha varigalaiyum kaattina. Oru nodiyil nooru unarvugal pirandhana.",
        imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
      },
      {
        id: 2002,
        author: "@unspoken_eyes",
        content:
          "Paarvaiyil thodangiya kadhai, manadhil mudindhathu. Vaartthaigal thevai illai endru unarthum kavithai.",
        imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
      },
      {
        id: 2003,
        author: "@thought_stream",
        content:
          "Oru nodi paarvai, vaazhnaal muzhuvadhum ninaivugalai serthathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/16.jpg",
      },
    ],
  },

  {
    id: 3,
    slug: "uyirin-osai",
    title: "Uyirin osai",
    content:
      "Uyirin osai, uyirin sevigalukkuk kaetthum, suvaasathai thirumbap perugiradhu.",
    author: "@soul_poet",
    imageUrl:
      "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg",
    likes: 10,
    comments: [
      {
        id: 301,
        name: "@soulsearcher",
        content:
          "Endrum unarchi mikunda kavithai. Padikkum podhu ullathil oru nadukkam undaagiyathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/19.jpg",
      },
    ],
    collaborations: [
      {
        id: 3001,
        author: "@inner_voice",
        content:
          "Andha osai, mounaththilum urakka kettadhu. Uyirin urai indha varigal.",
        imageUrl: "https://randomuser.me/api/portraits/men/17.jpg",
      },
      {
        id: 3002,
        author: "@breath_of_life",
        content:
          "Suvaasangalum kavithaiyaaga maarina neram. Vaazhkkaiyai pudhiya paarvaiyil kaattugiradhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
      },
      {
        id: 3003,
        author: "@echo_soul",
        content: "Uyirin osai, kaalam thaandi thodarndhu pesum oru paadal.",
        imageUrl: "https://randomuser.me/api/portraits/men/19.jpg",
      },
    ],
  },

  {
    id: 4,
    slug: "ezhudhaadha-navilgal",
    title: "Ezhudhaadha navilgal",
    content:
      "Ezhudhaadha kavithaigal, manadhin adipadaiyil pathindhu nirkkinrathu.",
    author: "@unwritten_poet",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661686853400-d21b77a61d7e?fm=jpg&q=60&w=3000",
    likes: 18,
    comments: [
      {
        id: 401,
        name: "@writer",
        content:
          "Manadhil eththanai ezhuththugal! Ezhudhaadha kavithaigal ellaarukkum undu.",
        imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ],
    collaborations: [
      {
        id: 4001,
        author: "@hidden_ink",
        content:
          "Ezhudhaadha varigal, en nenjil pala kaalam olindhu irundhana.",
        imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: 4002,
        author: "@thought_keeper",
        content: "Mounamum oru kavithai endru indru purindhadhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
      },
      {
        id: 4003,
        author: "@silent_pages",
        content: "Solladha varthaigalum, oru naal kavithaiyaaga pirakkum.",
        imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },

  {
    id: 5,
    slug: "irundhaal",
    title: "Irundhaal",
    content: "Irundhaal manadhil oru aasai, irundhaal manadhil oru varam.",
    author: "@mindful_poet",
    imageUrl:
      "https://img.freepik.com/free-vector/abstract-hand-drawn-woman-portrait_23-2148901737.jpg",
    likes: 14,
    comments: [
      {
        id: 501,
        name: "@heartfelt_poet",
        content:
          "Miga adhisaya kavithai. Nambikkaiyai migavum azhagaaga solliyirukkirirgal.",
        imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      },
      {
        id: 502,
        name: "@blissful_reader",
        content:
          "Anbu paadum varigal. Padiththavudan manam konjam lighter aayiduchu.",
        imageUrl: "https://randomuser.me/api/portraits/women/16.jpg",
      },
    ],
    collaborations: [
      {
        id: 5001,
        author: "@hope_writer",
        content: "Irundhaal endra sol, oru vaazhkkai paadhaiyai thirandhadhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: 5002,
        author: "@dream_lines",
        content: "Andha aasai, manadhin ullae oru velicham pola irundhathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/24.jpg",
      },
      {
        id: 5003,
        author: "@calm_mind",
        content: "Irundhaal mattum pothum, vaazhkkai oru varamaaga theriyum.",
        imageUrl: "https://randomuser.me/api/portraits/men/25.jpg",
      },
    ],
  },

  {
    id: 6,
    slug: "arpudham",
    title: "Arpudham",
    content: "Arpudham ennum azhagiya sol, azhagiya kaadhalin ezhuththugal.",
    author: "@dreamy_writer",
    imageUrl:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?fm=jpg&q=60&w=3000",
    likes: 17,
    comments: [
      {
        id: 601,
        name: "@love_poet",
        content: "Kaadhalai romba menmaiyaaga varnika seithirukkirirgal.",
        imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      },
    ],
    collaborations: [
      {
        id: 6001,
        author: "@magic_words",
        content:
          "Arpudham endra sol, ovvoru idhayaththilum veru artham perugiradhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/26.jpg",
      },
      {
        id: 6002,
        author: "@love_echo",
        content: "Kaadhalin ezhuththugal, kaalam thaandi pesum.",
        imageUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
      {
        id: 6003,
        author: "@star_gazer",
        content: "Oru sol mattum, nooru kanavugalai thodangiyathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/28.jpg",
      },
    ],
  },

  {
    id: 7,
    slug: "vannam-thunai",
    title: "Vannam Thunai",
    content: "Vannam thunaiyil, paavaiyin thunaiyil, kavithai thunaiyil.",
    author: "@silent_soul",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1670157709475-804e923487fb?fm=jpg&q=60&w=3000",
    likes: 20,
    comments: [
      {
        id: 701,
        name: "@poetrylover",
        content: "Thamizh mozhi azhagai migavum sirappaaga kaattugiradhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      },
    ],
    collaborations: [
      {
        id: 7001,
        author: "@color_thoughts",
        content: "Ovvoru vannamum, oru ninaivin thunaiyaaga irundhathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/29.jpg",
      },
      {
        id: 7002,
        author: "@art_soul",
        content: "Paavaiyin paarvaiyilum kavithai maraindhirundhadhu.",
        imageUrl: "https://randomuser.me/api/portraits/men/30.jpg",
      },
      {
        id: 7003,
        author: "@palette_poet",
        content: "Vannangal serndhaal, vaazhkkaiyum oru oviyam.",
        imageUrl: "https://randomuser.me/api/portraits/men/31.jpg",
      },
    ],
  },

  {
    id: 8,
    slug: "vizhiyin-ragasiyam",
    title: "Vizhiyin Ragasiyam",
    content: "Vizhiyin ragasiyam, kannai thavira, ennam thavira enna thunai.",
    author: "@heart_waves",
    imageUrl:
      "https://i.pinimg.com/736x/71/7d/86/717d86d6abd1a94118bc9d5ad2071995.jpg",
    likes: 13,
    comments: [
      {
        id: 801,
        name: "@soulful_reader",
        content:
          "Paarvaiyin arthaththai romba unarchiyudan ezhuthiyirukkirirgal.",
        imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ],
    collaborations: [
      {
        id: 8001,
        author: "@secret_eyes",
        content: "Andha vizhigal, sollaamal pala kadhai sonnathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
      },
      {
        id: 8002,
        author: "@deep_gaze",
        content: "Ragasiyangalum, paarvaiyil velippadum neram undu.",
        imageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
      },
      {
        id: 8003,
        author: "@silent_glance",
        content: "Oru nodi paarvai, vaazhnaal muluvadhum ninaivugal.",
        imageUrl: "https://randomuser.me/api/portraits/men/36.jpg",
      },
    ],
  },

  {
    id: 9,
    slug: "azhagiya-vaazhum",
    title: "Azhagiya Vaazhum",
    content:
      "Azhagiya vaazhum, adhisaya thunaiyil, manadhin vaazhum aasaigalil.",
    author: "@divine_poet",
    imageUrl:
      "https://images.unsplash.com/photo-1530103043960-ef38714abb15?fm=jpg&q=60&w=3000",
    likes: 19,
    comments: [
      {
        id: 901,
        name: "@deep_thinker",
        content:
          "Vaazhkkaiyin azhagai romba thelivaa sollugiradhu indha kavithai.",
        imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      },
    ],
    collaborations: [
      {
        id: 9001,
        author: "@life_lines",
        content: "Vaazhkkaiyin azhagu, siru nodigalil maraindhirukkirathu.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 9002,
        author: "@grace_writer",
        content:
          "Adhisayam enbadhu, vaazhkkaiyai purindhukollum podhu thonrum.",
        imageUrl: "https://randomuser.me/api/portraits/men/33.jpg",
      },
      {
        id: 9003,
        author: "@gentle_thoughts",
        content: "Aasaigaludan vaazhum vaazhkkai, endrum azhagiyaadhaan.",
        imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
      },
    ],
  },
];
