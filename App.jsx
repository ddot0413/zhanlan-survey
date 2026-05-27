import { useState, useRef } from "react";

// ════════════════════════════════════════════════════════
//  ⚠️  把你的 Google Apps Script 網址貼在這裡
//  部署完成後長這樣：
//  https://script.google.com/macros/s/xxxxxx/exec
// ════════════════════════════════════════════════════════
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzw4ZmQ_RZZ5CgcG-0BHUKi0jvt3DBL959_d3h54CiWcAA-Li7U15yOYCIfrdQ9__X0hw/exec";

const B = {
  bg:"#FDF4E3", cream:"#FFF8ED", cardBorder:"#E8C87A",
  blue:"#4b90bd", blueDark:"#2B6A9A",
  pink:"#e0799c", pinkDark:"#A84E72",
  green:"#97c138", greenDark:"#5A7D1A",
  orange:"#e2a72e", orangeDark:"#A87010",
  brown:"#5A4020", brownL:"#A88050",
  purple:"#9B6BCC", purpleDark:"#6A3A9A",
};

const Logo = ({ width = 130 }) => (
  <svg viewBox="0 0 345.11 96.96" width={width} style={{display:"block"}}>
    <path fill="#e2a72e" d="M78.78,91.35c17.68-30.66,13.94-76,13.94-76C54.6.2,14.97,1.08,14.97,1.08c0,0-19.59,41.06-13.94,76,0,0,10.43,7.13,35.66,11.76,25.23,4.63,42.1,2.51,42.1,2.51Z"/>
    <path fill="#97c138" d="M344.06,78.76c5.72-34.93-13.79-76.03-13.79-76.03-41-.71-77.78,14.11-77.78,14.11,0,0-3.83,45.34,13.79,76.03,0,0,12.27,2.99,37.51-1.59,25.24-4.58,40.27-12.52,40.27-12.52Z"/>
    <path fill="#4b90bd" d="M172.5,85.8c11.86-33.34,0-77.27,0-77.27-40.22-8.02-79.05,0-79.05,0,0,0-11.86,43.92,0,77.27,0,0,11.54,5.13,37.19,5.13s41.86-5.13,41.86-5.13Z"/>
    <path fill="#e0799c" d="M242.79,96.96c21.07-28.44,22.53-73.91,22.53-73.91C229.18,3.65,189.7,0,189.7,0c0,0-24.15,38.56-22.53,73.91,0,0,9.55,8.27,34.08,15.75,24.53,7.48,41.54,7.3,41.54,7.3Z"/>
    <path fill="#fff" d="M19.08,41.54c-.08-.36-.22-.84-.42-1.43-.2-.6-.41-1.23-.63-1.89-.22-.66-.43-1.18-.63-1.58.51-.12,1.04-.48,1.58-1.08.54-.6,1.1-1.33,1.7-2.21.32-.44.78-1.16,1.38-2.18.6-1.01,1.26-2.21,2-3.59.74-1.38,1.46-2.86,2.18-4.46.72-1.59,1.38-3.19,1.97-4.78l5.02,2.03c-.95,2.2-2.03,4.41-3.23,6.64s-2.45,4.34-3.77,6.34c-1.32,2-2.63,3.79-3.95,5.38v.12c-.64.36-1.17.69-1.59.99-.41.3-.79.59-1.13.86-.34.28-.51.56-.51.84ZM20.15,57.44l4.54.78c-.28,2.71-.67,5.42-1.16,8.13-.5,2.71-1.06,5-1.7,6.88-.32-.16-.75-.34-1.28-.54-.54-.2-1.09-.4-1.65-.6s-1.04-.34-1.43-.42c.67-1.87,1.23-4.08,1.67-6.61.44-2.53.78-5.07,1.02-7.62ZM19.49,55.23c-.08-.4-.22-.91-.42-1.53s-.42-1.25-.66-1.91c-.24-.66-.46-1.2-.65-1.64.67-.2,1.37-.64,2.09-1.32.72-.68,1.52-1.55,2.4-2.63.48-.52,1.18-1.39,2.12-2.63.93-1.23,1.97-2.71,3.11-4.42,1.14-1.71,2.28-3.56,3.44-5.53,1.16-1.97,2.19-3.96,3.11-5.95l4.78,2.81c-1.47,2.67-3.09,5.31-4.84,7.92-1.75,2.61-3.58,5.11-5.47,7.51-1.9,2.39-3.78,4.57-5.65,6.52v.12c-.68.36-1.24.68-1.68.95-.44.28-.83.57-1.16.87-.34.3-.51.59-.51.87ZM19.08,41.54l-.18-4.01,2.52-1.56,10.59-.84c-.16.68-.29,1.45-.39,2.33-.1.88-.15,1.61-.15,2.21-2.4.24-4.32.45-5.8.63-1.48.18-2.65.34-3.53.48-.88.14-1.54.27-1.98.39-.44.12-.8.24-1.08.36ZM19.49,55.23l-.24-4.13,2.52-1.67,14.95-1.85c-.08.68-.15,1.45-.21,2.33-.06.87-.07,1.59-.03,2.15-3.39.48-6.13.89-8.22,1.25-2.1.36-3.72.65-4.88.87-1.15.22-2.01.4-2.57.54-.56.14-1,.31-1.32.51ZM26.49,58.1l4.24-.78c.36,2.19.68,4.5.96,6.94.28,2.43.46,4.56.54,6.4l-4.36.9c-.04-1.87-.19-4.06-.45-6.55-.26-2.49-.57-4.79-.92-6.91ZM32.6,56.97l3.89-1.26c.6,1.56,1.17,3.22,1.73,4.99.56,1.78.96,3.34,1.2,4.69l-4.13,1.32c-.2-1.27-.56-2.83-1.08-4.66s-1.06-3.53-1.61-5.08ZM32.71,42.55l4.24-1.08c.44,1.4.88,2.87,1.34,4.42.46,1.56.86,3.04,1.22,4.45.36,1.42.6,2.66.72,3.74l-4.42,1.43c-.16-1.11-.4-2.41-.72-3.89-.32-1.47-.68-3.01-1.08-4.6-.4-1.59-.84-3.09-1.31-4.48ZM44.19,47.7h5.14c-.2,3.23-.57,6.48-1.1,9.75-.54,3.27-1.4,6.35-2.6,9.24s-2.89,5.43-5.08,7.62c-.36-.56-.86-1.16-1.52-1.79-.66-.64-1.28-1.16-1.88-1.56,1.83-1.83,3.23-4.05,4.21-6.64.98-2.59,1.66-5.33,2.04-8.22.38-2.89.65-5.69.81-8.4ZM40.19,25.93h32.42v10.53h-5.44v-5.8h-21.71v5.8h-5.26v-10.53ZM42.22,38.13h28.88v4.96h-28.88v-4.96ZM48.2,55.53c.68,2.67,1.54,4.84,2.57,6.52,1.04,1.67,2.22,2.93,3.56,3.77,1.33.84,2.78,1.42,4.33,1.74,1.56.32,3.23.48,5.02.48h4.84c1.08,0,2.1,0,3.08-.03.98-.02,1.7-.03,2.18-.03-.24.4-.48.92-.71,1.56-.24.64-.43,1.28-.57,1.94-.14.66-.27,1.2-.39,1.64h-8.68c-2.27,0-4.37-.21-6.31-.63-1.94-.42-3.69-1.21-5.26-2.36-1.58-1.16-2.98-2.81-4.21-4.96-1.24-2.16-2.28-4.98-3.11-8.49l3.65-1.14ZM51.85,19.65l4.78-1.32c.8,1.28,1.54,2.71,2.24,4.31.7,1.59,1.16,2.97,1.4,4.13l-5.08,1.55c-.24-1.15-.68-2.54-1.32-4.16-.64-1.61-1.31-3.12-2.03-4.51ZM53.76,40.46h5.44v29.31h-5.44v-29.31ZM56.09,51.76h14.11v4.9h-14.11v-4.9Z"/>
    <path fill="#fff" d="M105.75,69.35h55.49v4.66h-55.49v-4.66ZM106.82,23.84h53.41v4.78h-53.41v-4.78ZM134.34,32.63v3.53h-20.15v15.49h20.57v3.53h-25.24v-22.55h24.82ZM112.21,39.03h20.57v9.39h-20.57v-3.17h16.03v-3.05h-16.03v-3.17ZM112.75,57.5h41.92v14.29h-5.56v-10.11h-7.24v10.11h-4.78v-10.11h-7.17v10.11h-4.78v-10.11h-7.12v10.11h-5.26v-14.29ZM120.16,20.37h5.62v11.36h-5.62v-11.36ZM121,34.12h4.72v6.94h-4.72v-6.94ZM121,46.74h4.72v6.94h-4.72v-6.94ZM140.5,31.85l5.14,1.07c-.92,3.47-2.12,6.8-3.59,9.99-1.47,3.19-3.11,5.86-4.9,8.01-.32-.24-.74-.56-1.25-.96-.52-.4-1.07-.77-1.65-1.1-.58-.34-1.08-.63-1.52-.87,1.84-1.95,3.4-4.36,4.7-7.24,1.29-2.87,2.32-5.84,3.08-8.91ZM139.3,36.99h18.48v4.54h-18.48v-4.54ZM141.15,20.37h5.68v11.36h-5.68v-11.36ZM143.9,44.88l4.01-1.91c1.2,1.55,2.28,3.31,3.23,5.26.95,1.95,1.63,3.67,2.03,5.14l-4.36,2.09c-.32-1.47-.94-3.2-1.86-5.17-.92-1.97-1.93-3.78-3.05-5.41Z"/>
    <path fill="#fff" d="M215.91,20.47l5.17,1.47c-2.86,7.28-6.61,13.68-11.27,19.17-4.66,5.5-10,10.01-16.04,13.54-.2-.39-.54-.85-1.03-1.38-.49-.53-.98-1.06-1.47-1.58-.49-.53-.93-.97-1.32-1.32,5.95-3.01,11.15-7.08,15.59-12.22,4.44-5.13,7.9-11.02,10.36-17.68ZM190.43,57.36c2.42-.16,5.21-.38,8.36-.68,3.16-.29,6.51-.61,10.08-.94,3.56-.33,7.08-.65,10.57-.97v4.76c-3.33.35-6.72.7-10.16,1.06-3.45.35-6.72.68-9.84.97-3.11.29-5.92.58-8.43.85l-.58-5.05ZM190.54,34.68h28.54v4.82h-28.54v-4.82ZM192.89,24.94h19.09v4.7h-19.09v-4.7ZM195.54,43.2h17.26v4.41h-17.26v-4.41ZM202.7,52.42h5.23v15.68c0,1.25-.16,2.24-.47,2.97-.31.73-.92,1.28-1.82,1.67-.94.39-2.08.63-3.41.71-1.33.08-2.95.12-4.87.12-.08-.71-.27-1.51-.59-2.41-.31-.9-.65-1.68-.99-2.35,1.33.04,2.55.06,3.67.06s1.87-.02,2.26-.06c.43,0,.71-.06.82-.18.12-.12.18-.33.18-.65v-15.56ZM200.18,19.12h5.17v17.97h-5.17v-17.97ZM211.62,43.2h1.18l1-.24,3.17,2.35c-1.57,1.8-3.4,3.61-5.49,5.43-2.1,1.82-4.12,3.34-6.08,4.55-.31-.47-.76-.99-1.33-1.56-.57-.57-1.05-1.01-1.44-1.32,1.1-.71,2.22-1.55,3.38-2.53,1.16-.98,2.22-1.98,3.2-3,.97-1.02,1.78-1.94,2.4-2.76v-.94ZM235.94,32.98l5.7.53c-.86,6.74-2.21,12.66-4.05,17.77-1.84,5.11-4.33,9.52-7.46,13.25-3.14,3.72-7.19,6.83-12.16,9.34-.16-.43-.43-.97-.82-1.61-.39-.65-.79-1.28-1.2-1.91-.41-.63-.82-1.13-1.2-1.53,4.58-2.07,8.3-4.76,11.15-8.05,2.86-3.29,5.08-7.24,6.67-11.86,1.58-4.62,2.71-9.93,3.37-15.91ZM225.14,19.12l5.57.88c-.67,3.76-1.5,7.42-2.52,10.98-1.02,3.56-2.22,6.88-3.58,9.95-1.37,3.07-2.92,5.75-4.64,8.02-.27-.35-.69-.78-1.23-1.29-.55-.51-1.12-1-1.71-1.47-.59-.47-1.1-.84-1.52-1.11,1.6-2.04,3.03-4.44,4.29-7.19,1.25-2.76,2.32-5.75,3.2-8.96.88-3.21,1.6-6.48,2.15-9.81ZM226.84,34.16c.82,5.21,2.01,10.1,3.55,14.68,1.55,4.58,3.56,8.59,6.05,12.01,2.48,3.43,5.55,6.12,9.19,8.08-.43.35-.9.8-1.4,1.35-.51.55-.99,1.13-1.44,1.73-.44.6-.81,1.16-1.08,1.67-3.84-2.35-7.06-5.41-9.66-9.19-2.61-3.78-4.72-8.16-6.34-13.16-1.63-4.99-2.93-10.45-3.91-16.36l5.05-.82ZM223.9,29.93h21.2v5.17h-21.2v-5.17Z"/>
    <path fill="#fff" d="M272.17,24.05h52.87v4.96h-52.87v-4.96ZM278.33,41.45c-.12-.44-.29-1.01-.51-1.7-.22-.7-.46-1.42-.72-2.16-.26-.74-.49-1.36-.69-1.88.6-.08,1.23-.29,1.89-.63.65-.34,1.38-.77,2.18-1.28.51-.36,1.36-.99,2.54-1.88,1.17-.9,2.48-1.95,3.91-3.17,1.44-1.21,2.75-2.5,3.95-3.86l6.21,2.33c-1.55,1.43-3.2,2.86-4.93,4.27-1.74,1.41-3.47,2.72-5.2,3.92-1.74,1.2-3.42,2.24-5.06,3.11v.12c-.72.36-1.31.69-1.79.99-.48.3-.9.6-1.26.89s-.54.61-.54.93ZM278.33,41.45l-.12-4.01,3.47-1.86,33.01-1.49c.08.72.21,1.51.39,2.39.18.88.37,1.57.57,2.09-6.3.36-11.58.67-15.82.93-4.24.26-7.69.47-10.35.63-2.65.16-4.7.3-6.15.42-1.46.12-2.54.25-3.26.39s-1.3.31-1.74.51ZM280.07,43.42h33.91v4.66h-28.28v25.9h-5.62v-30.56ZM283.9,51.91h29.48v4.07h-29.48v-4.07ZM283.9,59.87h29.36v4.01h-29.36v-4.01ZM294,19.38l5.68-1.56c.76,1.2,1.54,2.53,2.36,4.01.82,1.47,1.44,2.71,1.88,3.71l-5.86,1.92c-.44-1.08-1.04-2.37-1.82-3.89-.78-1.51-1.52-2.91-2.24-4.19ZM311.7,43.42h5.68v24.7c0,1.52-.24,2.65-.72,3.41-.47.76-1.31,1.33-2.51,1.73-1.24.36-2.85.56-4.84.6-2,.04-4.42.06-7.3.06-.16-.68-.43-1.46-.81-2.33-.38-.88-.75-1.64-1.1-2.27,1.35.08,2.73.13,4.13.15,1.4.02,2.62.02,3.68,0,1.05-.02,1.76-.05,2.12-.09.64,0,1.08-.1,1.31-.3.24-.2.36-.56.36-1.08v-24.58ZM304.29,30.5l4.42-2.75c1.48,1.16,3.08,2.44,4.82,3.83,1.73,1.4,3.41,2.78,5.02,4.15,1.61,1.38,2.93,2.58,3.97,3.62l-4.72,3.29c-.92-1.03-2.16-2.26-3.74-3.68-1.57-1.41-3.22-2.86-4.93-4.33-1.72-1.48-3.33-2.85-4.84-4.13Z"/>
  </svg>
);

