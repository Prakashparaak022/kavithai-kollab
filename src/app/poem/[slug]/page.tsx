import Layout from "@/components/layouts";
import Collaborations from "@/components/poem/Collaborations";
import PoemCollaborationList from "@/components/poem/Collaborations";
import PoemDetailCard from "@/components/poem/PoemDetailCard";
import PoemMotion from "@/components/poem/PoemMotion";
import AboutPoem from "@/components/poemDetails/AboutPoem";
import Notifications from "@/components/poemDetails/Notifications";
import { poems } from "@/data/poem";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

const PoemDetailPage = ({ params }: Props) => {
  const poem = poems.find((p) => p.slug === params.slug);

  if (!poem) notFound();

  return (
    <Layout>
      <div className="grid grid-cols-12 p-4 gap-6">
        {/* Left bar */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {/* Dynamic Poem Card */}
          <PoemMotion motionKey={poem.slug}>
            <PoemDetailCard
              title={poem.title}
              username={poem.author}
              content={poem.content || "No content available"}
            />
          </PoemMotion>
          {/* Collaboration List */}
          <Collaborations collaborations={poem.collaborations ?? []} />
        </div>

        {/* Notifications */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Notifications showNotification={true} />
          <AboutPoem />
        </div>
      </div>
    </Layout>
  );
};

export default PoemDetailPage;
