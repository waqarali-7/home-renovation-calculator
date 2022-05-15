import CommonHeader from "./Header";

export interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <CommonHeader />
      {children}
    </div>
  );
};

export default MainLayout;