const DIMS = ["expr","plan","under","creat","act"];
const PAL = {
  expr:  { main:B.pink,   dark:B.pinkDark,   light:"#FEF0F6", label:"表達力", role:"演說家",  icon:"💬", motto:"勇於表達自己的想法", cultivate:"每天睡前讓孩子說一件今天印象最深的事，練習完整表達。鼓勵他在家人面前分享學校故事。" },
  plan:  { main:B.blue,   dark:B.blueDark,   light:"#EEF7FD", label:"規劃力", role:"創業家",  icon:"📋", motto:"有脈絡地完成任務",   cultivate:"一起為家庭活動做簡單計畫，讓孩子試著列清單、分配步驟，完成後一起討論哪裡可以更好。" },
  under: { main:B.green,  dark:B.greenDark,  light:"#F0F9EE", label:"理解力", role:"觀察家",  icon:"🔍", motto:"傾聽別人，理解自己", cultivate:"看完影片或故事後，問孩子「你覺得那個人當時在想什麼？」練習換位思考和觀察細節。" },
  creat: { main:B.orange, dark:B.orangeDark, light:"#FEF6E8", label:"創造力", role:"設計家",  icon:"✨", motto:"用創意讓世界更有趣", cultivate:"準備一盒材料（紙箱、膠帶、瓶罐），每週給一個主題讓孩子自由發揮，只問「你怎麼想到的？」" },
  act:   { main:B.purple, dark:B.purpleDark, light:"#F3EEFA", label:"實踐力", role:"行動家",  icon:"🚀", motto:"勇於實踐，想法成真", cultivate:"和孩子一起設定一個小目標貼在冰箱，每天確認進度，完成時一起慶祝，失敗時一起討論下一步。" },
};

