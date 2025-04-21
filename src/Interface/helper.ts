function getDaysFromNow(isoDateString: string) {
  const now = new Date();
  const target = new Date(isoDateString);
  const Now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const Target = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  const diffInMs = Target - Now;
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}
export { getDaysFromNow };
