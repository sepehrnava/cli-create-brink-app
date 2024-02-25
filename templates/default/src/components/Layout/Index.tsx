interface IProps {
  children: React.ReactNode;
}

export default function Index({ children }: IProps) {
  return (
    <>
      <>{children}</>
    </>
  );
}
