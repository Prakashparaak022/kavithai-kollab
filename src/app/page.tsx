"use client";
import InviteModal from "@/components/home/InviteModal";
import Notifications from "@/components/home/Notifications";
import PoemCard from "@/components/home/PoemCard";
import PoemCommentsList from "@/components/home/PoemCommentsList";
import PoemDetails from "@/components/home/PoemDetails";
import Layout from "@/components/layouts/Layout";
import { useState } from "react";

export default function Home() {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-8xl">
        <div className="rounded-2xl shadow-xl overflow-hidden relative">
          <Layout>
            <div className="grid grid-cols-11  p-2 gap-3">
              {/* left bar */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                <PoemCard />
                <PoemCommentsList />
              </div>
              {/* collbator */}
              <div className="col-span-12 lg:col-span-4">
                <InviteModal />
              </div>
              {/* notifications */}
              <div className="col-span-12 lg:col-span-3 space-y-4">
                <Notifications showNotification={showNotification} />
                <PoemDetails />
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
}