const QS = [
  { q:"最近有沒有注意到，孩子在說話或表達上有什麼變化？", icon:"💬",
    choices:[{text:"變得更敢開口，會主動說出自己的想法",score:{expr:4}},{text:"偶爾會說，但需要一點鼓勵",score:{expr:2}},{text:"還是比較沉默，喜歡觀察多過表達",score:{expr:1,under:3}},{text:"說話越來越有條理，讓我驚訝",score:{expr:3,plan:3}}]},
  { q:"孩子在家或學校，有沒有出現讓你覺得「這個想法好有創意！」的時刻？", icon:"✨",
    choices:[{text:"常常有，而且越來越稀奇古怪（我說讚的那種）",score:{creat:4}},{text:"偶爾有，但不是每次都說得出來",score:{creat:2}},{text:"不太有，但做事很踏實認真",score:{creat:1,act:3}},{text:"有，但更傾向把事情做好，不愛冒險",score:{creat:2,plan:3}}]},
  { q:"當孩子有一個想法或計畫，他通常會怎麼做？", icon:"🚀",
    choices:[{text:"馬上行動，說做就做",score:{act:4}},{text:"會想很多，但有時候就停在那裡了",score:{plan:3,act:1}},{text:"喜歡確認好了再動，很謹慎",score:{plan:4,act:2}},{text:"常常拉著我一起，需要人陪才有動力",score:{act:2,expr:2}}]},
  { q:"孩子對周圍的人，有沒有讓你覺得「他好細心」的表現？", icon:"🔍",
    choices:[{text:"很常，他很容易發現別人的情緒變化",score:{under:4}},{text:"有時候，但不是很穩定",score:{under:2}},{text:"比較專注在自己的事，不太注意別人",score:{under:1,act:2}},{text:"對事物很細心，但對人不一定",score:{under:2,plan:3}}]},
  { q:"這段時間，有沒有哪一刻讓你覺得「這個孩子真的長大了」？", icon:"🌟",
    choices:[{text:"他說了一句話，讓我眼眶有點紅",score:{expr:3,under:2}},{text:"他自己解決了一個以前需要我幫忙的問題",score:{act:4,plan:2}},{text:"他主動去關心了一個朋友",score:{under:4,expr:2}},{text:"他說出一個很有深度的問題",score:{creat:3,under:3}}]},
];

