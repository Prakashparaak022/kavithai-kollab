import Layout from "@/components/layouts";
import Poem from "@/components/poem";
import { getPoemById } from "@/services/api/poems.service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function PoemDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ userId: string }>;
}) {
  const { slug } = await params;
  const { userId } =  await searchParams;
  const poem = await getPoemById({
    poemId: Number(slug),
    userId: userId ? Number(userId) : undefined,
  });
  if (!poem) notFound();

  return (
    <Layout>
      <Poem poem={poem} />
    </Layout>
  );
}
