interface ImgItem {
  w: number;
  h: number;
  x: number;
  y: number;
  key: string;
  file: string;
}

const middleOri: ImgItem[][] = [
  [
    { w: 756, h: 276, x: -37, y: 247, key: 's121', file: '1-2-BG.svg' },
    { w: 783, h: 158, x: 0, y: 517, key: 's111', file: '1-1-地面.svg' },
    { w: 233, h: 206, x: 122, y: 112, key: 's131', file: '1-3-文字装饰BG.svg' },
    {
      w: 226,
      h: 52,
      x: 134,
      y: 278,
      key: 's132',
      file: '1-3-邀你领略年会不可错过的瞬间.svg',
    },
    { w: 248, h: 98, x: 123, y: 168, key: 's141', file: '1-4-合聚变.svg' },
    { w: 149, h: 41, x: 178, y: 115, key: 's151', file: '1-5-文字2019.svg' },
    { w: 85, h: 22, x: 206, y: 81, key: 's191', file: '1-9-云创logo.svg' },
    { w: 119, h: 152, x: 708, y: 517, key: 's112', file: '1-10-门下阴影.svg' },
    { w: 33, h: 543, x: 715, y: 8, key: 's113', file: '1-11-墙.svg' },
    { w: 17, h: 270, x: 733, y: 300, key: 's114', file: '1-12-门.svg' },
  ],
  [
    { w: 1860, h: 156, x: 734, y: 513, key: 's211', file: '2-1-地面.svg' },
    { w: 2324, h: 619, x: 724, y: 75, key: 's221', file: '2-2-BG.svg' },
    { w: 54, h: 104, x: 1253, y: 424, key: 's231', file: '2-3-气球.svg' },
    { w: 559, h: 262, x: 840, y: 306, key: 's232', file: '2-3-礼物桌子.svg' },
    {
      w: 490,
      h: 41,
      x: 1406,
      y: 533,
      key: 's242',
      file: '2-4-拍照版装饰物.svg',
    },
    { w: 580, h: 149, x: 1338, y: 412, key: 's241', file: '2-4-摄影师.svg' },
    { w: 246, h: 75, x: 2089, y: 536, key: 's251', file: '2-5-地面游戏.svg' },
    { w: 34, h: 32, x: 2154, y: 596, key: 's261', file: '2-6-骰子.svg' },
    { w: 141, h: 195, x: 2275, y: 327, key: 's281', file: '2-8-游戏机.svg' },
  ],
  [
    { w: 569, h: 112, x: 2636, y: 444, key: 's312', file: '3-1-观众.svg' },
    { w: 2945, h: 287, x: 2499, y: 432, key: 's311', file: '3-1-地面 (2).svg' },
    { w: 76, h: 146, x: 2617, y: 270, key: 's321', file: '3-2-演讲.svg' },
    { w: 228, h: 266, x: 2853, y: 173, key: 's331', file: '3-3--领奖.svg' },
    { w: 421, h: 291, x: 2786, y: 80, key: 's341', file: '3-4-领奖装饰.svg' },
    { w: 226, h: 121, x: 3171, y: 304, key: 's351', file: '3-5-架子鼓.svg' },
    { w: 104, h: 110, x: 3398, y: 263, key: 's361', file: '3-6-弹吉他.svg' },
    { w: 70, h: 161, x: 3512, y: 228, key: 's371', file: '3-7-唱歌.svg' },
    { w: 246, h: 226, x: 3291, y: 321, key: 's381', file: '3-8-地上的人.svg' },
    { w: 94, h: 282, x: 3724, y: 135, key: 's391', file: '3-9-钢管舞.svg' },
    { w: 81, h: 139, x: 3912, y: 266, key: 's313', file: '3-10-跳街舞.svg' },
    {
      w: 396,
      h: 146,
      x: 4853,
      y: 278,
      key: 's315',
      file: '3-11-抽奖区礼物.svg',
    },
    {
      w: 310,
      h: 256,
      x: 4078,
      y: 168,
      key: 's314',
      file: '3-11-游戏区礼物-战队牌.svg',
    },
    {
      w: 235,
      h: 224,
      x: 4457,
      y: 191,
      key: 's317',
      file: '3-12-获胜的队伍.svg',
    },
    { w: 178, h: 178, x: 4952, y: 201, key: 's316', file: '3-12-转盘.svg' },
    {
      w: 506,
      h: 350,
      x: 3540,
      y: -63,
      key: 's318',
      file: '3-13-抽奖区装饰物.svg',
    },
    {
      w: 305,
      h: 263,
      x: 4374,
      y: 60,
      key: 's319',
      file: '3-13-获胜的队伍装饰1.svg',
    },
    {
      w: 375,
      h: 249,
      x: 3442,
      y: -21,
      key: 's310',
      file: '3-14-获胜的队伍装饰2.svg',
    },
  ],
  [],
  [
    { w: 107, h: 670, x: 2450, y: 0, key: 's011', file: '门 (2).svg' },
    { w: 107, h: 670, x: 5450, y: 0, key: 's021', file: '门.svg' },
  ],
];

