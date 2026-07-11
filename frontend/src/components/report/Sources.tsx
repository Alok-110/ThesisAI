interface NewsItem {
  title: string;
  content: string;
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function Sources({ newsData }: { newsData: NewsItem[] }) {
  if (!newsData || newsData.length === 0) {
    return null;
  }

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Sources</h2>
      <ul className="divide-y divide-border">
        {newsData.map((item, i) => (
          <li key={i} className="py-2.5 first:pt-0 last:pb-0">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-foreground hover:text-primary transition-colors truncate">
              {item.title}
            </a>
            <span className="text-xs text-muted-foreground">{getDomain(item.url)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}