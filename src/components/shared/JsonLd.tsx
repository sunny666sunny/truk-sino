/**
 * Reusable JSON-LD component.
 * Renders a <script type="application/ld+json"> tag with the provided structured data.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
