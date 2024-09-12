interface IconProps {
  children: React.ReactNode;
  styles?: string;
}

const Icon: React.FC<IconProps> = ({ children, styles }) => {
  return (
    <>
      <span className={`material-symbols-outlined ${styles}`}>{children}</span>
    </>
  );
};

export default Icon;
