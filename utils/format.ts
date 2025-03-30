export const formatPrice = (
  price: number,
  locale: string = "vi-VN",
  currency: string = "VND"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatDate = (
  date: string | Date | null | undefined,
  format: "full" | "short" = "full",
  locale: string = "vi-VN",
  timeZone: string = "Asia/Ho_Chi_Minh"
): string => {
  if (!date) return "Invalid Date";

  const validDate = date instanceof Date ? date : new Date(date);
  if (isNaN(validDate.getTime())) return "Invalid Date";

  const options: Intl.DateTimeFormatOptions =
    format === "full"
      ? {
          weekday: "long",
          day: "2-digit",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
          timeZone,
        }
      : {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone,
        };

  return new Intl.DateTimeFormat(locale, options).format(validDate);
};
