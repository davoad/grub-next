import { getPublications } from "@/db/actions";
import { PublicationSearch } from "@/components/publications/publication-search";

const initialPublications = await getPublications(null);

export default function Publications() {
  return (
    <div className="mx-auto bg-gray-100 px-4 py-8">
      <PublicationSearch initialPublications={initialPublications} />
    </div>
  );
}
