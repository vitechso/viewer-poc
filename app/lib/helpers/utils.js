import { Typography } from 'antd';
const { Link } = Typography;

export const isServer = typeof window === 'undefined';

export const percentage = (num, per) => {
  return (num / 100) * per;
}

export function checkNull(value) {
  try {
    if (value) {
      return value;
    }
    else {
      return "N/A"
    }
  }
  catch (ex) {
    console.error(ex)
    return JSON.stringify(ex);
  }
}

export function CheckIfUrl(dt) {
  try {
    if (dt !== undefined) {
      if (dt.value && (dt.value !== '')) {
        if (typeof dt.value === 'string') {
          if (dt.value.startsWith("http")) {
            return (<Link href={dt.value}>{dt.name}</Link>)
          }
        }
        return dt.value
      }
    }

    return "N/A"
  }
  catch (ex) {
    console.error(ex)
    return JSON.stringify(ex);
  }
}

export function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}