// pages/Dashboard.tsx

import React from 'react';
import AdminLayout from '@/app/Components/AdminLayout';

const Page: React.FC = () => {
  return (
    <AdminLayout>
      {/* Page Content */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Dashboard Page:Property management </h2>
        <p>This is the dashboard page content.</p>
      </div>
    </AdminLayout>
  );
};

export default Page;

