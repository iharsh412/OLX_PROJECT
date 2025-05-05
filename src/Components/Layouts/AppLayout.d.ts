
export interface AppLayoutProps {
    isAuthenticated?: Boolean;
    readonly children: string | JSX.Element | JSX.Element[] | ((any) => JSX.Element) | null;
}