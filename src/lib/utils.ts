export function formatNumber(n: number | null | undefined): string {
  if (n == null || isNaN(n)) return '0'
  return n.toLocaleString('en-US')
}

export function formatPercent(n: number | null | undefined, decimals = 1): string {
  if (n == null || isNaN(n)) return '0%'
  return `${n.toFixed(decimals)}%`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Nationality code to full name mapping (top nationalities)
const NATIONALITY_MAP: Record<string, string> = {
  MX: 'Mexico', GT: 'Guatemala', SV: 'El Salvador', HN: 'Honduras', CN: 'China',
  IN: 'India', BR: 'Brazil', CO: 'Colombia', EC: 'Ecuador', HT: 'Haiti',
  VE: 'Venezuela', CU: 'Cuba', NI: 'Nicaragua', DO: 'Dominican Republic', JM: 'Jamaica',
  PH: 'Philippines', PE: 'Peru', GY: 'Guyana', PK: 'Pakistan', BD: 'Bangladesh',
  ET: 'Ethiopia', ER: 'Eritrea', CM: 'Cameroon', GH: 'Ghana', NG: 'Nigeria',
  EG: 'Egypt', RU: 'Russia', UA: 'Ukraine', RO: 'Romania', AL: 'Albania',
  TR: 'Turkey', MM: 'Myanmar', AF: 'Afghanistan', IQ: 'Iraq', SY: 'Syria',
  SO: 'Somalia', KE: 'Kenya', TT: 'Trinidad and Tobago', PA: 'Panama', CR: 'Costa Rica',
  BZ: 'Belize', GE: 'Georgia', KR: 'South Korea', JP: 'Japan', TH: 'Thailand',
  VN: 'Vietnam', NP: 'Nepal', LK: 'Sri Lanka', ID: 'Indonesia', TW: 'Taiwan',
  YO: 'Yugoslavia', YE: 'Yemen', SU: 'Soviet Union', CA: 'Canada', GB: 'United Kingdom',
  IE: 'Ireland', DE: 'Germany', PL: 'Poland', IT: 'Italy', PT: 'Portugal',
  FR: 'France', KW: 'Kuwait', JO: 'Jordan', LB: 'Lebanon', IR: 'Iran',
  IL: 'Israel', SE: 'Senegal', ML: 'Mali', CI: "Côte d'Ivoire", GN: 'Guinea',
  SL: 'Sierra Leone', LR: 'Liberia', TG: 'Togo', BJ: 'Benin', BF: 'Burkina Faso',
  MT: 'Mauritania', UZ: 'Uzbekistan', KZ: 'Kazakhstan', TJ: 'Tajikistan',
  AR: 'Argentina', CL: 'Chile', UY: 'Uruguay', BO: 'Bolivia', PY: 'Paraguay',
}

export function nationalityName(code: string): string {
  return NATIONALITY_MAP[code] || code
}

// Case type codes
const CASE_TYPE_MAP: Record<string, string> = {
  RMV: 'Removal', DEP: 'Deportation', EXC: 'Exclusion', CRD: 'Credible Fear',
  RFR: 'Reasonable Fear', ASY: 'Asylum Only', OTH: 'Other',
}

export function caseTypeName(code: string): string {
  return CASE_TYPE_MAP[code] || code
}

// Court site codes to names (will be populated from data)
export function courtName(code: string): string {
  return code // placeholder — will map from judge/site data
}

export function titleCase(str: string): string {
  if (!str) return str
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

export const BASE_URL = 'https://www.openimmigration.us'
