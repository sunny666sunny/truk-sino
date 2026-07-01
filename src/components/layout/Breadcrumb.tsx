import { ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="container-main flex items-center flex-wrap gap-x-1 gap-y-1 text-sm font-[family-name:var(--font-condensed)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {/* Separator */}
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className="text-[var(--color-ink-muted)] shrink-0"
                  aria-hidden="true"
                />
              )}

              {/* Link or plain text */}
              {isLast || !item.href ? (
                <span
                  className={
                    isLast
                      ? "text-[var(--color-ink-muted)] font-medium"
                      : "text-[var(--color-ink-light)]"
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-[var(--color-ink-light)] hover:text-[var(--color-accent)] transition-colors duration-150"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
