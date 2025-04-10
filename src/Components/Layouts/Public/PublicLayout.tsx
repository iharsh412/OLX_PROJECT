import { AppLayoutProps } from '../AppLayout.d';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  console.log("Public Layout::",children)
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