function CharSVG({ role, size=150 }) {
  const c = PAL[role];
  const acc = {
    expr:<><ellipse cx="108" cy="38" rx="22" ry="14" fill={B.blue}/><polygon points="92,48 84,60 100,50" fill={B.blue}/><rect x="90" y="31" width="18" height="3" rx="1.5" fill="white" opacity="0.9"/><rect x="90" y="37" width="13" height="3" rx="1.5" fill="white" opacity="0.7"/><circle cx="26" cy="38" r="5" fill={B.orange} opacity="0.75"/></>,
    plan:<><rect x="94" y="28" width="28" height="36" rx="5" fill="white" stroke={B.blue} strokeWidth="2"/><rect x="102" y="24" width="12" height="8" rx="4" fill={B.blue}/><rect x="98" y="37" width="20" height="3" rx="1.5" fill={B.blue}/><rect x="98" y="43" width="15" height="2.5" rx="1.2" fill="#B5D4F4"/><rect x="98" y="49" width="17" height="2.5" rx="1.2" fill="#B5D4F4"/><circle cx="26" cy="42" r="6" fill={B.orange} opacity="0.65"/></>,
    under:<><circle cx="108" cy="46" r="17" fill="none" stroke={B.green} strokeWidth="3"/><circle cx="108" cy="46" r="10" fill="#EFF7EE" opacity="0.9"/><line x1="120" y1="58" x2="132" y2="70" stroke={B.green} strokeWidth="4" strokeLinecap="round"/><circle cx="26" cy="50" r="5" fill={B.pink} opacity="0.55"/></>,
    creat:<><circle cx="108" cy="44" r="16" fill={B.orange} opacity="0.9"/><rect x="102" y="57" width="12" height="6" rx="3" fill={B.orangeDark}/><line x1="108" y1="24" x2="108" y2="19" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round"/><line x1="122" y1="30" x2="126" y2="26" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round"/><line x1="94" y1="30" x2="90" y2="26" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round"/><circle cx="26" cy="34" r="5" fill={B.pink} opacity="0.65"/></>,
    act:<><path d="M58 84 Q70 112 82 84" fill={B.purple} opacity="0.35"/><polygon points="110,34 113,43 123,43 115,49 118,58 110,53 102,58 105,49 97,43 107,43" fill={B.purple}/><line x1="25" y1="60" x2="38" y2="60" stroke={B.purple} strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/><line x1="21" y1="70" x2="36" y2="70" stroke={B.purple} strokeWidth="2" strokeLinecap="round" opacity="0.4"/></>,
  };
  return (
    <svg viewBox="0 0 150 148" width={size} height={size}>
      <circle cx="72" cy="76" r="64" fill={c.light}/>
      <ellipse cx="72" cy="130" rx="34" ry="9" fill={c.main} opacity="0.18"/>
      <rect x="55" y="84" width="34" height="40" rx="14" fill={c.main}/>
      <circle cx="72" cy="68" r="20" fill="#F5C4B3"/>
      <ellipse cx="72" cy="50" rx="20" ry="10" fill={B.brown}/>
      <ellipse cx="55" cy="60" rx="6" ry="12" fill={B.brown}/>
      <ellipse cx="89" cy="60" rx="6" ry="12" fill={B.brown}/>
      <circle cx="64" cy="65" r="3.2" fill={B.brown}/>
      <circle cx="80" cy="65" r="3.2" fill={B.brown}/>
      <circle cx="65" cy="64" r="1.3" fill="white"/>
      <circle cx="81" cy="64" r="1.3" fill="white"/>
      <circle cx="59" cy="72" r="5" fill={B.pink} opacity="0.28"/>
      <circle cx="85" cy="72" r="5" fill={B.pink} opacity="0.28"/>
      <path d="M65 75 Q72 80 79 75" stroke={c.main} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <rect x="36" y="86" width="21" height="27" rx="10" fill={c.main} transform="rotate(-18 46 99)"/>
      <rect x="93" y="86" width="21" height="27" rx="10" fill={c.main} transform="rotate(18 104 99)"/>
      {acc[role]}
    </svg>
  );
}

