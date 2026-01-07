import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="rounded-2xl shadow-xl overflow-hidden relative">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
