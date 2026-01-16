import Providers from "../../providers/Providers";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="min-h-screen flex justify-center p-2 lg:p-6">
        <div className="w-full rounded-2xl shadow-xl overflow-hidden relative">
          <Header />
          {children}
        </div>
      </div>
    </Providers>
  );
};

export default Layout;