// ── 送資料到 Google Sheets ──────────────────────────────
async function sendToSheet(payload) {
  if (!SHEET_URL) return;
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script 需要 no-cors
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn("資料送出失敗（不影響使用）:", e);
  }
}

export default function App() {
  const [phase, setPhase]   = useState("intro");
  const [childName, setName]= useState("");
  const [cur, setCur]       = useState(0);
  const [sel, setSel]       = useState(null);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({expr:0,plan:0,under:0,creat:0,act:0});
  const [topRole, setTop]   = useState(null);
  const [secRole, setSec]   = useState(null);
  const [cultRole,setCult]  = useState(null);
  const [barReady, setBR]   = useState(false);
  const [dlState,  setDL]   = useState("idle");
  const [shareMsg, setShareMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef(null);

  const maxSc = Math.max(...Object.values(scores), 1);
  const pct   = d => Math.round(((scores[d]||0)/maxSc)*100);
  const name  = childName.trim() || "孩子";

  function startQ() { if(childName.trim()) setPhase("q"); }
  function pick(i)  { setSel(i); }
  function goPrev() { if(cur>0){ setCur(c=>c-1); setSel(null); } }

  function goNext() {
    if(sel===null) return;
    const sc  = QS[cur].choices[sel].score;
    const ns  = {...scores};
    Object.keys(sc).forEach(k=>{ ns[k]=(ns[k]||0)+sc[k]; });
    const newAnswers = [...answers];
    newAnswers[cur] = QS[cur].choices[sel].text;
    setAnswers(newAnswers);
    setScores(ns);
    if(cur < QS.length-1){ setCur(c=>c+1); setSel(null); }
    else {
      const sorted = [...DIMS].sort((a,b)=>(ns[b]||0)-(ns[a]||0));
      const top=sorted[0], sec=sorted[1], cult=sorted[2];
      setTop(top); setSec(sec); setCult(cult);
      setPhase("loading");
      setTimeout(()=>{
        setPhase("result");
        setTimeout(()=>setBR(true),400);
        // 送資料到 Google Sheets
        if(!submitted) {
          setSubmitted(true);
          sendToSheet({
            childName: childName.trim(),
            topRole:  PAL[top].role,  topLabel:  PAL[top].label,
            secRole:  PAL[sec].role,  secLabel:  PAL[sec].label,
            cultLabel: PAL[cult].label,
            scores: ns,
            answers: newAnswers,
          });
        }
      }, 2200);
    }
  }

  function restart() {
    setPhase("intro"); setCur(0); setSel(null); setName(""); setAnswers([]);
    setScores({expr:0,plan:0,under:0,creat:0,act:0});
    setTop(null); setSec(null); setCult(null); setBR(false);
    setDL("idle"); setShareMsg(""); setSubmitted(false);
  }

  async function handleDownload() {
    if(!resultRef.current) return;
    setDL("saving");
    const loadH2C = () => new Promise((res,rej)=>{
      if(window.html2canvas) return res();
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    try {
      await loadH2C();
      const canvas = await window.html2canvas(resultRef.current, {
        scale:2, useCORS:true, backgroundColor:"#FDF4E3", logging:false,
      });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${name}的天賦報告.png`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setDL("done"); setTimeout(()=>setDL("idle"),3000);
    } catch(e) {
      setDL("fail"); alert("下載失敗，請截圖儲存 📸");
    }
  }

  async function handleShare() {
    const top = topRole ? PAL[topRole] : null;
    const sec = secRole ? PAL[secRole] : null;
    const text = `🌟 ${name}的天賦探索結果出爐！\n\n✦ 最強天賦：${top?.role}（${top?.label}）\n✦ 潛在天賦：${sec?.role}（${sec?.label}）\n\n「${top?.motto}」\n\n——來自 綻藍教育 天賦探索計畫`;
    if(navigator.share) {
      try { await navigator.share({ title:`${name}的天賦探索結果`, text }); }
      catch(e) { if(e.name!=="AbortError") copyText(text); }
    } else { copyText(text); }
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(()=>{
      setShareMsg("✓ 文字已複製！貼到 Line 或 IG 分享吧");
      setTimeout(()=>setShareMsg(""),3000);
    });
  }

  const top  = topRole  ? PAL[topRole]  : null;
  const sec  = secRole  ? PAL[secRole]  : null;
  const cult = cultRole ? PAL[cultRole] : null;
  const dlLabel = {idle:"⬇ 下載圖片", saving:"處理中…", done:"✓ 已儲存", fail:"再試一次"}[dlState];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pop{0%{transform:scale(.88);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes up{0%{transform:translateY(14px);opacity:0}100%{transform:translateY(0);opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#C8A864;font-family:'Noto Sans TC',sans-serif}
        button,input{font-family:'Noto Sans TC',sans-serif}
        button:active{transform:scale(0.97)}
      `}</style>
      <div style={{minHeight:"100vh",background:"#C8A864",display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"1.5rem 1rem 4rem"}}>
        <div style={{width:"100%",maxWidth:420,background:B.bg,borderRadius:32,overflow:"hidden",border:`3px solid ${B.cardBorder}`}}>

          {/* INTRO */}
          {phase==="intro" && (
            <div style={{animation:"pop .4s ease"}}>
              <div style={{height:10,background:`linear-gradient(90deg,${B.orange},${B.blue},${B.pink},${B.green})`}}/>
              <div style={{background:B.cream,padding:"28px 24px 20px",textAlign:"center",borderBottom:`2px dashed ${B.orange}50`}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><Logo width={165}/></div>
                <div style={{display:"inline-block",background:B.blue,color:"white",fontSize:13,fontWeight:700,padding:"7px 20px",borderRadius:20,marginBottom:16}}>天賦探索計畫 ✦</div>
                <div style={{display:"flex",justifyContent:"center",gap:2,animation:"float 3s ease-in-out infinite"}}>
                  {DIMS.map(d=><div key={d} style={{width:56}}><CharSVG role={d} size={56}/></div>)}
                </div>
              </div>
              <div style={{padding:"20px 24px 28px"}}>
                <div style={{background:"white",borderRadius:20,padding:"16px 18px",marginBottom:16,border:`2px solid ${B.orange}25`}}>
                  <p style={{fontSize:13,color:B.brown,lineHeight:2,textAlign:"center"}}>不需要評分，也不需要比較。<br/>只要描述你最近觀察到的孩子，<br/>我們來幫你說出那個故事。</p>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:12,color:B.brownL,fontWeight:700,marginBottom:6}}>孩子的名字（暱稱也可以）</label>
                  <input value={childName} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&startQ()} placeholder="例：小明" maxLength={10}
                    style={{width:"100%",padding:"11px 14px",borderRadius:14,border:`2px solid ${B.orange}40`,fontSize:15,color:B.brown,background:B.cream,outline:"none"}}/>
                </div>
                <button onClick={startQ} disabled={!childName.trim()} style={{width:"100%",padding:"14px 0",background:childName.trim()?B.blue:"#C0C8D0",color:"white",border:"none",borderRadius:16,fontSize:15,fontWeight:700,cursor:childName.trim()?"pointer":"not-allowed",boxShadow:childName.trim()?`0 4px 0 ${B.blueDark}`:"none"}}>
                  開始探索 {childName.trim()?`${childName.trim()}的天賦`:""} →
                </button>
              </div>
            </div>
          )}

          {/* QUESTION */}
          {phase==="q" && (
            <div style={{animation:"up .3s ease"}}>
              <div style={{background:B.cream,padding:"18px 22px 16px",borderBottom:`2px dashed ${B.orange}40`}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Logo width={90}/></div>
                <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center"}}>
                  {QS.map((_,i)=><div key={i} style={{height:10,borderRadius:5,width:i===cur?32:10,background:i<cur?B.green:i===cur?B.orange:`${B.brownL}30`,transition:"all .3s"}}/>)}
                </div>
                <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
                  <span style={{background:B.orange,color:"white",fontSize:12,padding:"4px 14px",borderRadius:20,fontWeight:700}}>問題 {cur+1} / {QS.length}</span>
                </div>
                <div style={{fontSize:17,fontWeight:700,color:B.brown,lineHeight:1.65,textAlign:"center"}}>{QS[cur].icon} {QS[cur].q}</div>
              </div>
              <div style={{padding:"18px 20px 16px"}}>
                {QS[cur].choices.map((c,i)=>(
                  <button key={i} onClick={()=>pick(i)} style={{width:"100%",padding:"13px 16px",marginBottom:10,borderRadius:16,textAlign:"left",fontSize:14,lineHeight:1.65,border:sel===i?`2.5px solid ${B.green}`:`2px solid ${B.brownL}20`,background:sel===i?`${B.green}18`:"white",color:sel===i?B.greenDark:B.brown,fontWeight:sel===i?700:400,cursor:"pointer",transition:"all .15s"}}>
                    <span style={{display:"inline-block",width:24,height:24,borderRadius:"50%",background:sel===i?B.green:`${B.brownL}25`,color:sel===i?"white":B.brownL,fontSize:11,fontWeight:700,textAlign:"center",lineHeight:"24px",marginRight:10,verticalAlign:"middle"}}>{String.fromCharCode(65+i)}</span>
                    {c.text}
                  </button>
                ))}
                <div style={{display:"flex",gap:8,marginTop:6}}>
                  <button onClick={goPrev} disabled={cur===0} style={{padding:"11px 18px",background:"white",border:`2px solid ${cur===0?B.brownL+"20":B.brownL+"50"}`,borderRadius:14,fontSize:14,color:cur===0?`${B.brownL}55`:B.brownL,fontWeight:600,cursor:cur===0?"not-allowed":"pointer"}}>← 上一題</button>
                  <button onClick={goNext} disabled={sel===null} style={{flex:1,padding:"12px 0",background:sel===null?"#D4C9B0":B.orange,color:"white",border:"none",borderRadius:14,fontSize:15,fontWeight:700,boxShadow:sel===null?"none":`0 4px 0 ${B.orangeDark}`,cursor:sel===null?"not-allowed":"pointer"}}>
                    {cur===QS.length-1?"看看結果 🌟":"下一題 →"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOADING */}
          {phase==="loading" && (
            <div style={{padding:"64px 24px",textAlign:"center",animation:"pop .3s ease"}}>
              <div style={{width:56,height:56,border:`4px solid ${B.orange}25`,borderTopColor:B.orange,borderRadius:"50%",margin:"0 auto 24px",animation:"spin .9s linear infinite"}}/>
              <div style={{fontSize:18,fontWeight:700,color:B.brown,marginBottom:8}}>正在分析{name}的樣子…</div>
              <div style={{fontSize:13,color:B.brownL,lineHeight:1.9}}>我們把你的每一個觀察<br/>都仔細讀了一遍</div>
            </div>
          )}

          {/* RESULT */}
          {phase==="result" && top && sec && cult && (
            <>
              <div ref={resultRef} style={{background:B.bg}}>
                <div style={{height:10,background:`linear-gradient(90deg,${B.orange},${B.blue},${B.pink},${B.green})`}}/>
                <div style={{background:top.light,padding:"24px 20px 18px",textAlign:"center",borderBottom:`2px dashed ${top.main}40`,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:-35,right:-35,width:110,height:110,borderRadius:"50%",background:top.main,opacity:.07}}/>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Logo width={120}/></div>
                  <div style={{display:"inline-block",background:top.main,color:"white",fontSize:12,padding:"5px 16px",borderRadius:20,fontWeight:700,marginBottom:14}}>✦ {name}的最強天賦</div>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:10,animation:"float 3s ease-in-out infinite"}}><CharSVG role={topRole} size={148}/></div>
                  <div style={{fontSize:26,fontWeight:900,color:top.dark,marginBottom:6}}>{top.icon} {top.role}</div>
                  <div style={{display:"inline-block",background:"white",color:top.dark,fontSize:12,padding:"5px 16px",borderRadius:20,border:`1.5px solid ${top.main}40`,fontWeight:500}}>{top.motto}</div>
                </div>
                <div style={{padding:"18px 22px",borderBottom:`1px solid ${B.orange}20`}}>
                  <div style={{fontSize:11,letterSpacing:".1em",color:B.brownL,marginBottom:12,fontWeight:600}}>五力輪廓</div>
                  {DIMS.map(d=>(
                    <div key={d} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:38,height:38,borderRadius:10,background:PAL[d].light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:PAL[d].dark,flexShrink:0,border:`1.5px solid ${PAL[d].main}40`}}>{PAL[d].label[0]}力</div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <span style={{fontSize:12,fontWeight:600,color:B.brown}}>{PAL[d].label}</span>
                          <span style={{fontSize:11,color:B.brownL}}>{pct(d)}%</span>
                        </div>
                        <div style={{height:8,background:"#EDE0C8",borderRadius:4,overflow:"hidden"}}>
                          <div style={{height:"100%",borderRadius:4,background:d===topRole?`linear-gradient(90deg,${PAL[d].main},${PAL[d].dark})`:PAL[d].main,width:barReady?pct(d)+"%":"0%",transition:"width 1s ease",opacity:d===topRole?1:0.6}}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{padding:"16px 22px",borderBottom:`1px solid ${B.orange}20`}}>
                  <div style={{fontSize:11,letterSpacing:".1em",color:B.brownL,marginBottom:12,fontWeight:600}}>潛在天賦</div>
                  <div style={{background:sec.light,borderRadius:18,padding:"14px 16px",border:`2px solid ${sec.main}35`,display:"flex",alignItems:"center",gap:12}}>
                    <div style={{flexShrink:0}}><CharSVG role={secRole} size={68}/></div>
                    <div>
                      <div style={{fontSize:15,fontWeight:900,color:sec.dark,marginBottom:4}}>{sec.icon} {sec.role}</div>
                      <div style={{fontSize:12,color:sec.dark,fontWeight:500,background:"white",display:"inline-block",padding:"3px 10px",borderRadius:12,border:`1px solid ${sec.main}40`,marginBottom:8}}>{sec.label}・正在萌芽</div>
                      <p style={{fontSize:12,color:B.brown,lineHeight:1.8}}>{name}在「{sec.label}」上有不少潛力，還在蓄積能量，給他一點時間和空間，會讓你驚喜的。</p>
                    </div>
                  </div>
                </div>
                <div style={{padding:"16px 22px",borderBottom:`1px solid ${B.orange}20`}}>
                  <div style={{fontSize:11,letterSpacing:".1em",color:B.brownL,marginBottom:12,fontWeight:600}}>建議培養的能力</div>
                  <div style={{background:"white",borderRadius:18,padding:"14px 16px",border:`2px solid ${B.orange}30`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <span style={{background:B.orange,color:"white",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:12}}>{cult.icon} {cult.label}</span>
                      <span style={{fontSize:12,color:B.brownL}}>下一步可以這樣做</span>
                    </div>
                    <p style={{fontSize:13,color:B.brown,lineHeight:1.85}}>{cult.cultivate}</p>
                  </div>
                </div>
                <div style={{padding:"14px 22px 12px"}}>
                  <div style={{background:top.light,borderRadius:16,padding:"14px 18px",borderLeft:`4px solid ${top.main}`}}>
                    <p style={{fontSize:13,color:B.brown,lineHeight:2,fontStyle:"italic"}}>「每個孩子的星星形狀都不一樣。這張圖記錄的是{name}此刻的樣子，不是終點——成長的方向比形狀更重要。」</p>
                  </div>
                </div>
                <div style={{padding:"12px 0 18px",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <Logo width={90}/>
                  <div style={{fontSize:10,color:B.brownL,letterSpacing:".06em"}}>孩子天賦的養成基地</div>
                </div>
              </div>

              {/* action buttons */}
              <div style={{padding:"14px 22px 24px",background:B.bg,borderTop:`1px solid ${B.cardBorder}40`}}>
                {shareMsg && <div style={{background:B.green,color:"white",borderRadius:12,padding:"8px 14px",fontSize:13,fontWeight:500,textAlign:"center",marginBottom:10}}>{shareMsg}</div>}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  <button onClick={handleDownload} disabled={dlState==="saving"} style={{padding:"13px 0",background:dlState==="done"?B.green:dlState==="saving"?B.brownL:top.main,color:"white",border:"none",borderRadius:14,fontSize:14,fontWeight:700,cursor:dlState==="saving"?"not-allowed":"pointer",boxShadow:dlState==="saving"?"none":`0 4px 0 ${dlState==="done"?B.greenDark:top.dark}`}}>
                    {dlLabel}
                  </button>
                  <button onClick={handleShare} style={{padding:"13px 0",background:B.blue,color:"white",border:"none",borderRadius:14,fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:`0 4px 0 ${B.blueDark}`}}>
                    ↗ 分享社群
                  </button>
                </div>
                <button onClick={restart} style={{width:"100%",padding:"11px 0",background:"white",border:`2px solid ${B.brownL}30`,borderRadius:14,fontSize:13,color:B.brownL,fontWeight:500,cursor:"pointer"}}>再填一次</button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
