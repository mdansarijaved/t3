import React from "react";

async function OrgDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>OrgDashboard of {slug}</div>;
}

export default OrgDashboard;
