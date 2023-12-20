interface IBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  iconName?: string;
  noActive?: boolean;
}
