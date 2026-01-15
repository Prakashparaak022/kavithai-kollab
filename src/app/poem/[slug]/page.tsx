import Layout from "@/components/layouts";
import Poem from "@/components/poem";
import { poems } from "@/data/poem";
import { notFound } from "next/navigation";

export default async function PoemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const poem = poems.find((p) => p.slug === slug);

  if (!poem) notFound();

  return (
    <Layout>
      <Poem poem={poem} />
    </Layout>
  );
}
