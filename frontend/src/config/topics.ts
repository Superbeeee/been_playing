import type { TopicConfig } from '@/types'

// Platform topics (ticketing/info platforms)
export const platformTopics: TopicConfig[] = [
  { topic: 'KLook', name: 'KLook 客路', buttonStyle: { color: '#fff', backgroundColor: '#fd5a01', borderColor: '#e75234' } },
  { topic: 'BooksTickets', name: '博客來售票網', buttonStyle: { color: '#fff', backgroundColor: '#61C0B4', borderColor: '#61C0B4' } },
  { topic: 'UdnFunLife', name: 'udn售票網', buttonStyle: { color: '#fff', backgroundColor: '#F39800', borderColor: '#F39800' } },
  { topic: 'OpenTix', name: 'OPENTIX兩廳院生活文化', buttonStyle: { color: '#fff', backgroundColor: '#e75234', borderColor: '#e75234' } },
  { topic: 'KKTix', name: 'KKTIX', buttonStyle: { color: '#fff', backgroundColor: '#64be26', borderColor: '#64be26' } },
  { topic: 'IBon', name: 'IBon', buttonStyle: { color: '#8fc120', backgroundColor: '#3f3a3a', borderColor: '#3f3a3a' } },
  { topic: 'KKDay', name: 'KKDay', buttonStyle: { color: '#fff', backgroundColor: '#26bcc8', borderColor: '#26bcc8' } },
  { topic: 'CultureExpress', name: '文化快遞', buttonStyle: { color: '#fff', backgroundColor: '#313131', borderColor: '#313131' } },
  { topic: 'GaCc', name: '中華文化總會', buttonStyle: { color: '#fff', backgroundColor: '#7b0025', borderColor: '#7b0025' } },
  { topic: 'ArtEmperor', name: '非池中藝術網', buttonStyle: { color: '#fff', backgroundColor: '#e31472', borderColor: '#f09500' } },
  { topic: 'NTT', name: '新北市觀光旅遊網', buttonStyle: { color: '#fff', backgroundColor: '#00c6fd', borderColor: '#00c6fd' } },
]