const topOri: ImgItem[][] = [
  [
    { w: 119, h: 145, key: 't1v0', file: '1-0-树.svg', x: 342, y: 522 },
    { w: 21, h: 19, key: 't1v2', file: '1-2-方块.svg', x: 124, y: 91 },
    { w: 31, h: 28, key: 't1v3', file: '1-3-方块.svg', x: 326, y: 309 },
    { w: 32, h: 29, key: 't1v4', file: '1-4-方块.svg', x: 626, y: 260 },
    { w: 216, h: 480, key: 't1v5', file: '1-5-指路牌.svg', x: 392, y: 196 },
    { w: 190, h: 46, key: 't1v6', file: '1-6-云.svg', x: 433, y: 47 },
    { w: 74, h: 667, key: 't1v7', file: '1-7-墙.svg', x: 697, y: 4 },
    { w: 13, h: 327, key: 't1v8', file: '1-8-门.svg', x: 697, y: 319 },
    { w: 20, h: 40, key: 't1v9', file: '1-9-黑科技门装置.svg', x: 698, y: 453 },
  ],
  [
    { w: 67, h: 115, key: 't2v1', file: '2-1-气球.svg', x: 785, y: 572 },
    { w: 271, h: 150, key: 't2v2', file: '2-2-架子.svg', x: 904, y: 558 },
    { w: 268, h: 148, key: 't2v2-1', file: '2-2-礼物区.svg', x: 1032, y: 249 },
    { w: 60, h: 151, key: 't2v4', file: '2-4-相机三脚架.svg', x: 1420, y: 524 },
    { w: 157, h: 229, key: 't2v5', file: '2-5-手1.svg', x: 1475, y: 514 },
    { w: 292, h: 238, key: 't2v6', file: '2-6-手2.svg', x: 1434, y: 521 },
    { w: 210, h: 120, key: 't2v7', file: '2-7-手3.svg', x: 1553, y: 581 },
    { w: 116, h: 226, key: 't2v8', file: '2-8-自拍杆.svg', x: 1671, y: 494 },
    { w: 88, h: 151, key: 't2v9', file: '2-9-气球.svg', x: 1844, y: 540 },
    {
      w: 162,
      h: 96,
      key: 't2v10',
      file: '2-10-游戏区礼品.svg',
      x: 2218,
      y: 589,
    },
  ],
  [
    { w: 86, h: 186, key: 't3v1', file: '3-1-演讲区手1.svg', x: 2679, y: 600 },
    { w: 40, h: 100, key: 't3v2', file: '3-2-演讲区手2.svg', x: 2751, y: 627 },
    {
      w: 79,
      h: 136,
      key: 't3v3',
      file: '3-3三-演讲区手4.svg',
      x: 2752,
      y: 563,
    },
    { w: 60, h: 96, key: 't3v4', file: '3-4-演讲区手3.svg', x: 2808, y: 611 },
    { w: 31, h: 170, key: 't3v5', file: '3-5-演讲区手5.svg', x: 2831, y: 583 },
    { w: 168, h: 103, key: 't3v6', file: '3-6-演讲区手6.svg', x: 2693, y: 611 },
    { w: 134, h: 115, key: 't3v7', file: '3-7-演讲区手7.svg', x: 2699, y: 590 },
    { w: 772, h: 554, key: 't3v8', file: '3-8-灯光1.svg', x: 2917, y: 124 },
    { w: 2867, h: 97, key: 't3v9', file: '3-9-幕布 (2).svg', x: 2542, y: 1 },
    {
      w: 115,
      h: 200,
      key: 't3v10',
      file: '3-10-跳舞的人1.svg',
      x: 3277,
      y: 524,
    },
    {
      w: 126,
      h: 218,
      key: 't3v11',
      file: '3-11-跳舞的人2.svg',
      x: 3382,
      y: 512,
    },
    {
      w: 99,
      h: 212,
      key: 't3v12',
      file: '3-12-跳舞的人3.svg',
      x: 3488,
      y: 531,
    },
    {
      w: 95,
      h: 219,
      key: 't3v13',
      file: '3-13-跳舞的人4.svg',
      x: 3581,
      y: 511,
    },
    { w: 772, h: 554, key: 't3v14', file: '3-14-灯光2.svg', x: 3211, y: 124 },
    {
      w: 138,
      h: 285,
      key: 't3v15',
      file: '3-15-抽奖的人.svg',
      x: 4874,
      y: 500,
    },
    {
      w: 148,
      h: 118,
      key: 't3v16',
      file: '3-16-抽奖的礼物.svg',
      x: 5017,
      y: 553,
    },
    {
      w: 100,
      h: 302,
      key: 't3v17',
      file: '3-17-游戏区人1.svg',
      x: 4205,
      y: 501,
    },
    {
      w: 111,
      h: 305,
      key: 't3v18',
      file: '3-18-游戏区人2.svg',
      x: 4291,
      y: 495,
    },
    {
      w: 99,
      h: 328,
      key: 't3v19',
      file: '3-19-游戏区人3.svg',
      x: 4385,
      y: 475,
    },
    {
      w: 109,
      h: 316,
      key: 't3v20',
      file: '3-20-游戏区人4.svg',
      x: 4473,
      y: 488,
    },
    {
      w: 156,
      h: 299,
      key: 't3v21',
      file: '3-21-游戏区人5.svg',
      x: 4528,
      y: 506,
    },
    {
      w: 577,
      h: 241,
      key: 't3v22',
      file: '3-22-游戏区人装饰物.svg',
      x: 4165,
      y: 420,
    },
  ],
  [
    { w: 337, h: 535, key: 't4v1', file: '4-1-卡片.svg', x: 5536, y: 14 },
    { w: 375, h: 170, key: 't4v2', file: '4-2-弹窗.svg', x: 5510, y: 496 },
  ],
  [
    { w: 107, h: 670, key: 't0v3', file: '门 (3).svg', x: 2433, y: 4 },
    { w: 107, h: 670, key: 't0v4', file: '门 (4).svg', x: 5287, y: 7 },
  ],
];
const middle: ImgItem[] = middleOri.reduce(
  (all, arr) =>
    all.concat(
      arr.map((item: ImgItem) => {
        item.file = `./kill_me/中间层/${item.file}`;
        return item;
      }),
    ),
  [],
);
const top: ImgItem[] = topOri.reduce(
  (all, arr) =>
    all.concat(
      arr.map((item: ImgItem) => {
        item.file = `./kill_me/顶层/${item.file}`;
        return item;
      }),
    ),
  [],
);

export default {
  middle,
  top,
};
