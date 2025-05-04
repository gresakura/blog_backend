/**
 * 将ISO格式的日期时间字符串格式化为 "年-月-日 时:分:秒" 的格式
 *
 * @param isoString ISO格式的日期时间字符串
 * @returns 格式化后的日期时间字符串，格式为 "年-月-日 时:分:秒"
 */
export function formatDateTime(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}