// Exhibition topics (museums/venues)
export const exhibitionTopics: TopicConfig[] = [
  { topic: 'HuaShan1914', name: '華山1914文化創意產業園區', buttonStyle: { color: '#fff', backgroundColor: '#437321', borderColor: '#437321' } },
  { topic: 'MoCaTaipei', name: '台北當代藝術館', buttonStyle: { color: '#fff', backgroundColor: '#E83434', borderColor: '#E83434' } },
  { topic: 'CKSMH', name: '中正紀念堂', buttonStyle: { color: '#fff', backgroundColor: '#04a1ae', borderColor: '#04a1ae' } },
  { topic: 'Npm', name: '國立故宮博物院', buttonStyle: { color: '#fff', backgroundColor: '#7D0000', borderColor: '#7D0000' } },
  { topic: 'Ntm', name: '國立臺灣博物館', buttonStyle: { color: '#fff', backgroundColor: '#313131', borderColor: '#313131' } },
  { topic: 'NtSec', name: '國立臺灣科學教育館', buttonStyle: { color: '#3c3d30', backgroundColor: '#FAA61A', borderColor: '#33C0C4' } },
  { topic: 'SongShanCulturalPark', name: '松山文創園區', buttonStyle: { color: '#fff', backgroundColor: '#595758', borderColor: '#F9DD00' } },
  { topic: 'TFam', name: '臺北市立美術館', buttonStyle: { color: '#fff', backgroundColor: '#2B2B2B', borderColor: '#2B2B2B' } },
  { topic: 'Tmc', name: '台北流行音樂中心', buttonStyle: { color: '#fff', backgroundColor: '#FF5000', borderColor: '#00BBD3' } },
  { topic: 'Nmh', name: '國立歷史博物館', buttonStyle: { color: '#fff', backgroundColor: '#8b3a47', borderColor: '#8b3a47' } },
  { topic: 'NTCRI', name: '國立台灣工藝研究發展中心', buttonStyle: { color: '#fff', backgroundColor: '#00d186', borderColor: '#00d186' } },
  { topic: 'TwTc', name: '台北世貿中心', buttonStyle: { color: '#fff', backgroundColor: '#ef5923', borderColor: '#ef5923' } },
  { topic: 'Mwr', name: '世界宗教博物館', buttonStyle: { color: '#fff', backgroundColor: '#b01f23', borderColor: '#b01f23' } },
  { topic: 'MuseumPost', name: '郵政博物館', buttonStyle: { color: '#fff', backgroundColor: '#e6121c', borderColor: '#12429c' } },
  { topic: 'Jam', name: '忠泰美術館', buttonStyle: { color: '#3c3d30', backgroundColor: '#00d186', borderColor: '#00d186' } },
  { topic: 'NCPI', name: '國家攝影文化中心', buttonStyle: { color: '#fff', backgroundColor: '#000001', borderColor: '#000001' } },
  { topic: 'NtcArtMuseum', name: '新北市美術館', buttonStyle: { color: '#fff', backgroundColor: '#000001', borderColor: '#000001' } },
  { topic: 'FuBonArtMuseum', name: '富邦美術館', buttonStyle: { color: '#fff', backgroundColor: '#643164', borderColor: '#643164' } },
  { topic: 'CLab', name: '台灣當代文化實驗場C-Lab', buttonStyle: { color: '#fff', backgroundColor: '#f87065', borderColor: '#f2f2f0' } },
  { topic: 'KingCarArt', name: '金車文藝中心', buttonStyle: { color: '#fff', backgroundColor: '#000001', borderColor: '#000001' } },
  { topic: 'BoPiLiao', name: '剝皮寮歷史街區', buttonStyle: { color: '#fff', backgroundColor: '#656565', borderColor: '#cacaca' } },
  { topic: 'NTNUArtMuseum', name: '師大美術館', buttonStyle: { color: '#fff', backgroundColor: '#4d070b', borderColor: '#000001' } },
  { topic: 'NHRM', name: '國家人權博物館', buttonStyle: { color: '#fff', backgroundColor: '#a42422', borderColor: '#000001' } },
  { topic: 'TaipeiExPoPark', name: '花博公園', buttonStyle: { color: '#fff', backgroundColor: '#e52410', borderColor: '#626468' } },
  { topic: 'OCAM', name: '陽明海洋文化藝術館', buttonStyle: { color: '#fff', backgroundColor: '#b81d21', borderColor: '#b81d21' } },
  { topic: 'TncMMM', name: '臺灣新文化運動紀念館', buttonStyle: { color: '#fff', backgroundColor: '#9f211a', borderColor: '#9f211a' } },
  { topic: 'KdMoFa', name: '關渡美術館', buttonStyle: { color: '#fff', backgroundColor: '#eb7102', borderColor: '#eb7102' } },
  { topic: 'n228mm', name: '二二八事件紀念基金會', buttonStyle: { color: '#fff', backgroundColor: '#49b88d', borderColor: '#c0d429' } },
  { topic: 'HongGah', name: '鳳甲美術館', buttonStyle: { color: '#fff', backgroundColor: '#585656', borderColor: '#585656' } },
  { topic: 'ShungYeArt', name: '順益台灣美術館', buttonStyle: { color: '#fff', backgroundColor: '#83744c', borderColor: '#585656' } },
  { topic: 'PACT', name: '台北偶戲館', buttonStyle: { color: '#fff', backgroundColor: '#e40012', borderColor: '#db462f' } },
  { topic: 'Yatsen', name: '國立國父紀念館', buttonStyle: { color: '#fff', backgroundColor: '#f6b64b', borderColor: '#2f98d2' } },
  { topic: 'Nrm', name: '國家鐵道博物館', buttonStyle: { color: '#fff', backgroundColor: '#009e40', borderColor: '#fdfdfd' } },
  { topic: 'RedHouse', name: '西門紅樓', buttonStyle: { color: '#fff', backgroundColor: '#c73405', borderColor: '#c73405' } },
  { topic: 'YoChangArt', name: '有章藝術博物館', buttonStyle: { color: '#fff', backgroundColor: '#585656', borderColor: '#585656' } },
  { topic: 'NTAEC', name: '國立台灣藝術教育館', buttonStyle: { color: '#fff', backgroundColor: '#b83a32', borderColor: '#24318e' } },
  { topic: 'ChiPoLin', name: '齊柏林空間', buttonStyle: { color: '#fff', backgroundColor: '#585656', borderColor: '#585656' } },
  { topic: 'MoNTUE', name: '北師美術館', buttonStyle: { color: '#3c3d30', backgroundColor: '#f0eb4c', borderColor: '#4b4b4b' } },
  { topic: 'AAAArchives', name: '國家發展委員會檔案管理局', buttonStyle: { color: '#fff', backgroundColor: '#00afa9', borderColor: '#00192e' } },
  { topic: 'kmoa', name: '基隆美術館', buttonStyle: { color: '#fff', backgroundColor: '#e35449', borderColor: '#e35449' } },
  { topic: 'Culture435', name: '板橋435藝文特區', buttonStyle: { color: '#fff', backgroundColor: '#e35449', borderColor: '#e35449' } },
]

// All topics combined
export const allTopics: TopicConfig[] = [...exhibitionTopics, ...platformTopics]

// Set for quick lookup
export const topicSet = new Set(allTopics.map(t => t.topic))

// Get topic by code
export function getTopicByCode(code: string): TopicConfig | undefined {
  return allTopics.find(t => t.topic === code)
}

// Validate topic
export function isValidTopic(topic: string): boolean {
  return topicSet.has(topic)
}

// Generate CSS for topic buttons
export function generateTopicButtonStyles(): string {
  return allTopics
    .map(t => `.btn-${t.topic} {
      color: ${t.buttonStyle.color};
      background-color: ${t.buttonStyle.backgroundColor};
      border-color: ${t.buttonStyle.borderColor};
      --bs-btn-hover-color: ${t.buttonStyle.color};
      --bs-btn-hover-bg: ${t.buttonStyle.backgroundColor};
    }`)
    .join('\n')
}
