export default function (num: number, locale: 'en' | 'fa' = 'en'): string {
  if (!Number.isFinite(num) || num < 0 || !Number.isInteger(num))
    throw new Error('Only positive integers are supported');

  if (locale === 'en') return numberToEnglish(num);
  if (locale === 'fa') return numberToPersian(num);

  return num.toString();
}

function numberToEnglish(num: number): string {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
                 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty',
                'sixty', 'seventy', 'eighty', 'ninety'];
  const thousands = ['', 'thousand', 'million', 'billion'];

  if (num === 0) return 'zero';

  let word = '';
  let i = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkWord = convertChunkEnglish(chunk, ones, teens, tens);
      word = chunkWord + ' ' + thousands[i] + ' ' + word;
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return word.trim().replace(/\s+/g, ' ');
}

function convertChunkEnglish(num: number, ones: string[], teens: string[], tens: string[]): string {

  let result = '';

  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundred > 0) {
    result += ones[hundred] + ' hundred';
    if (remainder > 0) result += ' and ';
  }

  if (remainder >= 10 && remainder < 20) {
    result += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    if (ten > 0) result += tens[ten];
    if (ten > 0 && one > 0) result += '-';
    if (one > 0) result += ones[one];
  }

  return result.trim();
}

function numberToPersian(num: number): string {
  const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده',
                 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه',
                'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد',
                    'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'تریلیارد'];

  if (num === 0) return 'صفر';

  let parts: string[] = [];
  let i = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkWord = convertChunkPersian(chunk, ones, teens, tens, hundreds);
      if (thousands[i]) parts.unshift(chunkWord + ' ' + thousands[i]);
      else parts.unshift(chunkWord);
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return parts.join(' و ').trim();
}

function convertChunkPersian(num: number, ones: string[], teens: string[], tens: string[], hundreds: string[]): string {
  const h = Math.floor(num / 100);
  const t = Math.floor((num % 100) / 10);
  const o = num % 10;

  const parts: string[] = [];

  if (h > 0 && hundreds[h]?.length) parts.push(hundreds[h]);
  if (t === 1 && teens[o]?.length) {
    parts.push(teens[o]);
  } else {
    if (t > 1 && tens[t]?.length) parts.push(tens[t]);
    if (o > 0 && ones[o]?.length) parts.push(ones[o]);
  }

  return parts.join(' و ');
}
