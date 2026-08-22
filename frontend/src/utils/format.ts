export function formatDeadline(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleString("en-EN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

export function timeLeft(deadlineUnix: number): string {
  const diffMs = deadlineUnix * 1000 - Date.now();
  if (diffMs <= 0) return "Ended";
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  if (days > 0) return `${days} d. ${hours} h.`;
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  return `${hours} h. ${minutes} min.`;
}
